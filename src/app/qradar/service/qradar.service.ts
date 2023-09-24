import { QradarOffense } from './../model/qradaroffense';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QradarService {
  private serviceUrl = 'http://localhost:5000/offensejson';
  //private serviceUrl = 'http://localhost:5000/test';

  constructor(private http: HttpClient) {}

  getOffenses(): Observable<QradarOffense[]> {
    return this.http
      .get(this.serviceUrl)
      .pipe<QradarOffense[]>(
        map((data: any) => data.offensejson) // The object after data(~ type of data)
        // refers to the API endpoint. Should be exactly same as that in the
        // serviceUrl endpoint
        );
  }
}
