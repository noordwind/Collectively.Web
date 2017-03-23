import {bindable} from 'aurelia-framework';

export class Checkbox {
  @bindable value = null;
  @bindable label = '';

  toggle() {
    if (!this.value) {
      return;
    }
    this.value.checked = !this.value.checked;
  }
}
