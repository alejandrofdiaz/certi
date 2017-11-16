const puppeteer = require('puppeteer');
const path = require('path');
const htmlTemplate = require('./contentHtml');
const stylesheet = require('./stylesheet');

const render = async (html, filename) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.emulateMedia('screen');
	await page.setContent(html);
	await page.addStyleTag({ content: stylesheet() })
	await page.pdf({
		path: path.resolve(__dirname, `${filename}.pdf`),
		printBackground: true,
		format: 'a4'
	});
	await browser.close();
}

module.exports = {
	render
}