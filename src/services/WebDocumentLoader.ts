import { Page } from 'puppeteer'

export class WebDocumentLoader {
  private page: Page
  constructor(page: Page) {
    this.page = page
  }

  async load(url: string): Promise<Document> {
    await this.page.goto(url)
    return await this.page.evaluate(() => document)
  }
}
