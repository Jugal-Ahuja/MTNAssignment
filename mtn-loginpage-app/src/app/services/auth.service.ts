import { User } from './../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../models/authresponsedata.model';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root',
  })
export class AuthService {
  private BASE_URL = 'http://localhost:1337';
    timeoutInterval: any;
    constructor(private http:HttpClient, private store:Store<AppState>){}

//     login(email:string, password:string):Observable<AuthResponseData>{
//     return this.http.post<AuthResponseData>(
//         `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIRBASE_API_KEY}`,
//         {email,password,returnSecureToken:true }
//     );
// }

login(email:string, password:string): Observable<AuthResponseData>{
  const url = `${this.BASE_URL}/home`;
  return this.http.post<AuthResponseData>( url,
    {email,password,returnSecureToken:true}
    );
}
formatUser(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const user = new User(
      data.status,
      data.email,
      data.password,
      data.idToken,
      data.localId,
      expirationDate
    );
    return user;
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));

    //this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate;

    this.timeoutInterval = setTimeout(() => {
      //this.store.dispatch(autoLogout());
      //logout functionality or get the refresh token
    });
    //}, timeInterval);
  }
  logout() {
    localStorage.removeItem('userData');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }
}