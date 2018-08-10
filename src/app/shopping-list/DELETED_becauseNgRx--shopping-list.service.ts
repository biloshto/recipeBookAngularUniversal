import { Ingredient } from '../shared/ingredient.model';
// import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export class ShoppingListService {
  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>();
  stratedEditing = new Subject<number>();
  
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  // getIngredients() {
  //   return this.ingredients.slice();
  //   // we're no longer using the internal ingredients for this but the global store instead
  // }
  // we no longer need this as we're using NgRx

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  // addIngredient(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient);
  //   // this.ingredientsChanged.emit(this.ingredients.slice());
  //   this.ingredientsChanged.next(this.ingredients.slice());
  // }
  // we no longer need this as we're using NgRx

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    // this is an option but it emits a lot of events, so there's a better way to do this

    this.ingredients.push(...ingredients);
    // this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
    // ... is a spread operator - the spread operator allows us to turn an array of elements into a list of elements, so the push method won't push our array as a single object to the other array
    // this directly adds all ingredients in one go and then emits our event
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}

// we added this service to the app.module providers[] array so now we can use the same instance of this service application-wide, including in other services