import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import zipcode from '../../../assets/zipcodes.json';

import { GoogleMap } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// import { MapAdvancedMarker } from "@angular/google-maps"

declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
    onwebkitfullscreenchange?: any;
    onmsfullscreenchange?: any;
    onmozfullscreenchange?: any;
  }

  interface HTMLElement {
    msRequestFullScreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    webkitRequestFullScreen?: () => Promise<void>;
  }
}

declare var google: any;
declare var $: any;


@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
  providers: [DatePipe],
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule,],
})
export class GoogleMapsComponent {
  @Input() height: any;
  @Input() width: any;

  @Input() zoom_level? = 2;

  @Output() click: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('gmap', { static: true }) gmapElement: any | ElementRef;



  data: any = null;
  map: any;
  custMarker: any;
  marker: any;
  mapListener: any;
  markerListener: any;
  intersectionObserver: any;

  bounds = new google.maps.LatLngBounds();
  infoWindow = new google.maps.InfoWindow();
  myInfowindow = new google.maps.InfoWindow();
  shapes: any;
  _markers: any[];
  locations: any[];
  markerSvgNot: any
  markerImg = "../../assets/images/dropMap.svg"
  handle: any
  center: any
  searchResults: any[] = [];
  zipJson: any


  constructor() {

    this.shapes = null;
    this._markers = [];
    this.locations = [];

    let coordinates: any = localStorage.getItem('geolocation') ?? null
    this.center = JSON.parse(coordinates) ?? { lat: 41.8781, lng: -87.6298 };

    const successCallback = (position: GeolocationPosition) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      let center = { lat: latitude, lng: longitude }

      let coordinates = localStorage.getItem('geolocation') ?? null

      if (coordinates === null || coordinates === undefined) {

        this.map.setCenter(
          new google.maps.LatLng(latitude, longitude)
        );

      } else {
        this.center = JSON.parse(coordinates)
      }

      localStorage.setItem('geolocation', JSON.stringify(center));
      // Update the HTML elements with the latitude and longitude values
      // You can use the latitude and longitude values here for further operations or map display.
    }

    // Function to handle geolocation retrieval errors
    function errorCallback(error: GeolocationPositionError) {
      console.error('Error getting current location:', error);
    }

