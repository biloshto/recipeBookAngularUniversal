import { Recipe } from "../recipe.model";
import { Ingredient } from "../../shared/ingredient.model";

import * as RecipeActions from './recipe.actions';
// we're importing everything from recipe.actions file as RecipeActions
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: State
}
// with extends this interface here also has the recipes: State we set here but it gets also all the properties of our AppState; so as soon as this module gets injected this interface type here is aware of the appState as well as the featureState

export interface State {
  recipes: Recipe[];
}

const initalState: State = {
  recipes: [
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
  ]
};
// we're setting the inital state of our application

export function recipeReducer(state = initalState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case (RecipeActions.SET_RECIPES):
      return {
        ...state,
        // we distribute all the previous state properties
        recipes: [...action.payload]
        // but we override recipes by simply setting it equal to the recipes we get passed into this state
      };
    case (RecipeActions.ADD_RECIPE):
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
        // the old array of recipes plus the new one to be added recipe
      };
    case (RecipeActions.UPDATE_RECIPE):
      const recipe = state.recipes[action.payload.index];
      // before returning we need to update an element and we need to find out which element this is; so this is the recipe we want to change
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      // updating the recipe by getting its old properties to change it in immutable way and then adding the properties of the new recipe
      const recipes = [...state.recipes];
      // with the spread operator we're pulling these elements out of the array and immediately adding them to a new array to use it in immutable way
      recipes[action.payload.index] = updatedRecipe;
      // now we're replacing one of these recipes with the updated recipe
      return {
        ...state,
        recipes: recipes
        // recipes now is the array of recipes that we changed
      };
    case (RecipeActions.DELETE_RECIPE):
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      // we want to remove one element at index action.payload
      return {
        ...state,
        recipes: oldRecipes
        // recipes is not the oldRecipes array with the recipe removed
      }
    default:
      return state;
  }
}
// we're setting some reducers we're probably going to need; the state of our application is the inital state, and the action is of type RecipeActions