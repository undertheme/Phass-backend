const config = require("../config");
const db = require("../model/index");

const User = db.user;

const resolve = (data) => {
  return {
    success: true,
    data,
  };
};

const reject = (err) => {
  console.log("User Service Error:", err);
  return {
    success: false,
    message: err.message || "Some error occurred",
  };
};

exports.create = (user) => {
  if (!user.name) {
    return;
  }

  User.create(user).then(resolve).catch(reject);
};

exports.findAll = async (_, res) => {
  User.findAll({
    include: [],
  })
    .then(resolve)
    .catch(reject);
};

exports.findOneByID = (id) => {
  User.findByPk(id, {
    include: [],
  })
    .then(resolve)
    .catch(reject);
};

exports.update = async (id, data) => {
  try {
    const result = await User.update(data, {
      where: { id },
    });

    return { success: result[0] === 1 };
  } catch (e) {
    return reject(e);
  }
};

exports.delete = (id) => {
  User.destroy({
    where: { id },
  })
    .then((num) => {
      return { success: num === 1 };
    })
    .catch(reject);
};
