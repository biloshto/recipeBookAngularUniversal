import { NgModule } from "@angular/core";
import { AppModule } from "./app.module";
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from "./app.component";

@NgModule({
  imports: [
    AppModule,
    // this is important; we need to import our root AppModule because with this it can find our original app
    ServerModule
    // this will expose some tools Angular needs to correctly run on the server side
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}

// this overall module file will be used during server side rendering