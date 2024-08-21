import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

const lovsURL = environment.publicUrl + '/lov/';
const authenticationUrl = environment.baseUrl + 'authenticate/';
const patientUrl = environment.baseUrl + 'patient/profile';
const userUrl = environment.baseUrl + 'users/profile';
const logoutUrl = environment.baseUrl + 'authenticate/logout';

const getProviderDataUrl = environment.baseUrl + 'provider/profile/userId';


@Injectable({
  providedIn: 'root'
})
export class authenticationService {
  public isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated = this.isAuthenticatedSubject.asObservable();

  public isIndexSubject = new BehaviorSubject<boolean>(false);
  isIndex = this.isIndexSubject.asObservable();

  constructor(public http: HttpClient) { }

  getLoggedInUser() {
    let loggedInUser = localStorage?.getItem("loggedInUser");
    if (loggedInUser !== null) {
      return JSON.parse(loggedInUser);
    }
  }

  setLoggedInUser(data: any) {
    localStorage.setItem('loggedInUser', JSON.stringify(data));
  }

  removeLoggedInUser() {
    localStorage.removeItem('loggedInUser');
  }


  setUserTokenData(data: any) {
    localStorage.setItem('token', JSON.stringify(data));
  }

  removeTokenData() {
    localStorage.removeItem('token');
  }

  setIsAuthenticated(data: boolean) {
    this.isAuthenticatedSubject.next(data);
  }

  setIsIndex(data: boolean) {
    this.isIndexSubject.next(data);
  }

  getUserToken() {
    let token = localStorage?.getItem("token");
    if (token !== null) {
      return JSON.parse(token);
    }
  }

  // getDataByToken(accessToken: any) {
  //   let jwt_decode = new JwtHelperService();
  //   let decodedToken = jwt_decode.decodeToken(accessToken);
  //   let userId = decodedToken._id;
  //   const header = {
  //     headers: new HttpHeaders({
  //       Authorization: accessToken
  //     })
  //   };
  //   return this.http.get(userUrl + '/' + userId, header);
  // }

  getDataByToken(accessToken: any) {
    let jwt_decode = new JwtHelperService();
    let decodedToken = jwt_decode.decodeToken(accessToken);
    console.log("----------", decodedToken)
    let userId = decodedToken._id;
    console.log("----------", userId)
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };
    return this.http.get(userUrl + '/' + userId, header);
  }

  setProviderData(data: any) {
    console.log(data)
    localStorage.setItem('providerData', JSON.stringify(data));
  }

  getProviderData() {
    let providerData = localStorage?.getItem("providerData");
    if (providerData !== null) {
      return JSON.parse(providerData);
    }
  }

  removeProviderData() {
    localStorage.removeItem('providerData');
  }

  getProviderDataById(accessToken: any, providerId: any) {
    const header = {
      headers: new HttpHeaders({
        Authorization: accessToken
      })
    };
    return this.http.get(getProviderDataUrl + "/" + providerId, header);
  }

  logOutUser(payload: any) {
    console.log(payload)
    const header = {
      headers: new HttpHeaders({
        Authorization: this.getUserToken()
      })
    };
    return this.http.post(logoutUrl, payload, header);
  }



}