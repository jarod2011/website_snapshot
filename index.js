const website = 'https://developerhome.net';
const snapshotPathRoot = './snapshot/'
const puppeteer = require('puppeteer');

const sleep = (second) => {
    return new Promise((resolve, reject) => {
        console.debug('start to sleep '+second+' seconds...')
        setTimeout(resolve, second*1000);
    }).then(() => {
        console.debug(second+' seconds up!')
    })
}

(async () => {
    console.debug('launch browser...')
    const browser = await puppeteer.launch();
    console.debug('create new page...')
    const page = await browser.newPage();
    await page.setViewport({
        width: 1280,
        height: 960,
        isMobile: false,

    })
    await page.setJavaScriptEnabled(true)
    console.debug('start to visit website: '+website)
    await page.goto(website);
    const filename = (new Date()).toISOString()+".png"
    console.debug('screenshot website to file: '+snapshotPathRoot+filename)
    for (let i = 0; i < 5; i++) {
        await page.keyboard.press('PageDown')
        await sleep(0.5)
    }
    for (let i = 0; i < 5; i++) {
        await page.keyboard.press('PageUp')
        await sleep(0.5)
    }
    console.debug('wait page load...')
    await sleep(2)
    console.debug('time up, start screenshot')
    await page.screenshot({
        path: snapshotPathRoot+filename,
        fullPage: true
    })
    console.debug('wait close browser...')
    await browser.close()
    console.debug('all close exit.')
})();