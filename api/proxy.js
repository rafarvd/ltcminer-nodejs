const proxy = {
  host: process.env.IP_PROXY || "5.35.70.97",
  port: process.env.PORT_PROXY || "3333",
  username: process.env.USER_PROXY || "admin",
  password: process.env.PASS_PROXY || "admin",
};

module.exports = proxy;