    // Get the user's current location using the Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  ngOnInit(): void {
    this.zipJson = zipcode;
  }



  ngAfterViewInit() {

    setTimeout(() => {
      this.initMap();
    }, 500);


  }

  async initMap() {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const mapProp = {
      center: this.center,
      zoom: 16,
      disableDoubleClickZoom: false,
      disableDefaultUI: true,
      scaleControl: false,
      zoomControl: true,
      gestureHandling: "cooperative",
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
      },
      mapId: "CUR_IS_NOW",
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        mapTypeIds: ['roadmap', 'satellite', 'terrain', 'hybrid '],
        position: google.maps.ControlPosition.LEFT_BOTTOM,
      },
      overviewMapControl: false,
      fullscreenControl: false,
      fullscreenControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP,
      },
      rotateControl: false,
      panControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    const fullscreenControlDiv = document.createElement('div');

    // Create the control.
    const fullscreenControl = this.fullscreenbtn(this.map);

    // Append the control to the DIV.
    fullscreenControlDiv.appendChild(fullscreenControl);

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
      fullscreenControlDiv
    );
  }

  fullscreenbtn(map: any) {
    let controlButton = document.createElement('button');
    // Set CSS for the control.
    controlButton.style.backgroundColor = '#fff';
    controlButton.style.border = '2px solid #fff';
    controlButton.style.borderRadius = '3px';
    controlButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlButton.style.color = '#1a73e8';
    controlButton.style.cursor = 'pointer';
    controlButton.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlButton.style.fontSize = '12px';
    controlButton.style.lineHeight = '28px';
    controlButton.style.margin = '8px 12px 22px';
    controlButton.style.padding = '0px 25px 0px 25px';
    controlButton.style.textAlign = 'center';
    controlButton.textContent = 'Full Screen';
    controlButton.title = 'Click to Full Screen the map';
    controlButton.type = 'button';
    const elementToSendFullscreen = this.map.getDiv().firstChild as HTMLElement;
    const fullscreenControl = document.querySelector(
      '.fullscreen-control'
    ) as HTMLElement;
    // Setup the click event listeners: simply set the map to Chicago.
    controlButton.addEventListener('click', () => {
      if (this.isFullscreen(elementToSendFullscreen)) {
        this.exitFullscreen(controlButton);
      } else {
        this.requestFullscreen(elementToSendFullscreen, controlButton);
      }
    });
    return controlButton;
  }

  public isFullscreen(element: HTMLElement) {
    return (
      (document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement) == element
    );
  }
  public requestFullscreen(element: HTMLElement, btn: any) {
    if (element.requestFullscreen) {
      btn.textContent = 'Exit Full Screen';
      element.requestFullscreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullScreen) {
      element.msRequestFullScreen();
    }
  }
  public exitFullscreen(btn: any) {
    if (document.exitFullscreen) {
      btn.textContent = 'Full Screen';
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }


  async setupLocations(data?: any) {
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    const { InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

    this.locations = data;
    this.searchResults = [];
    this.locations.forEach((searchObj: any) => {
      const foundZip = this.zipJson.find((zipObj: any) => zipObj.zip_code.toString() === searchObj.zipCode.trim());
      if (foundZip) {
        this.searchResults.push({
          lat: foundZip.latitude,
          lng: foundZip.longitude,
          locName: searchObj.locName
        });
      } else {
        console.log(`Zip Code ${searchObj.zipcode} not found.`);
      }
    });
    this.map.setCenter({ lat: this.searchResults[0].lat, lng: this.searchResults[0].lng })
    for (let i = 0; i < this.searchResults?.length; i++) {

      const newPos = new google.maps.LatLng(this.searchResults[i].lat + 0.5 * 0.0001, this.searchResults[i].lng + 0.5 * 0.0001);
      let SensorIcon = document.createElement("img");
      SensorIcon.src = this.markerImg;
      SensorIcon.height = 50;
      SensorIcon.width = 50;


      const infoWindow = new InfoWindow();




      const pinScaled = new PinElement({
        background: "#76ba1b",
        scale: 1.5,
        borderColor: "#FFFFFF",
        glyphColor: "#137333"
      })

      this.marker = new AdvancedMarkerElement({
        position: newPos,
        map: this.map,
        content: pinScaled.element,
        title: `${this.searchResults[i].locName}`
        // content: SensorIcon

      });


      let iValue =
        ` <div class"card " >
    <div class="container" style="background-color:red; margin-bottom: 10px;">
      <label style="color:white ;margin: 5px 0px;" > ${this.searchResults[i].locName}` +
        `</label>
      </div>
            <table class="table fs-12 no-border  mb-0 table-sm " style ="border: 0 !important;  ">
      <tbody>

      </tbody>
</table>
  </div>
      </div> `;


      // Add a click listener for each marker, and set up the info window.
      this.marker.addListener('click', (domEvent: any, latLng: any) => {
        const { target } = domEvent;
        infoWindow.close();
        // infoWindow.setContent(this.marker.title);
        infoWindow.setContent(iValue);
        infoWindow.open(this.marker.map, this.marker);
      });

      // this.marker.addListener('mouseover', (domEvent: any, latLng: any) => {
      //   const { target } = domEvent;
      //   this.infoWindow.setContent(iValue);
      //   this.infoWindow.setPosition(newPos);

      //   infoWindow.open(this.marker.map, this.marker);
      // });
      // this.marker.addListener('mouseout', (domEvent: any, latLng: any) => {
      //   const { target } = domEvent;
      //   this.infoWindow.close();
      // });

      this.bounds = new google.maps.LatLngBounds();
      this.map.setZoom(14)
    }
  }

  resetMap() {

    this.infoWindow.close();
    if (!!this._markers) { //&& this._markers.length
      // if (!!this.markerCluster) {
      //   this.markerCluster.clearMarkers();
      //   this.markerCluster.removeMarkers(this._markers);
      //   // this.markerCluster = new MarkerClusterer(this.map, []);
      // }
      const markers = null
      for (let i = 0; i < this._markers['length']; i++) {
        this._markers[i]?.setMap(markers);
      }
      this._markers = [];

      this.shapes = {};
      this.bounds = new google.maps.LatLngBounds();
    }
    this.map.setCenter({ lat: 33.6461, lng: 73.0523 });
    this.map.setZoom(12);

    // if (this.snappedPolyline) {
    //   this.snappedPolyline.setMap(null);
    // }

    // if (this.circleShape) {
    //   this.circleShape.setMap(null);
    // }

    // const directionsService = new google.maps.DirectionsService;
    // this.directionsDisplayData.setMap(null);
    // this.directionsDisplayData.setDirections({ routes: [] });
    // this.directionsDisplayData = new google.maps.DirectionsRenderer();


    // this._directionsDisplay.setMap(null);
    // this._polyline.setMap(null);
    // this._directionsDisplay = new google.maps.DirectionsRenderer();
    // this._polyline = new google.maps.Polyline();
  }

  getLatLngFromString(ll: any) {
    const latlng = ll.split(/, ?/);

    const loc = new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1]));

    return new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1]));
  }
}