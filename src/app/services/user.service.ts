import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

const lovsURL = environment.publicUrl + '/lov/';
const authenticationUrl = environment.baseUrl + 'authenticate/';
const patientUrl = environment.baseUrl + 'patient/profile';

const userUrl = environment.baseUrl + 'users/profile';
const providerUrl = environment.baseUrl + 'provider/profile'
// const patientUrl = environment.baseUrl + 'provider/profile'
@Injectable()
export class userService {

    public isSelectedTabSubject = new BehaviorSubject<any>("");
    isSelectedTab = this.isSelectedTabSubject.asObservable();

    changePasswordTab: boolean = false;
    profileTab: boolean = false;
    userAppointTab: boolean = false;
    schduleAppointTab: boolean = false;


    constructor(public http: HttpClient) { }
    setSelectedTab(tabName: any) {
        this.isSelectedTabSubject.next(tabName);
    }

    getLoggedInUser() {
        let loggedInUser = localStorage?.getItem("loggedInUser");
        if (loggedInUser !== null) {
            return JSON.parse(loggedInUser);
        }
    }

    setLoggedInUser(data: any) {
        localStorage.setItem('loggedInUser', JSON.stringify(data));
    }

    setuserTokendata(data: any) {
        localStorage.setItem('token', JSON.stringify(data));
    }


    getPatientInformation(accessToken: any, providerId: any) {
        const header = {
            headers: new HttpHeaders({
                Authorization: accessToken
            })
        };

        return this.http.get(patientUrl + "/user/" + providerId, header);
    }
    putPatientInformation(accessToken: any, providerId: any, payload: any) {
        const header = {
            headers: new HttpHeaders({
                Authorization: accessToken
            })
        };

        return this.http.put(patientUrl + "/" + providerId, payload, header);
    }

    
    putPatientData(accessToken: any, providerId: any, payload: any) {
        const header = {
            headers: new HttpHeaders({
                Authorization: accessToken
            })
        };

        return this.http.put(userUrl + "/" + providerId, payload, header);
    }
    postPatientInformation(accessToken: any, payload: any) {
        const header = {
            headers: new HttpHeaders({
                Authorization: accessToken
            })
        };

        return this.http.post(patientUrl, payload, header);
    }


    getUserToken() {
        let token = localStorage?.getItem("token");
        if (token !== null) {
            return JSON.parse(token);
        }
    }

    getLovs(data: any) {   
        return this.http.get(lovsURL + data);
    }



    getUserDataByToken(accessToken: any) {
        let jwt_decode = new JwtHelperService();
        let decodedToken = jwt_decode.decodeToken(accessToken);
        let userId = decodedToken._id;
        const header = {
            headers: new HttpHeaders({
                Authorization: accessToken
            })
        };
        return this.http.get(userUrl + '/' + userId, header);
    }
}