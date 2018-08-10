import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
// we're importing everything from the firebase package under the firebase alias

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCTmXKHqPqQW-QJgLA0m3UIg7HMxQzEowg",
      authDomain: "recipe-book-6c20f.firebaseapp.com"
    })
    // retrieved from the Firebase project web setup: https://console.firebase.google.com/project/recipe-book-6c20f/authentication/providers
    // with this Firebase the SDK will get initalized at the point of time we start our app
  }

  // onNavigate(feature: string) {
  //   // we need to make sure we store this feature
  //   this.loadedFeature = feature;
  // }
  
}
