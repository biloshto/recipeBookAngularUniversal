// import { Component, OnInit, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
// import { Recipe } from '../recipe.model';
// import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { Subscription } from 'rxjs/Subscription';
// import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
// export class RecipeListComponent implements OnInit, OnDestroy {
export class RecipeListComponent implements OnInit {
  // recipes: Recipe[];
  recipeState: Observable<fromRecipe.State>;
  // subscription: Subscription;

  // constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute, private authService: AuthService) { }
  constructor(
    // private recipeService: RecipeService, 
    private router: Router, 
    private route: ActivatedRoute,
    private store: Store<fromRecipe.FeatureState>
  ) { }

  ngOnInit() {
    // this.subscription = this.recipeService.recipesChanged
    //   .subscribe(
    //     (recipes: Recipe[]) => {
    //       this.recipes = recipes;
    //     }
    //   );
    // this.recipes = this.recipeService.getRecipes();

    this.recipeState = this.store.select('recipes');
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
  // we no longer need subscription since we're using ngRx

}
