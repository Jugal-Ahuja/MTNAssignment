import { loginSuccess } from './auth.action'
import { createReducer,on, State } from '@ngrx/store';
import { initialState } from './auth.state'
import { Action } from 'rxjs/internal/scheduler/Action';

const _authReducer = createReducer(
    initialState,
    on(loginSuccess, (state:any,action: any) => {
        return {
          ...state,
          user: action.user,
        };
      }),

);

export function AuthReducer(state:any, action:any) {
    return _authReducer(state, action);
  }