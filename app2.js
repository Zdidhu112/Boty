const puppeteer = require("puppeteer");

// const form = "https://docs.google.com/forms/d/e/1FAIpQLScEDpw1q9HDcIJq_AqUE3Sf3KTuQx_A-d0vD1m5tqGINlUGKA/viewform?usp=publish-editor";
const form = "https://forms.gle/9UTr5dm98BoDieNe8";
const text = ["V LO Kraków", "V"];
start(form, true)

async function start(url, submitForm) {
    const browser = await puppeteer.launch({
        headless: false,

    });
    const page = await browser.newPage();
    for (let y = 0; y < 3; y++) {


        try {
            await page.goto(url, { waitUntil: 'load' });
            const title = await page.$eval("title", el => el.textContent);
            console.log("Otwarto");
            console.log("Nazwa: " + title);
            let isEnd = 0;
            while (!isEnd) {
                isEnd = await fill(page)
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
function getArrrayZero(n) {
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(0)
    }
    return arr;
}
async function fill(page) {
    let els = await page.$$('.whsOnd.zHQkBf');
    console.log(els.length)
    for (let i = 0; i < els.length; i++) {
        await els[i].click();
        await page.keyboard.type(text[getRndInteger(0, text.length - 1)]);
    }
    let radioLists = await page.$$(".tyNBNd");
    console.log(radioLists.length);

    for (let i = 0; i < radioLists.length; i++) {
        let radio = await radioLists[i].$$('[role="radio"].Od2TWd:not([data-value="__other_option__"])');
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
    let checkBoxLists = await page.$$(".Y6Myld");
    console.log(checkBoxLists.length);

    for (let i = 0; i < checkBoxLists.length; i++) {
        let check = await checkBoxLists[i].$$('[role="checkbox"]:not([data-answer-value="__other_option__"])');
        console.log(check + '\n' + check.length);
        let toCheck = getRndInteger(1, check.length);
        let arr = getArrrayZero(toCheck);

        for (let j = 0; j < toCheck; j++) {
            let rnd = getRndInteger(0, check.length - 1);
            if (!arr[rnd]) {
                await check[rnd].click();
                arr[rnd] = 1;
            } else {
                j--;
            }
        }
    }
    let sendButton = await page.$(".QvWxOd");
    if (sendButton) {
        await sendButton.click();
        await page.waitForNavigation();
        const submissionPage = await page.url();
        console.log(submissionPage);
        if (submissionPage.includes("formResponse")) {
            console.log("Form Submitted Successfully");
        }
        return 1;
    } else {
        await page.click('[jsname="OCpkoe"]');
        await page.waitForNavigation();
        const submissionPage = await page.url();
        console.log(submissionPage);
        return 0;
    }
}