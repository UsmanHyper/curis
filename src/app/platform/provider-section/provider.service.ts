import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


const lovsURL = environment.publicUrl + '/lov/';
const lovsByNameURL = environment.publicUrl + 'lovByName/';
//const getUserDataURL = environment.baseUrl+
const getProviderDataUrl = environment.baseUrl + 'provider/profile/userId';
const saveProviderDataUrl = environment.baseUrl + 'provider/profile';
const ProviderLocationUrl = environment.baseUrl + 'provider/location';
const ProviderServicesByLocation = environment.baseUrl + 'provider/serviceLocation';
const getProviderByLocationUrl = environment.baseUrl + 'provider/providerLocation';
const ProviderWorkingHoursUrl = environment.baseUrl + 'provider/locationWorkingHours';
const SlotURL = environment.baseUrl + 'provider/slot';
const providerAppointmentsURL = environment.baseUrl + 'provider/appointments';
const paymentUrl = environment.baseUrl + 'payment-gateway/process-payment'
let cancelAppointment = new URL(`${environment.baseUrl}/patient/rest/v1/appointment/cancel`)

@Injectable({
  providedIn: 'root'
})
export class providerService {

  public isSelectedTabSubject = new BehaviorSubject<any>("");
  isSelectedTab = this.isSelectedTabSubject.asObservable();


  enableSchedular = false;
  enableProfileTab = false;
  enableChangePasswordTab = false;
  enableLocationTab = false;
  enableRatesTab = false;
  enableWorkingHoursTab = false;
  enableAccountTab = false;


  constructor(public http: HttpClient) { }


  setSelectedTab(tabName: any) {
    this.isSelectedTabSubject.next(tabName);
  }


  cancelAppointment(payload: any) {
    return this.http.post(cancelAppointment.href, payload);

  }


  getLovs(data: any) {
    return this.http.get(lovsURL + data);
  }

  getLovsByName(data: any) {
    return this.http.get(lovsByNameURL + data);
  }

  setProviderData(data: any) {
    localStorage.setItem('providerData', JSON.stringify(data));
  }

  getProviderData() {

    let data = localStorage?.getItem("providerData");
    if (data !== null) {
      return JSON.parse(data);
    }
  }

  saveProviderBasicInformation(accessToken: any, payloadData: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.post(saveProviderDataUrl, payloadData, header);
  }
  patientPaymentInformation(payload: any) {
    // const header = {
    //   headers: new HttpHeaders({
    //     Authorization: accessToken
    //   })
    // };

    return this.http.post(paymentUrl, payload);
  }


  updateProviderBasicInformation(accessToken: any, payloadData: any, providerId: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.put(saveProviderDataUrl + "/" + providerId, payloadData, header);
  }

  saveProviderLocationInformation(accessToken: any, payloadData: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.post(ProviderLocationUrl, payloadData, header);
  }

  getProviderLocationInformation(accessToken: any, providerId: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.get(getProviderByLocationUrl + "/" + providerId, header);
  }
  getProviderAppointmentInformation(accessToken: any, providerId: any,) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.get(SlotURL + "/" + providerId, header);
  }

  PostProviderAppointmentInformation(accessToken: any, providerId: any, dataToSet: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.post(SlotURL + "/" + providerId, dataToSet, header);
  }

  updateLocationInformation(accessToken: any, locationId: any, dataToSet: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.put(ProviderLocationUrl + "/" + locationId, dataToSet, header);
  }

  addNewRatesByLocation(accessToken: any, locationId: any, dataToSet: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.post(ProviderServicesByLocation + "/" + locationId, dataToSet, header);
  }

  deleteRatesByLocation(accessToken: any, locationId: any, serviceId: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.delete(ProviderServicesByLocation + "/" + locationId + "/service/" + serviceId, header);
  }

  updateRatesByLocation(accessToken: any, locationId: any, serviceId: any, dataToSet: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.put(ProviderServicesByLocation + "/" + locationId + "/service/" + serviceId, dataToSet, header);
  }

  deleteLocationInformation(accessToken: any, locationId: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.delete(ProviderLocationUrl + "/" + locationId, header);
  }

  saveWorkingHoursForLocation(accessToken: any, locationId: any, payloadData: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.post(ProviderWorkingHoursUrl + "/" + locationId, payloadData, header);
  }

  getWorkingHoursForLocation(accessToken: any, locationId: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.get(ProviderWorkingHoursUrl + "/location/" + locationId, header);
  }

  updateWorkingHour(accessToken: any, locationId: any, workingHourId: any, dataToSet: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.put(ProviderWorkingHoursUrl + "/" + locationId + "/workingHours/" + workingHourId, dataToSet, header);
  }

  deleteWorkingHoursByLocation(accessToken: any, locationId: any, serviceId: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.delete(ProviderWorkingHoursUrl + "/" + locationId + "/workingHours/" + serviceId, header);
  }

  getScheduledAppointments(accessToken: any, provideId: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.get(providerAppointmentsURL + "/" + provideId, header);
  }
  putScheduledAppointments(accessToken: any, provideId: any, dataToSet?: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };
    return this.http.put(providerAppointmentsURL + "/" + provideId, dataToSet, header);
  }


  //   getCodeTypeData(accessToken, payloadData, page) {
  //     const payload = {
  //       data: payloadData,
  //       pagination: {
  //         page: page,
  //         size: 10,
  //         totalPages: null,
  //         totalElements: null,
  //         sortOrder: null,
  //         sortBy: null
  //       }
  //     };
  //     const header = {
  //       headers: new HttpHeaders({
  //         Authorization: `Bearer ${ accessToken }`
  //       })
  //     };

  //     return this.http.post(getCodeTypesURL, payload, header);
  //   }

}