import { browser, by, element } from 'protractor';

export class ShowMeMyMinionsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('smmm-root h1')).getText();
  }
}
