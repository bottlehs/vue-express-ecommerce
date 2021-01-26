const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

// check the databse connection
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users.model.js")(sequelize, Sequelize);
db.faqs = require("./faqs.model.js")(sequelize, Sequelize);
db.inquires = require("./inquires.model.js")(sequelize, Sequelize);
db.posts = require("./posts.model.js")(sequelize, Sequelize);
db.comments = require("./comments.model.js")(sequelize, Sequelize);
db.products = require("./products.model.js")(sequelize, Sequelize);
db.productsOptions = require("./products.options.model.js")(sequelize, Sequelize);
db.carts = require("./carts.model.js")(sequelize, Sequelize);
db.addresses = require("./addresses.model.js")(sequelize, Sequelize);
db.purchases = require("./purchases.model.js")(sequelize, Sequelize);
db.deliveries = require("./deliveries.model.js")(sequelize, Sequelize);

module.exports = db;
