const { connect } = require("puppeteer-real-browser");
const sleep = require("./sleep.js");

const ltcminer = async (login, senha, wallet) => {
  const { page, browser } = await connect({
    args: [
      "--disable-gpu",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-extensions",
      "--disable-images",
      "--disable-web-security",
      "--disable-features=IsolateOrigins,site-per-process",
    ],
    headless: false,
    turnstile: true,
    disableXvfb: false,
    ignoreAllFlags: false,
  });

  try {
    await page.goto("https://ltcminer.com");

    await page.waitForSelector("body");

    const token = await page.evaluate(() => {
      const tokenElement = document.querySelector('input[name="cs_token"]');
      return tokenElement ? tokenElement.value : null;
    });

    const loginResponse = await page.evaluate(
      async (login, senha, token) => {
        const formData = new FormData();
        formData.append("task", "sign_v2");
        formData.append("cs_token", token);
        formData.append("email", login);
        formData.append("password", senha);
        formData.append("reToken", "true");

        const response = await fetch("https://ltcminer.com/task/?", {
          method: "POST",
          body: formData,
        });

        return await response.json();
      },
      login,
      senha,
      token
    );

    const withdrawalResponse = await page.evaluate(async (wallet) => {
      const formData = new FormData();
      formData.append("task", "withdrawal");
      formData.append("address", wallet);

      const response = await fetch("https://ltcminer.com/task/?", {
        method: "POST",
        body: formData,
      });

      return await response.json();
    }, wallet);

    console.log(withdrawalResponse);

    return true;
  } catch (error) {
    return false;
  } finally {
    await browser.close();
  }
};

module.exports = ltcminer;
