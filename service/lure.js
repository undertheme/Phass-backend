const db = require("../model/index");

const { UserLure } = db;

exports.create = (userLure) =>
  new Promise((resolve, reject) => {
    UserLure.create(userLure).then(resolve).catch(reject);
  });

exports.findOne = (clause) =>
  new Promise((resolve, reject) => {
    UserLure.findOne({ where: clause }).then(resolve).catch(reject);
  });

exports.delete = (id) =>
  new Promise((resolve, reject) => {
    UserLure.destroy({
      where: { id },
    })
      .then((num) => ({ success: num === 1 }))
      .catch(reject);
  });
