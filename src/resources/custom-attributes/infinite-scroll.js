import { inject, bindable } from 'aurelia-framework';

@inject(Element)
export class InfiniteScrollCustomAttribute {
  isTicking = false;

  @bindable scrollBuffer = 500;
  @bindable callback = null;

  constructor(element) {
    that = this;
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
    if (!that.isTicking) {
      window.requestAnimationFrame(() => {
        if (typeof that.checkScrollPosition === 'undefined') {
          return;
        }
        that.checkScrollPosition();
        that.isTicking = false;
      });
    }
    that.isTicking = true;
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
