module.exports = (sequelize, Sequelize) => {
  const Rdp = sequelize.define("rdp", {
    ipAddr: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
  });

  return Rdp;
};
