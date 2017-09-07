import { ShowMeMyMinionsPage } from './app.po';

describe('show-me-my-minions App', () => {
  let page: ShowMeMyMinionsPage;

  beforeEach(() => {
    page = new ShowMeMyMinionsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to smmm!!');
  });
});
