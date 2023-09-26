const db = require("../model/index");

const Session = db.session;

exports.create = (session) => {
  return new Promise((resolve, reject) => {
    if (!session.landingUrl) {
      return;
    }

    Session.create(session).then(resolve).catch(reject);
  });
};

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    Session.destroy({
      where: { id },
    })
      .then((num) => {
        return { success: num === 1 };
      })
      .catch(reject);
  });
};
