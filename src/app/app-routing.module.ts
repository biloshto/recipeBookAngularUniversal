import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { HomeComponent } from "./core/home/home.component";

const appRoutes: Routes = [
  // { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
  // with this in place, whenever we visit /recipes it will dynamically load the RecipesModule but only once we entered /recipes in our URL
  { path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    // preloads all lazy loaded modules after the app has been loaded, so not at the point of time we load the app initally but once it runs
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}

// this module only has one purpose; it will provide routing to our application, it will bundle all routing functionalities so to say
// with @NgModule() we're transforming it from normal TypeScript class into an Angular module
// @NgModule() takes in a JavaScript object in which we can configure it to greater detail, but we don't need to configure that much for our routing module; mainly we'll need to register our routes
// Routes is simply an array of JavaScript objects, where each object represents a route
// in the @NgModule imports[] array we're configuring the router Angular ships with; and since we're in an extra module here and we want to get this into our main module, into our app.module, we need to export this readily-configured router in the exports[] array
// pathMatch: 'full' overwrites the defaul of 'prefix' and says now only redirect if the full path is empty (''), not if empty ('') is part of some path, so we won't get redirected on any other paths