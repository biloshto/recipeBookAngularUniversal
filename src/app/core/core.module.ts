import { NgModule } from "@angular/core";

import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from "../app-routing.module";

// import { ShoppingListService } from "../shopping-list/shopping-list.service";
// import { RecipeService } from "../recipes/recipe.service";
// import { DataStorageService } from "../shared/data-storage.service";
// import { AuthService } from "../auth/auth.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../shared/auth.interceptor";
import { LoggingInterceptor } from "../shared/logging.interceptor";

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    // ShoppingListService,
    // RecipeService,
    // DataStorageService,
    // AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
    // if we have multiple interceptors, like we have here, the order we set up here is the order by which the requests will travel through our interceptors
  ]
  // what this does is still provides us with one same instance of each of these services in our whole application because Angular merges them together as long as the core.module is loaded eagerly, and it's loaded eagerly, we're importing it in the app.module.ts file, so this restructuring's purpose is to keep our AppModule lean (we don't have to do it but it is a good practice)
})
export class CoreModule {}

// we're importing the SharedModule because there we exposed the dropdown directive and we're using the dropdown directive in the header component; and we also need to import the AppRoutingModule where we registered our application routes because we need that RouterModule as we do have routerLinks in the header