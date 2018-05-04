import { MemoryPostPage } from './app.po';

describe('memory-post App', () => {
  let page: MemoryPostPage;

  beforeEach(() => {
    page = new MemoryPostPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
