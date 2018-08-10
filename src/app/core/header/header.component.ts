// import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
// import { DataStorageService } from '../../shared/data-storage.service';
// import { Response } from '@angular/http';
// import { AuthService } from '../../auth/auth.service';
import { HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipeActions from '../../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // @Output() featureSelected = new EventEmitter<string>();

  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature);
  // }

  authState: Observable<fromAuth.State>;

  constructor(
    // private dataStorageService: DataStorageService, 
    // private authService: AuthService, 
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    // this.dataStorageService.storeRecipes()
    //   .subscribe(
    //     // (response: Response) => {
    //     //   console.log(response);
    //     // }
    //     // (response: HttpEvent<Object>) => {
    //     (response) => {
    //       console.log(response);
    //     }
    //   );
      // we want to handle the response in the component and not in the service because theoretically maybe we want to show some error alert in case some error happend, or anything like that
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    // this.dataStorageService.getRecipes();
    // here we don't need to subscribe because we're already doing this in the data-storage.service
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    // this.authService.logout();
    // we don't want to use the service any longer so we're directly dispatching actions
    this.store.dispatch(new AuthActions.Logout());
  }

}
