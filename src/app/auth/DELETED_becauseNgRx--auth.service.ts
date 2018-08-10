// service called for creating users, signing users in, and so on

import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {
  // token: string;

  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      // .then(
      //   response => {
      //     this.router.navigate(['/signin']);
      //     // when we sign up we're getting redirected to the sign in page
      //   }
      // )
      .then(
        user => {
          this.store.dispatch(new AuthActions.Signup());
          firebase.auth().currentUser.getIdToken()
            .then(
              // (token: string) => this.token = token
              (token: string) => {
                this.store.dispatch(new AuthActions.SetToken(token));
              }
            )
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.store.dispatch(new AuthActions.Signin());
          this.router.navigate(['/']);
          // when we sign in we're getting redirected to the root page
          firebase.auth().currentUser.getIdToken()
            .then(
              // (token: string) => this.token = token
              (token: string) => {
                this.store.dispatch(new AuthActions.SetToken(token));
              }
            )
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    // this.token = null;
    this.router.navigate(['/']);
    // when we log out we're getting redirected to the root page
    // this.store.dispatch(new AuthActions.Logout());
    // we're no longer using the authService for logging out, instead we're directly dispatching actions from the header.component
  }

  // getToken() {
  //   firebase.auth().currentUser.getIdToken()
  //     .then(
  //       (token: string) => this.token = token
  //     );
  //   return this.token;
  //   // this is async action because Firebase behind the scene does not only retrieve the token from local storage, which would be sync action, but it will automatically check if the token is still valid and if it's invalid, because it expired, it tries to give us a new one and will reach to the back-end automatically
  // }

  // isAuthenticated() {
  //   return this.token != null;
  //   // if it is null that means we're not authenticated
  // }
}


// $npm install --save firebase (to use firebase with the SDK)
// to be able to use the Firebase SDK we need to configure it and we should do that at the point of time our app starts, so good place for that would be in the app.component on the OnInit() hook