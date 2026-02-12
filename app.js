const puppeteer = require("puppeteer");
const { setTimeout } = require("node:timers/promises");
const form = "https://docs.google.com/forms/d/e/1FAIpQLSd-geSCMw3eOlSybdyhTp4kU0oigEuOZkf9r3Ry5HJlqRaCQQ/viewform?usp=publish-editor";
const text = ["dupa", "kebab", "komuch", "Chodacka"];

send(form, true)

async function send(url, submitForm) {
    const browser = await puppeteer.launch({
        headless: false,

    });
    const page = await browser.newPage();
    for (let y = 0; y < 30; y++) {

        try {

            // await page.goto(url, {waitUntil: 'networkidle2'});
            await page.goto(url, { waitUntil: 'domcontentloaded' });
            const title = await page.$eval("title", el => el.textContent);
            console.log("Otwarto");
            console.log("Nazwa: " + title);

            // await page.locator('.whsOnd.zHQkBf').fill('value');

            let els = await page.$$('.whsOnd.zHQkBf');
            console.log(els.length)
            // setTimeout(500)
            for (let i = 0; i < els.length; i++) {
                await els[i].click();
                await page.keyboard.type(text[getRndInteger(0, text.length - 1)]);
            }
            let radioLists = await page.$$(".tyNBNd");
            console.log(radioLists.length);

            for (let i = 0; i < radioLists.length; i++) {
                let radio = await radioLists[i].$$('[role="radio"].Od2TWd');
                console.log(radio + '\n' + radio.length);
                await radio[getRndInteger(0, radio.length - 1)].click();
            }

            let ratingLists = await page.$$(".walClc");
            console.log(ratingLists.length);

            for (let i = 0; i < ratingLists.length; i++) {
                let rating = await ratingLists[i].$$('[role="radio"].p8oyLd');

                console.log(rating.length);
                await rating[getRndInteger(0, rating.length - 1)].click();
            }

            // await page.locator('[role="radio"]').click();
            // let rad = await page.$('[role="radio"]');
            // await rad.click();

            if (submitForm) {
                await page.click(".QvWxOd");
                await page.waitForNavigation();
                const submissionPage = await page.url();
                console.log(submissionPage);
                if (submissionPage.includes("formResponse")) {
                    console.log("Form Submitted Successfully");
                }
            }

        } catch (error) {
            console.log(error)
        }
    }
    await browser.close();

}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

