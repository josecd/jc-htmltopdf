const fs = require('fs')
const hbs = require('handlebars')
const puppeteer = require('puppeteer')

/**
 * Método para generar un PDF desde un html template
 * @param {String} htmlPath Es el path donde estara guardado en html que se va a transformar en PDF.
 * @param {Array} [info] Información que vamos a pasar al HTML.
 * @param {String} [CHROMIUM_PATH] Este path se usa cuando subimos a un servicio de la nube si no se requiere pasar un "", se debe crear una variable de entorno del path ejemplo= process.env.CHROMIUM_PATH
 * @param {String} [format] Formato del PDF, por defecto es Tabloid formatos permitidos  'Letter',
    'Legal',
    'A4',
    'Tabloid',
    'A3',
    'A5',
    'A6',
    'A7',
    'A8',
    'Folio'
 * @returns retorna el buffer
 */

const jcGeneratepdfHtml = async (htmlPath, info, CHROMIUM_PATH, format) => {
 
  if (esFormatoValido(format) == false) {
    format = Tabloid
    console.warn('Formato no admitido se asigno Tabloid ');
  }

  let browser
  if (CHROMIUM_PATH) {
    console.log('CHROMIUM_PATH', CHROMIUM_PATH)
    browser = await puppeteer
      .launch({
        headless: 'new',
        executablePath: CHROMIUM_PATH,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--headless=new',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu'
        ]
      })
      .catch(err => {
        console.log('err', err)
        return err
      })
  } else {
    browser = await puppeteer.launch({
      headless: 'new',
      //   executablePath: CHROMIUM_PATH,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--headless=new',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu'
      ]
    })
  }

  const page = await browser.newPage()
  const filePath = htmlPath
  const html = await fs.readFileSync(filePath, 'utf-8')
  const content = hbs.compile(html)(info)
  await page.setContent(content)
  const buffer = await page.pdf({
    printBackground: true,
    margin: {
      left: '10mm',
      top: '10mm',
      right: '10mm',
      bottom: '10mm'
    },
    format: format | 'Tabloid'
  })
  await browser.close()
  return buffer
}

const esFormatoValido = formato => {
    const validFormats = [
        'Letter',
        'Legal',
        'A4',
        'Tabloid',
        'A3',
        'A5',
        'A6',
        'A7',
        'A8',
        'Folio'
      ]
  if (validFormats.includes(formato)) {
    return true // El formato es válido.
  } else {
    return false // El formato no es válido.
  }
}

module.exports = {
  generatepdfHtml
}
