import {bindable} from 'aurelia-framework';

export class Checkbox {
  @bindable value = null;
  @bindable label = '';
  @bindable description = '';

  toggle() {
    if (!this.value) {
      return;
    }
    this.value.checked = !this.value.checked;
  }

  get checked() {
    return this.value && this.value.checked;
  }

  get hasDescription() {
    return !!this.description;
  }
}
