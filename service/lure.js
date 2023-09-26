const db = require("../model/index");

const UserLure = db.UserLure;

exports.create = (userLure) => {
  return new Promise((resolve, reject) => {
    UserLure.create(userLure).then(resolve).catch(reject);
  });
};

exports.findOne = (clause) => {
  return new Promise((resolve, reject) => {
    UserLure.findOne({ where: clause }).then(resolve).catch(reject);
  });
};

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    UserLure.destroy({
      where: { id },
    })
      .then((num) => {
        return { success: num === 1 };
      })
      .catch(reject);
  });
};
