const userService = require("../service/user");

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
  userService
    .create(req.body)
    .then((data) => resolve(data, res))
    .catch((err) => reject(err, res));
};
exports.remove = (req, res) => {
  userService
    .delete(req.body.id)
    .then((data) => resolve(data, res))
    .catch((err) => reject(err, res));
};
