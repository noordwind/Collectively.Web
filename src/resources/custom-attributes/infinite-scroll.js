import { inject, bindable } from 'aurelia-framework';

@inject(Element)
export class InfiniteScrollCustomAttribute {
  isTicking = false;
  onScrollChange = null;

  @bindable scrollBuffer = 500;
  @bindable callback = null;
  @bindable windowScroll = false;

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
    let element = this.getElement();
    element.addEventListener('scroll', this.onScrollChange);
  }

  detached() {
    let element = this.getElement();
    element.removeEventListener('scroll', this.onScrollChange);
  }

  callbackChanged(newCallback) {
    this.callback = newCallback;
  }

  checkScrollPosition() {
    let elementHeight = this.getElementHeight();
    let elementOffsetTop = this.element.offsetTop;
    let windowScrollPosition = this.getWindowScrollPosition();

    let isPageScrolledToElementBottom = (windowScrollPosition + this.scrollBuffer) >= (elementHeight + elementOffsetTop);
    if (this.callback && isPageScrolledToElementBottom) {
      this.callback();
    }
  }

  getElement() {
    if (this.windowScroll) {
      return window;
    }
    return this.element;
  }

  getWindowScrollPosition() {
    let element = this.getElement();
    if (this.windowScroll) {
      return window.pageYOffset + window.innerHeight;
    }
    return element.scrollTop + window.innerHeight;
  }

  getElementHeight() {
    if (this.windowScroll) {
      return document.documentElement.scrollHeight;
    }
    return this.element.scrollHeight;
  }
}
