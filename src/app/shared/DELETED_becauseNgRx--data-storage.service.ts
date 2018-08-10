// import { Injectable } from "@angular/core";
// // import { Http, Response } from "@angular/http";
// import { RecipeService } from "../recipes/recipe.service";
// import { Recipe } from "../recipes/recipe.model";
// import 'rxjs/Rx';
// // import { AuthService } from "../auth/auth.service";
// import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";

// @Injectable()
// export class DataStorageService {
//   // constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService) {}
//   // USING THE OLD HTTP
//   // constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}
//   constructor(private httpClient: HttpClient, private recipeService: RecipeService) {}
//   // USING THE NEW HTTP

//   storeRecipes() {
//     // we have to attach this token when saving recipes
//     // const token = this.authService.getToken();
//     // USING INTERCEPTORS SO WE'RE NOT FETCHING THE TOKEN HERE

//     // return this.http.put('https://recipe-book-6c20f.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
//     // // we're passing query parameter auth to authenticate our token
//     // // with Firebase a put request will triger the old data to be overwritten; if we used a post request instead, whenever we saved data to the back-end even the existing recipes would be saved as new ones
//     // // we always need to add .json at the end of our URL to allow Firebase to handle this correctly, otherwise we'd get an error
//     // // we can directly subscribe here, but we'll do it in the header.component; if we subscribed here though, we wouldn't need to return it
//     // USING THE OLD HTTP

//     // return this.httpClient.put('https://recipe-book-6c20f.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
//     // USING THE NEW HTTP


//     // const headers = new HttpHeaders().set('Authorization', 'Bearer asfgfgdf');

//     // // return this.httpClient.put('https://recipe-book-6c20f.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes(), {
//     // return this.httpClient.put('https://recipe-book-6c20f.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
//     //   observe: 'body',
//     //   // this is the default
//     //   // observe: 'events'
//     //   // but we could also listen to events in cases we want to do something once the request was sent and we're still waiting for the response
//     //   params: new HttpParams().set('auth', token)
//     //   // headers: headers
//     //   // this won't work here because Firebase doesn't expect headers but in general this is absolutely how it works
//     // });
//     // USING THE NEW HTTP BUT CONFIGURING THE RESPONSE

//     // const req = new HttpRequest('PUT', 'https://recipe-book-6c20f.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {reportProgress: true, params: new HttpParams().set('auth', token)})
//     // // reportProgress: true gives us feedback about the progress of the request and the response and this is super useful if we're uploading or downloading something
//     // return this.httpClient.request(req);
//     // // USING PROGRESS

//     const req = new HttpRequest('PUT', 'https://recipe-book-6c20f.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {reportProgress: true})
//     return this.httpClient.request(req);
//     // USING INTERCEPTORS
//   }

//   getRecipes() {
//     // we have to attach this token when getting recipes
//     // const token = this.authService.getToken();
//     // USING INTERCEPTORS SO WE'RE NOT FETCHING THE TOKEN HERE
    
//     // this.http.get('https://recipe-book-6c20f.firebaseio.com/recipes.json?auth=' + token)
//     // // we're passing query parameter auth to authenticate our token
//     //   .map(
//     //     (response: Response) => {
//     //       const recipes: Recipe[] = response.json();
//     //       for(let recipe of recipes) {
//     //         if(!recipe['ingredients']) {
//     //           recipe['ingredients'] = [];
//     //           // if some of the recipes doesn't have the ingredients property we're adding it, and we're setting it equal to an empty array because then it still doesn't have ingredients but at least it has the property, and we won't get an error while fetching data from the back-end
//     //         }
//     //       }
//     //       return recipes;
//     //     }
//     //   )
//     //   .subscribe(
//     //     (recipes: Recipe[]) => {
//     //       this.recipeService.setRecipes(recipes);
//     //     }
//     //   );
//     // USING THE OLD HTTP

//     // this.httpClient.get<Recipe[]>('https://recipe-book-6c20f.firebaseio.com/recipes.json?auth=' + token)
//     // // with <Recipe[]> we're telling Angular what type of data we're getting back; if we didn't include it up here like this, we would have to explicitly say it in the response, so instead of just recipes we would have to say recipes: Recipe[]
//     //   .map(
//     //     (recipes) => {
//     //       // the response here is no longer of type response, instead we can now be explicit about which kind of data we're getting back and we don't have to extract it from the body with response.json(); by default the HTTP client will automatically extract the body of the response
//     //       for(let recipe of recipes) {
//     //         if(!recipe['ingredients']) {
//     //           recipe['ingredients'] = [];
//     //           // if some of the recipes doesn't have the ingredients property we're adding it, and we're setting it equal to an empty array because then it still doesn't have ingredients but at least it has the property, and we won't get an error while fetching data from the back-end
//     //         }
//     //       }
//     //       return recipes;
//     //     }
//     //   )
//     //   .subscribe(
//     //     (recipes: Recipe[]) => {
//     //       this.recipeService.setRecipes(recipes);
//     //     }
//     //   );
//     // USING THE NEW HTTP

//     // this.httpClient.get<Recipe[]>('https://recipe-book-6c20f.firebaseio.com/recipes.json?auth=' + token, {
//     //   // observe: 'response',
//     //   // this will not automatically extract the body data of the response but it will actually give us the full response
//     //   observe: 'body',
//     //   // this gives us only the body of the response, but it's printed as text, not as JavaScript object because it isn't treated as json data and hence not extracted automatically, so it did extract the body but again is treated as text, not as JavaScript object because we override the default of treating as json
//     //   // responseType: 'text'
//     //   // the default would be 'json' so we don't need to set this, and if we don't observe the full response it will automatically extract and convert it as we used it before
//     //   // responseType: 'blob'
//     //   // useful if we're downloading a file
//     //   // responseType: 'arraybuffer'
//     //   // if we want to buffer some data
//     //   responseType: 'json'
//     //   // json is of course the most common option
//     // })
//     //   .map(
//     //     (recipes) => {
//     //       console.log(recipes);
//     //       // this will still be recipes but whatever we're observing now; if we observe reponse it will be the full response not just the body
//     //       for(let recipe of recipes) {
//     //         if(!recipe['ingredients']) {
//     //           recipe['ingredients'] = [];
//     //         }
//     //       }
//     //       return recipes;
//     //       // return [];
//     //       // if we're observing the full response with responseType: text
//     //     }
//     //   )
//     //   .subscribe(
//     //     (recipes: Recipe[]) => {
//     //       this.recipeService.setRecipes(recipes);
//     //     }
//     //   );
//       // USING THE NEW HTTP BUT CONFIGURING THE REQUEST AND RESPONSE


//     this.httpClient.get<Recipe[]>('https://recipe-book-6c20f.firebaseio.com/recipes.json', {
//       observe: 'body',
//       responseType: 'json'
//     })
//       .map(
//         (recipes) => {
//           console.log(recipes);
//           for(let recipe of recipes) {
//             if(!recipe['ingredients']) {
//               recipe['ingredients'] = [];
//             }
//           }
//           return recipes;
//         }
//       )
//       .subscribe(
//         (recipes: Recipe[]) => {
//           this.recipeService.setRecipes(recipes);
//         }
//       );
//       // USING INTERCEPTORS
//   }
// }