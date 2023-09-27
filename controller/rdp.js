const rdpService = require("../service/rdp");

const resolve = (data, res) => {
  return res.status(200).send({
    success: true,
    data,
  });
};

const reject = (err, res) => {
  console.log("Rdp Service Error:", err);
  return res.status(500).send({
    success: false,
    message: err.message || "Some error occurred",
  });
};

exports.create = (req, res) => {
  rdpService
    .create(req.body)
    .then((data) => resolve(data, res))
    .catch((err) => reject(err, res));
};

exports.getAll = (_, res) => {
  rdpService
    .findAll()
    .then((data) => resolve(data, res))
    .catch((err) => reject(err, res));
};

exports.remove = (req, res) => {
  rdpService
    .delete(req.body.ipAddr)
    .then((data) => resolve(data, res))
    .catch((err) => reject(err, res));
};
