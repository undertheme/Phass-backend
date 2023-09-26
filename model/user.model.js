module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    chatId: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false,
    },
    purchaseCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  return User;
};
