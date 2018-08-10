import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;
  // HostBinding allows us to bind to properties of the element the directive is placed on, so we can dynamically attach or detach a class depending on this

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    // if isOpen is false we're setting it to true, and the other way around; so with that we're toggling that property
  }

  constructor() { }

}
// this should listen to clicks and toggle whether some class is added or remove (the bootstrap 4 class .show is a class that shows the dropdown menu)
// since we bind to isOpen the class won't be attached initally; whenever isOpen switches to true it'll be attached, and whenever it switches to false it'll be removed