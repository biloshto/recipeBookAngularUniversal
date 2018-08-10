import { Recipe } from './recipe.model';
// import { EventEmitter, Injectable } from '@angular/core';
// import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService } from '../shopping-list/shopping-list.service';
  // we no longer need this as we're using NgRx
import { Subject } from 'rxjs/Subject';
// import { Store } from '@ngrx/store';
// import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

// @Injectable()
// we're no longer injecting another service here since we're using NgRx and dispatching it in the recipe-detail.component.ts
export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Burrito', 
      'A super-tasty burrito - just awesome!', 
      'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 
      [
        new Ingredient('Meat', 1),
        new Ingredient('Salad', 1),
        new Ingredient('Lime', 1)
      ]),
    new Recipe(
      'Big Fat Burger', 
      'What else you need to say?', 
      'https://images.pexels.com/photos/103886/pexels-photo-103886.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1),
        new Ingredient('Cheese', 2),
        new Ingredient('Salad', 1),
        new Ingredient('Ketchup', 1)
      ])
  ];
  // the only thing which will ever get stored in this recipes property is an array which holds a couple of recipe objects; we set it to private so we can't directly access it from the outside

  // constructor(private slService: ShoppingListService) {  }
  // we no longer need this as we're using NgRx
  // constructor(private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) {  }
  // we no longer need this since we're dispatching it in the recipe-detail.component.ts file
  constructor() {  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }
  // returns a copy of the Recipe[] array so we can get access to it from the outside; if we return this without the slice() method, we'll return the direct reference to this array and since arrays and objects are of reference type in JavaScript, if we change something on this array we'll change it on the array on the service; therefor we call slice() without any argument and this simply returns a new array which is an exact copy of the one in this service file; this way we can't really access the Recipe[] array from the outside, we only get a copy of it

  // getRecipe(index: number) {
  //   return this.recipes[index];
  // }

  // // addIngredientsToShoppingList(ingredients: Ingredient[]) {
  // //   // this.slService.addIngredients(ingredients);
  // //   // we no longer need this as we're using NgRx
  // //   this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  // // }
  // // we're dispatching it directly in the recipe-detail.component.ts file

  // addRecipe(recipe: Recipe) {
  //   this.recipes.push(recipe);
  //   this.recipesChanged.next(this.recipes.slice());
  //   // we'll' simply take our recipes array and push our new item on it
  // }

  // updateRecipe(index: number, newRecipe: Recipe) {
  //   this.recipes[index] = newRecipe;
  //   this.recipesChanged.next(this.recipes.slice());
  //   // we'll take our recipes array, take the element at the index we got here as an argument and set it equal to the recipe
  // }

  // deleteRecipe(index: number) {
  //   this.recipes.splice(index, 1);
  //   this.recipesChanged.next(this.recipes.slice());
  //   // splice at the index 1 element to remove it
  // }

}

// this service manages our recipes and we added it to the recipes.component providers[] array so now we can use the same instance of this service in the recipes.component and every other child component of the recipes.component