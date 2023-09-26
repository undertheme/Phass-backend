const db = require("../model/index");

const Session = db.session;

const resolve = (data) => {
  return {
    success: true,
    data,
  };
};

const reject = (err) => {
  console.log("Session Service Error:", err);
  return {
    success: false,
    message: err.message || "Some error occurred",
  };
};

exports.create = (session) => {
  if (!session.landingUrl) {
    return;
  }

  Session.create(session).then(resolve).catch(reject);
};

exports.delete = (id) => {
  Session.destroy({
    where: { id },
  })
    .then((num) => {
      return { success: num === 1 };
    })
    .catch(reject);
};
