import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, Subject } from 'rxjs';
//import { User } from '../model/user';
import { MobOffense } from '../model/moboffense';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MobilityService {
  private serviceUrl = 'http://localhost:5000/offense';
  //private serviceUrl = 'http://localhost:5000/test';

  constructor(private http: HttpClient) {}

  //private _refreshrequired=new Subject<void>();

  /*get refreshRequired(){
    return this._refreshrequired;
  }*/

  getOffenses(): Observable<MobOffense[]> {
    return this.http
      .get(this.serviceUrl)
      .pipe<MobOffense[]>(
        map((data: any) => data.offense) // The object after data(~ type of data)
        // refers to the API endpoint. Should be exactly same as that in the
        // serviceUrl endpoint
        );
  }



  /*updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.serviceUrl}/${user.id}`, user);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.serviceUrl}/add`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.serviceUrl}/${id}`);
  }

  deleteUsers(users: User[]): Observable<User[]> {
    return forkJoin(
      users.map((user) =>
        this.http.delete<User>(`${this.serviceUrl}/${user.id}`)
      )
    );
  }*/
}
