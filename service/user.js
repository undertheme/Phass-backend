const db = require("../model/index");

const User = db.user;

exports.create = (user) => {
  if (!user.name) {
    return;
  }
  return new Promise((resolve, reject) => {
    console.log(user);
    User.create(user).then(resolve).catch(reject);
  });
};

exports.findAll = async (_, res) => {
  return new Promise((resolve, reject) => {
    User.findAll({
      include: [],
    })
      .then(resolve)
      .catch(reject);
  });
};

exports.findOneByID = (id) => {
  return new Promise((resolve, reject) => {
    User.findByPk(id, {
      include: [],
    })
      .then(resolve)
      .catch(reject);
  });
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
  return new Promise((resolve, reject) => {
    User.destroy({
      where: { id },
    })
      .then((num) => {
        resolve({ success: num === 1 });
      })
      .catch(reject);
  });
};
