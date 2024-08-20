import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const lovsURL = environment.adminUrl + 'lov';
const PubliclovsURL = environment.adminUrl + 'lov';
const apppiontmentURL = environment.adminUrl + '/appointments';
//const getUserDataURL = environment.baseUrl+
const getProviderDataUrl = environment.adminUrl + 'providerDetails';
const getPatientrDataUrl = environment.adminUrl + 'patientDetails';
const getuserDataUrl = environment.adminUrl + 'admin/profile/userId/';
const userDataUrl = environment.baseUrl + 'users/profile';
const userappointmentsUrl = environment.baseUrl + 'patient/appointments';
@Injectable({
  providedIn: 'root'
})
export class adminService {

  public isSelectedTabSubject = new BehaviorSubject<any>("");
  isSelectedTab = this.isSelectedTabSubject.asObservable();

  providerInfoTab = false;
  patientInfoTab = false;
  lovManagementTab = false;
  reportingDashboardTab = false;
  changePasswordTab = false;
  appointmentInformationTab = false;

  constructor(public http: HttpClient) { }

  setSelectedTab(tabName: any) {
    this.isSelectedTabSubject.next(tabName);
  }

  getProviderDetails(accessToken: any, userId?: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };
    let id = userId || ""

    return this.http.get(getProviderDataUrl + "/" + id, header);
  }

  putProviderDetails(accessToken: any, userId: any, payload?: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };
    return this.http.put(userDataUrl + "/" + userId, payload, header)
  }

  getPatientDetails(accessToken: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.get(getPatientrDataUrl, header);
  }
  getAppointmentDetails(accessToken: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.get(apppiontmentURL, header);
  }

  getUserAppointmentDetailsByID(accessToken: any, userId: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.get(userappointmentsUrl + "/" + userId, header);
  }

  getAppointmentDetailsByID(accessToken: any, userId: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.get(apppiontmentURL + "/" + userId, header);
  }

  getUserDetailsByUserId(accessToken: any, userId: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.get(getuserDataUrl + userId, header);
  }

  getLovsData(accessToken: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.get(lovsURL, header);
  }

  getLovsbyId(accessToken: any, lovNumber: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.get(lovsURL + '/' + lovNumber, header);
  }
  postLovsNewChild(accessToken: any, lovNumber: any, payload?: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.post(lovsURL + '/' + lovNumber, payload, header);
  }
  postLovsNewParent(accessToken: any, payload?: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.post(lovsURL + '/', payload, header);
  }
  putLovsNewChild(accessToken: any, lovNumber: any, payload?: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.put(lovsURL + '/' + lovNumber, payload, header);
  }
  delLovsParent(accessToken: any, lovNumber: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.delete(lovsURL + '/' + lovNumber, header);
  }
  delLovsNewChild(accessToken: any, lovNumber: any, childId?: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.delete(lovsURL + '/' + lovNumber + "/value/" + childId, header);
  }

  getLovs(data: any) {
    return this.http.get(PubliclovsURL + data);
  }




}