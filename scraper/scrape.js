import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'
import https from 'https'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_JSON = path.join(__dirname, '../src/data/scraped.json')
const OUT_IMGS = path.join(__dirname, '../public/scraped')

fs.mkdirSync(OUT_IMGS, { recursive: true })

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    https.get(url, (response) => {
      response.pipe(file)
      file.on('finish', () => { file.close(); resolve(dest) })
    }).on('error', reject)
  })
}

async function scrape() {
  console.log('\n🚀  Lanzando Chrome en modo visible con DevTools...\n')

  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
    defaultViewport: null,
    args: [
      '--start-maximized',
      '--no-sandbox',
      '--disable-blink-features=AutomationControlled',
    ],
    executablePath: '/usr/bin/google-chrome',
  })

  const page = await browser.newPage()

  // Evitar detección de automation
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined })
  })

  await page.setUserAgent(
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  )

  console.log('📱  Navegando a Facebook: All Exclusive...')
  await page.goto('https://www.facebook.com/RopaExclusivaMexicoLLC', {
    waitUntil: 'networkidle2',
    timeout: 30000,
  })

  // Dar tiempo para ver la página
  await new Promise(r => setTimeout(r, 4000))

  // Dismiss cookie consent if present
  try {
    const cookieBtn = await page.$('[data-cookiebanner="accept_button"]')
    if (cookieBtn) {
      await cookieBtn.click()
      console.log('🍪  Cookie banner cerrado')
      await new Promise(r => setTimeout(r, 1000))
    }
  } catch (e) {}

  // Try to close any login dialog
  try {
    await page.keyboard.press('Escape')
    await new Promise(r => setTimeout(r, 500))
  } catch (e) {}

  console.log('🔍  Extrayendo datos...')

  const data = await page.evaluate(() => {
    const result = {
      logo: null,
      images: [],
      name: '',
      description: '',
      likes: '',
    }

    // Logo from og:image or profile picture
    const ogImage = document.querySelector('meta[property="og:image"]')
    if (ogImage) result.logo = ogImage.content

    // Name
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) result.name = ogTitle.content

    // Description
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) result.description = ogDesc.content

    // All images from the page (profile, cover, posts)
    const imgs = [...document.querySelectorAll('img')]
    result.images = imgs
      .map(img => img.src)
      .filter(src =>
        src &&
        src.startsWith('https://') &&
        src.includes('fbcdn.net') &&
        !src.includes('emoji') &&
        !src.includes('1x1') &&
        src.includes('.jpg')
      )
      .filter((src, i, arr) => arr.indexOf(src) === i) // dedupe
      .slice(0, 20)

    return result
  })

  console.log(`\n✅  Datos extraídos:`)
  console.log(`   Nombre: ${data.name}`)
  console.log(`   Logo: ${data.logo ? '✓' : '✗'}`)
  console.log(`   Imágenes encontradas: ${data.images.length}`)

  // Scroll down to load more images
  console.log('\n📜  Scrolleando para cargar más imágenes...')
  for (let i = 0; i < 5; i++) {
    await page.evaluate(() => window.scrollBy(0, 800))
    await new Promise(r => setTimeout(r, 1200))
  }

  const moreImages = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('img')]
    return imgs
      .map(img => img.src)
      .filter(src =>
        src &&
        src.startsWith('https://') &&
        src.includes('fbcdn.net') &&
        !src.includes('emoji') &&
        !src.includes('1x1') &&
        src.includes('.jpg')
      )
      .filter((src, i, arr) => arr.indexOf(src) === i)
  })

  const allImages = [...new Set([...data.images, ...moreImages])].slice(0, 30)
  data.images = allImages
  console.log(`   Total imágenes: ${allImages.length}`)

  // Download images
  console.log('\n⬇️   Descargando imágenes...')
  const localImages = []
  const localLogo = null

  if (data.logo) {
    try {
      const logoPath = path.join(OUT_IMGS, 'logo.jpg')
      await downloadImage(data.logo, logoPath)
      data.logo = '/scraped/logo.jpg'
      console.log('   ✓ Logo descargado')
    } catch (e) {
      console.log(`   ✗ Error descargando logo: ${e.message}`)
    }
  }

  for (let i = 0; i < Math.min(data.images.length, 12); i++) {
    try {
      const imgPath = path.join(OUT_IMGS, `img_${i}.jpg`)
      await downloadImage(data.images[i], imgPath)
      localImages.push(`/scraped/img_${i}.jpg`)
      process.stdout.write(`   ✓ img_${i}.jpg\n`)
    } catch (e) {
      process.stdout.write(`   ✗ img_${i}.jpg: ${e.message}\n`)
    }
  }

  data.images = localImages

  // Save JSON
  fs.writeFileSync(OUT_JSON, JSON.stringify(data, null, 2))
  console.log(`\n💾  Guardado en ${OUT_JSON}`)
  console.log('\n🎉  ¡Scraping completado! Puedes cerrar el navegador o dejarlo abierto.\n')

  // Leave browser open for inspection
  // await browser.close()
}

scrape().catch(err => {
  console.error('Error en scraper:', err)
  process.exit(1)
})
