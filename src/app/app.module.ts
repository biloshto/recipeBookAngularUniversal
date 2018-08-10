import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
// import { shoppingListReducer } from './shopping-list/store/shopping-list.reducers';
import { reducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthEffects } from './auth/store/auth.effects';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // BrowserModule,
    BrowserModule.withServerTransition({appId: 'my-universal-app'}),
    // HttpModule, // the old HTTP service
    HttpClientModule,
    AppRoutingModule,
    // RecipesModule, // removing it from this array and implementing lazy loading on it
    SharedModule,
    ShoppingListModule,
    AuthModule,
    CoreModule,
    // StoreModule.forRoot({shoppingList: shoppingListReducer})
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
    // this should always be imported after the StoreModule, it isn't important if it's directly after or not, but should never be imported in front of it
    // if production is false we should use this StoreDevtoolsModule, otherwise we'll pass an empty array which basically means don't add this module
  ],
  // providers: [
  //   ShoppingListService,
  //   RecipeService,
  //   DataStorageService,
  //   AuthService,
  //   AuthGuard
  // ],
  // we moved all the services in the core module; when injecting them in the providers[] array in here, we're making sure that now we have one instance of the services available all the way through out our app as long as our app is running
  bootstrap: [AppComponent]
})
export class AppModule { }
