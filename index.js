const path = require('path')
const { default: puppeteer } = require('puppeteer')
const { OpenJson, CreateFile, GetFileNamesAsync } = require('./fileManager.js')
const { ParseTop100 } = require('./parseOptions.js')

const APP_PATH = path.join('D:', 'TRACKS')
const GENERES_PATH = path.join(APP_PATH, 'genres.json')
const TOPS_PATH = path.join(APP_PATH, 'tops')

;(async () => {
  // Load Files
  const genres = OpenJson(GENERES_PATH)
  const filesList = await GetFileNamesAsync(TOPS_PATH)

  const fileSet = new Set(filesList)

  // Puppeteer Config
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()

  await scrapTop100({ genres, fileSet, page })

  await browser.close()
})()

async function scrapTop100({ page, genres, fileSet }) {
  for (const { genre, url } of genres) {
    const listName = `${genre.replaceAll('/', '-')}.json`
    if (!fileSet.has(listName)) {
      await page.goto(url + '/top-100')
      const content = await page.evaluate(ParseTop100)

      const genreDir = path.join(TOPS_PATH, listName)
      CreateFile(genreDir, JSON.stringify(content))

      console.log(listName)
    }
  }
}
