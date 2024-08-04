import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
const lovsURL = environment.publicUrl + '/lov/';
const authenticationUrl = environment.baseUrl + 'authenticate/';
const userUpdateURL = environment.baseUrl + 'users/profile/';
const lovsByNameURL = environment.publicUrl + '/lovByName/';
const scheduleAppointmentURL = environment.publicUrl + 'scheduleAppointment/';

export interface ApiResponse {
  status: number;
  error?: string,
  message: string,
  err?: string,
  data?: any
}


@Injectable()
export class homeService {

  public isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated = this.isAuthenticatedSubject.asObservable();

  public isIndexSubject = new BehaviorSubject<boolean>(false);
  isIndex = this.isIndexSubject.asObservable();


  constructor(public http: HttpClient, private toastr: ToastrService) { }

  registerUser(payload: any) {
    // const payload = {
    //  data
    // };
    return this.http.post(authenticationUrl + 'signup', payload);
  }

  updateUserBasicInformation(accessToken: any, payloadData: any, userId: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };

    return this.http.put(userUpdateURL + userId, payloadData, header);
  }

  loginUser(payload: any) {
    // const payload = {
    //  data
    // };
    return this.http.post(authenticationUrl + 'login', payload);
  }

  setIsAuthenticated(data: boolean) {
    this.isAuthenticatedSubject.next(data);
  }

  setIsIndex(data: boolean) {
    this.isIndexSubject.next(data);
  }


  getLovs(data: any) {
    return this.http.get(lovsURL + data);
  }

  getLovByName(data: any) {
    return this.http.get(lovsByNameURL + data);
  }

  public get(slug: string) {
    return this.http.get<ApiResponse>(slug);
  }

  public post(slug: string, postData: any) {
    return this.http.post<ApiResponse>(slug, postData);
  }

  public delete(slug: string) {
    return this.http.delete<ApiResponse>(slug);
  }

  public patch(slug: string, postData: any) {
    return this.http.patch<ApiResponse>(slug, postData);
  }

  scheduleAppointment(payload: any) {

    return this.http.post(scheduleAppointmentURL + payload.slothDetails, payload);
  }

  successToster(message: string, title: string) {
    this.toastr.success(message, title, {
      timeOut: 2000,
    });
  }

  errorToster(message: string, title: string) {
    this.toastr.error(message, title, {
      timeOut: 2000,
    });
  }

  infoToster(message: string, title: string) {
    this.toastr.info(message, title, {
      timeOut: 2000,
    });
  }

  warningToster(message: string, title: string) {
    this.toastr.warning(message, title, {
      timeOut: 5000,
    });
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
  //         Authorization: `Bearer ${accessToken}`
  //       })
  //     };

  //     return this.http.post(getCodeTypesURL, payload, header);
  //   }

}