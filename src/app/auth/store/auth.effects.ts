import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as firebase from 'firebase';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  // @Effect({dispatch: false})
  // we must not emit any actions with this configuration; we should use this if we have a side effect which doesn't yield a new action in the end, which doesn't lead to a state change in the end
  @Effect()
  // we should use the normal Effect() declarator if we do have an action where we do want to change the application store in the end and return one action with the normal map operator, or multiple actions with mergeMap in the end
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    // checks if the action that is occuring is of special type
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
      // this automatically turns this into observable so we're returning an observable in the end
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    // this will be called whenever this promise here returns us a value
    .mergeMap((token: string) => {
      return [
        {
          type: AuthActions.SIGNUP
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
        // type of the action we want to dispatch in the end and also the payload of that action
      ];
      // we want to emit/dispatch two actions here so we use mergeMaps which allows us to merge multiple observables into one
    });


  @Effect()
  authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    // we want to map our action and retrieve the payload
    .switchMap((authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
    })
    // we want to send a request to firebase to sign in with username and password
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    // we get the token
    .mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthActions.SIGNIN
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
      // we mergeMap to emit signin and set token
    });
    // now we only need to hook it up in the sign in component

    @Effect({dispatch: false})
    authLogout = this.actions$
      .ofType(AuthActions.LOGOUT)
      .do(() => {
        this.router.navigate(['/']);
      });

  constructor(private actions$: Actions, private router: Router) {

  }
}

// actions$ is just like a list of all the actions we have in our app; all the auth actions, all the shopping list actions
// the dollar sign means that this is a observable; it's optional