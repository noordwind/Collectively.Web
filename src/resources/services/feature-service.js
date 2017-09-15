import {inject} from 'aurelia-framework';
import {AureliaCookie} from 'aurelia-cookie';

@inject()
export default class FeatureService {
  constructor()  {
      this.cookieName = 'collectively-devmode';
  }
 
  enable() {
    AureliaCookie.set(this.cookieName, 'true', {
        expiry: -1
    });
  }
  
  disable() {
    let cookie = AureliaCookie.delete(this.cookieName);
  }

  get enabled() {
    let cookie = AureliaCookie.get(this.cookieName);

    return cookie !== null && cookie === 'true';
  }
}
