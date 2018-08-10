import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "../auth/auth-guard.service";
import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";

const recipesRoutes: Routes = [
  // { path: 'recipes', component: RecipesComponent, children: [
    // removing the /recipes because of lazy loading since we'd put it back in the app-routing.module
  { path: '', component: RecipesComponent, children: [
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
    { path: ':id', component: RecipeDetailComponent },
    { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRoutes)
    // in our app we must only call forRoot() in our app module, in our root module; if we ever register routes anywhere else in our app using RouterModule, we must use forChild() because we're not on the root router anymore, on the root module anymore we should say, but we're on a child module - every other module is a child module, because in the end everything will be imported in the app module either directly or because we imported a module into a module which is imported into the app module
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
  // injecting this service here because it's the only place in our whole app where we actually use it
})
export class RecipesRoutingModule{}