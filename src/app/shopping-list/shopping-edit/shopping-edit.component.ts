// import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
// import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  // nameInput and amountInput are the names of the local references in the template
  subscription: Subscription;
  @ViewChild('f') slForm: NgForm;
  editMode = false;
  // editedItemIndex: number;
  // we no longer manage the editedItemIndex here but with the reducer
  editedItem: Ingredient;

  // constructor(private slService: ShoppingListService, private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }
  // constructor(private slService: ShoppingListService, private store: Store<fromShoppingList.AppState>) { }
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
      .subscribe(
        data => {
          if (data.editedIngredientIndex > -1) {
            this.editedItem = data.editedIngredient;
            this.editMode = true;
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            })
          } else {
            this.editMode = false;
          }
        }
      );
    // this.subscription = this.slService.stratedEditing
    //   .subscribe(
    //     (index: number) => {
    //       this.editedItemIndex = index;
    //       this.editMode = true;
    //       this.editedItem = this.slService.getIngredient(index);
    //       this.slForm.setValue({
    //         name: this.editedItem.name,
    //         amount: this.editedItem.amount
    //       })
    //     }
    //   );
    // we no longer need this as we're using NgRx
  }

  onSubmit(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    // const newIngredient = new Ingredient(ingName, ingAmount);
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}))
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
    }
    this.editMode = false;
    form.reset();
  }
  // in onAddItem() we want to emit a new event where we pass this data to the parent component, the shopping-list component, which manages our array of ingredients

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  // onDelete() {
  //   // this.slService.deleteIngredient(this.editedItemIndex);
  //   this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
  //   this.onClear();
  // }
  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }
}
