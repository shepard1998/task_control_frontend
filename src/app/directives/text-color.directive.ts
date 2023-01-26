import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appTextColor]'
})
export class TextColorDirective {
  @HostBinding('style.color')
  textColor: string | null = 'black';

  @Input() set appTextColor(value: string) { this.textColor = value || 'black'; }

  constructor() { }

}
