import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
// import { RecipeService } from '../recipe.service';
// import { Recipe } from '../recipe.model';
import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute, 
    // private recipeService: RecipeService, 
    private router: Router,
    private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          // checking if it has an id; if it has it means that we're in editing mode because there's an id present, this is an existing recipe with an id
          this.initForm();
          // whenever our route params changed we should call initForm() because that indicates that we reloaded the page
        }
      );
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'], 
    //   this.recipeForm.value['description'], 
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );
    if(this.editMode) {
      // this.recipeService.updateRecipe(this.id, newRecipe);
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.store.dispatch(new RecipeActions.UpdateRecipe({
        index: this.id, 
        updatedRecipe: this.recipeForm.value
      }));
      // since our value of the form has exactly the format of our Recipe model and the same names like imagePath and so on, we can skip this step of saving it in a new constant newRecipe and just pass the this.recipeForm.value
    } else {
      // this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }
    // if we're in editing mode we want to update an existing recipe; else we're adding a new one
    this.onCancel();
    // we're calling onCancel() simply because we want to navigate away after submitting the form
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
    // if we were editing this will take us back to the details page, if we would click on the new button it will take us back to the recipes page
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      // const recipe = this.recipeService.getRecipe(this.id);
      // recipeName = recipe.name;
      // recipeImagePath = recipe.imagePath;
      // recipeDescription = recipe.description;
      // if(recipe['ingredients']) {
      //   for(let ingredient of recipe.ingredients) {
      //     recipeIngredients.push(
      //       new FormGroup({
      //         'name': new FormControl(ingredient.name, Validators.required),
      //         'amount': new FormControl(ingredient.amount, [
      //           Validators.required,
      //           Validators.pattern(/^[1-9]+[0-9]*$/)
      //         ])
      //       })
      //     );
      //   }
      // }
      this.store.select('recipes')
        .take(1)
        .subscribe((recipeState: fromRecipe.State) => {
          const recipe = recipeState.recipes[this.id];
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if(recipe['ingredients']) {
            for(let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  'name': new FormControl(ingredient.name, Validators.required),
                  'amount': new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                })
              );
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
    // if we are adding new recipe the form inputs will be empty by default, and if we're in editing mode in the input will be the values of the existing recipe we're editing
  }

}
