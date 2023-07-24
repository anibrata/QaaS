import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, Subject } from 'rxjs';
import { IotOffense } from '../model/iotoffense';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IotService {
  private serviceUrl = 'http://localhost:5000/iotoffense';
  //private serviceUrl = 'http://localhost:5000/test';

  constructor(private http: HttpClient) {}

  //private _refreshrequired=new Subject<void>();

  /*get refreshRequired(){
    return this._refreshrequired;
  }*/

  getOffenses(): Observable<IotOffense[]> {
    return this.http
      .get(this.serviceUrl)
      .pipe<IotOffense[]>(
        map((data: any) => data.iotoffense) // The object after data(~ type of data)
        // refers to the API endpoint. Should be exactly same as that in the
        // serviceUrl endpoint
        );
  }
}
