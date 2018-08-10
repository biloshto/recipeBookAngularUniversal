import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
// import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;
  // @Input() allows us to bind this component property from outside, and we want to bind it from recipe-list component

  // constructor(private recipeService: RecipeService) { }
  constructor() { }

  ngOnInit() {
  }

  // onSelected() {
  //   this.recipeService.recipeSelected.emit(this.recipe);
  // }

}
