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
    timeoutInterval: any;
    constructor(private http:HttpClient, private store:Store<AppState>){}

    login(email:string, password:string):Observable<AuthResponseData>{
    return this.http.post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIRBASE_API_KEY}`,
        {email,password,returnSecureToken:true }
    );
}
formatUser(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const user = new User(
      data.email,
      data.idToken,
      data.localId,
      expirationDate
    );
    return user;
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));

    this.runTimeoutInterval(user);
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

}