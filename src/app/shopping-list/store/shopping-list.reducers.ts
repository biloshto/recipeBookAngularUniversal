import * as ShoppingListActions from './shopping-list.actions';
// we're importing everything we export from the shopping-list.actions file and we're storing it in the ShoppingListActions variable basically, we're bundling all exports from that file in a one JavaScript object

import { Ingredient } from '../../shared/ingredient.model';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initalState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state = initalState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state, // getting the old state with the spread operator, the old ingredients
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      const ingredients = [...state.ingredients];
      ingredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: oldIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.START_EDIT:
      const editedIngredient = {...state.ingredients[action.payload]};
      return {
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: action.payload
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
  // we have to return an updated version of our state, actually not even an updated one - we have to return the state of our application, the new state
}

// a reducer function will be triggered whenever an action is dispatched
// state is the current state of the application and this is passed in automatically by NgRx, and we get an action; the state gets default value of initalState which means if the state is not present we'll use the initalState which is important for the first time we dispatch an action when we reach this reducer without having a current state