const db = require("../model/index");

const Rdp = db.rdp;

exports.create = (rdp) => {
  return new Promise((resolve, reject) => {
    Rdp.create(rdp).then(resolve).catch(reject);
  });
};

exports.findAll = async (_, res) => {
  return new Promise((resolve, reject) => {
    Rdp.findAll({}).then(resolve).catch(reject);
  });
};

exports.findOneByID = (id) => {
  return new Promise((resolve, reject) => {
    Rdp.findByPk(id, {
      include: [],
    })
      .then(resolve)
      .catch(reject);
  });
};

exports.delete = (ipAddr) => {
  return new Promise((resolve, reject) => {
    Rdp.destroy({
      where: { ipAddr },
    })
      .then((num) => {
        resolve({ success: num === 1 });
      })
      .catch(reject);
  });
};
