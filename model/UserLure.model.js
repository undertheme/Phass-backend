module.exports = (sequelize, Sequelize) => {
  const UserLure = sequelize.define("user_lure", {
    channel: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    landingUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return UserLure;
};
