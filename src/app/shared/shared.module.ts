import { NgModule } from '@angular/core';

import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DropdownDirective
  ],
  exports: [
    CommonModule,
    DropdownDirective
  ]
})
export class SharedModule {

}




// typically we only have one shared module in our application, though of course we could create multiple ones and then kind of indicate with the name which features the shared module contains

// the idea behind the shared module is that we would now be able to import it into the other modules, and therefore to be able to use the DropdownDirective we also have to export it