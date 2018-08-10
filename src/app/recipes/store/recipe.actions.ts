import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPES = 'SET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const STORE_RECIPES = 'STORE_RECIPES';
export const FETCH_RECIPES = 'FETCH_RECIPES';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
  // the array of recipes we want to set
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {}
  // the recipe we want to add of type Recipe
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: {index: number, updatedRecipe: Recipe}) {}
  // the index of the recipe we want to update and the new updated recipe
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {}
  // the index of the recipe we want to delete
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export type RecipeActions =
  SetRecipes |
  AddRecipe |
  UpdateRecipe |
  DeleteRecipe |
  StoreRecipes |
  FetchRecipes;

  // here we're setting some actions we're probably going to need; pretty much same as the service file