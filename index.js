const puppeteer = require('puppeteer');
const cheerio = require('cheerio')
var express = require('express');
var app = express();
app.get('/getstories', (req, res) => {
    scrap().then((response) => {
        var data=[];
        const $ = cheerio.load(response)
        $('article').each(function(e) {
            data.push({
            'title':$(this).find('h2').text(),
            'link':$(this).find('a').attr('href'),
            'preview':$(this).find('p').text(),
            'src':'https://www.delhisexchat.com/content/uploads/2015/08/12-3-150x150.jpg'
        });
          });
        console.log(data)
        res.json(data)
    }).catch((error) => {
        console.error(error)
    })
})

app.listen(5000, () => {
    console.info('server running in PORT=5000')
})
async function scrap() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.indiansexstories.net/')
    let data = await page.evaluate(() => {
        return document.querySelector('.latest-stories').innerHTML;
    });
    browser.close();
    return data;
}