// import { Component, OnInit, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
// import { Recipe } from '../recipe.model';
// import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
// import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
// import * as fromApp from '../../store/app.reducers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: Recipe;
  // recipe: Recipe;
  recipeState: Observable<fromRecipe.State>;
  id: number;

  // constructor(
  //   private recipeService: RecipeService, 
  //   private route: ActivatedRoute, 
  //   private router: Router, 
  //   private authService: AuthService, 
  //   private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
  // ) { }

  constructor(
    // private recipeService: RecipeService, 
    private route: ActivatedRoute, 
    private router: Router, 
    // private authService: AuthService, 
    private store: Store<fromRecipe.FeatureState>
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          // this.recipe = this.recipeService.getRecipe(this.id);
          this.recipeState = this.store.select('recipes');
        }
      );
  }

  onAddToShoppingList() {
    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  // we no longer need this as we're using NgRx
  // this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  this.store.select('recipes')
    .take(1)
    .subscribe((recipeState: fromRecipe.State) => {
      this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients));
    });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
    // this is an alternative, a more complex set-up
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
    // after deleting the recipe we want to go back to the recipes page so won't see the details of the deleted recipe any longer 
  }

}
