import { inject, bindable } from 'aurelia-framework';

@inject(Element)
export class InfiniteScrollCustomAttribute {
  isTicking = false;
  onScrollChange = null;

  @bindable scrollBuffer = 500;
  @bindable callback = null;

  constructor(element) {
    this.element = element;
  }

  attached() {
    let that = this;
    this.onScrollChange = function() {
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
    };
    window.addEventListener('scroll', this.onScrollChange);
  }

  detached() {
    window.removeEventListener('scroll', this.onScrollChange);
  }

  callbackChanged(newCallback) {
    this.callback = newCallback;
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
