import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
const lovsURL = new URL(`${environment.publicUrl}lov/`);
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


@Injectable({
  providedIn: 'root'
})
export class MainHomeService {


  public isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated = this.isAuthenticatedSubject.asObservable();

  public isIndexSubject = new BehaviorSubject<boolean>(false);
  isIndex = this.isIndexSubject.asObservable();

  constructor(public http: HttpClient, private toastr: ToastrService) { }

  registerUser(payload: any) {

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

  getLovs(data: any) {
    return this.http.get(`${lovsURL.href}${data}`);
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
  public put(slug: string, postData: any) {
    return this.http.put<ApiResponse>(slug, postData);
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
}
