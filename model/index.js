const Sequelize = require("sequelize");
const { dbConfig } = require("../config/index");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

global.Sequelize = sequelize;

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize);
db.session = require("./session.model")(sequelize, Sequelize);
db.UserLure = require("./UserLure.model")(sequelize, Sequelize);

module.exports = db;
