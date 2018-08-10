import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { recipeReducer } from './store/recipe.reducers';
import { EffectsModule } from '@ngrx/effects';
import { RecipeEffects } from './store/recipe.effects';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeStartComponent,
    RecipeListComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
    RecipeItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    SharedModule,
    StoreModule.forFeature('recipes', recipeReducer),
    // this dynamically injects this recipe state and reducer into the global state once this was loaded
    EffectsModule.forFeature([RecipeEffects])
  ]
  // we have to add the CommonModule in every feature module because it gives us access to the common directives, like ngClass, ngFor, ngIf...
})
// with this, we're transforming this normal, regular TypeScript class into something Angular is able to recognize, into a module
export class RecipesModule {

}