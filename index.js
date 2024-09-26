const ltcminer = require("./api/ltcminer.js");
const sleep = require("./api/sleep.js");
require("dotenv").config();

const login = process.env.LOGIN_LTCMINER;
const senha = process.env.PASSWORD_LTCMINER;
const wallet = process.env.LTC_ADDRESS;

const run = async () => {
  for (let l of login.split(",")) {
    await ltcminer(l, senha, wallet);
    await sleep(5);
  }
};

run();
