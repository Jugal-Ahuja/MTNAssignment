import { Actions,createEffect, ofType } from '@ngrx/effects';
import { loginStart, loginSuccess, logOut } from './auth.action';
import { exhaustMap, map, catchError, tap, mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthEffects {
    constructor(private actions$:Actions,private authService:AuthService,private store: Store<AppState>,private router: Router){}

    login$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(loginStart),
          exhaustMap((action) => {
          return this.authService.login(action.email, action.password).pipe(
              map((data) => {
                const user = this.authService.formatUser(data);
                this.authService.setUserInLocalStorage(user);
                return loginSuccess({ user, redirect: true });
              }),

           );
         })
        );
      });

      loginRedirect$ = createEffect(
        () => {
          return this.actions$.pipe(
            ofType(loginSuccess),
            tap((action) => {
              if (action.redirect) {
                this.router.navigate(['/home']);
              }
            })
          );
        },
        { dispatch: false }
      );

      logOut$ = createEffect(
        () => {
        return this.actions$.pipe(
          ofType(logOut),
          map((action) => {
            this.authService.logout();
            this.router.navigate(['/']);
          }),
        );
      },
      {dispatch:false}
      );
}

