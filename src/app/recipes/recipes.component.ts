import { Component, OnInit } from '@angular/core';
// import { Recipe } from './recipe.model';
// import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
  // providers: [RecipeService]
  // so we can use the same instance of the RecipeService in this and every other child component of the recipes.component
  // but if we use the RecipeService like this and navigate away to the Shopping List area the Recipes component is destroyed and so is the instance of the service
})
export class RecipesComponent implements OnInit {
  // selectedRecipe: Recipe;

  // constructor(private recipeService: RecipeService) { }
  constructor() { }

  ngOnInit() {
    // this.recipeService.recipeSelected
    //   .subscribe(
    //     (recipe: Recipe) => {
    //       this.selectedRecipe = recipe;
    //     }
    //   );
  }

}
