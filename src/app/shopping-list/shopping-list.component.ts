import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService } from './shopping-list.service';
// import { Subscription } from 'rxjs/Subscription';
  // we no longer need this as we're using NgRx
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  // ingredients: Ingredient[];
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  // private subscription: Subscription;
  // we no longer need this as we're using NgRx

  // constructor(private slService: ShoppingListService, private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }
  // constructor(private slService: ShoppingListService, private store: Store<fromShoppingList.AppState>) { }
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.ingredients = this.slService.getIngredients();
    this.shoppingListState = this.store.select('shoppingList');
    // this.subscription = this.slService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );
    // we no longer need this as we're using NgRx
  }

  onEditItem(index: number) {
    // this.slService.stratedEditing.next(index);
    // we no longer need this as we're using NgRx
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  //   // it's important to unsubscribe to prevent any memory leaks since we're using our own Subject here
  // }
  // we no longer need this as we're using NgRx

}
