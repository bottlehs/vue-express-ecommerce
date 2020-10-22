module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    usersId: {
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "publish",
    },
    ipAddress: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  });

  return Product;
};
