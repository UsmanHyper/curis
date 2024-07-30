import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataSharingService {
    private subject = new BehaviorSubject<any>(null);

    sendSignal(message: any) {
        this.subject.next(message);
    }

    onSignal(): Observable<any> {
        return this.subject.asObservable();
    }
}