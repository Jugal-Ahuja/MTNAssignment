import { AuthEffects } from './state/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AUTH_STATE_NAME } from './state/auth.selector';
import { AuthReducer } from './state/auth.reducer';
import { HomeComponent } from '../home/home.component';
  
  @NgModule({
    declarations: [LoginComponent],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      EffectsModule.forFeature([AuthEffects]),
    ],
  })
  export class AuthModule {}
