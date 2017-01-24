import { inject, bindable } from 'aurelia-framework';

@inject(Element)
export class InfiniteScrollCustomAttribute {
  isTicking = false;

  @bindable scrollBuffer = 500;
  @bindable callback = null;

  constructor(element) {
    self = this;
    this.element = element;
  }

  attached() {
    window.addEventListener('scroll', this.onScrollChange);
  }

  detached() {
    window.removeEventListener('scroll', this.onScrollChange);
  }

  callbackChanged(newCallback) {
    this.callback = newCallback;
  }

  onScrollChange() {
    if (!self.isTicking) {
      window.requestAnimationFrame(() => {
        if (typeof self.checkScrollPosition === 'undefined') {
          return;
        }
        self.checkScrollPosition();
        self.isTicking = false;
      });
    }
    self.isTicking = true;
  }

  checkScrollPosition() {
    let elementHeight = this.element.scrollHeight;
    let elementOffsetTop = this.element.offsetTop;
    let windowScrollPosition = window.innerHeight + window.pageYOffset;
    let isPageScrolledToElementBottom = (windowScrollPosition + this.scrollBuffer) >= (elementHeight + elementOffsetTop);

    if (this.callback && isPageScrolledToElementBottom) {
      this.callback();
    }
  }
}
