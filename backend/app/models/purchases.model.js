module.exports = (sequelize, Sequelize) => {
  const Purchase = sequelize.define("purchases", {
    usersId: {
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },
    cartsId: {
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },    
    productsId: {
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },
    productsOptionsId: {
      type: Sequelize.BIGINT(20),
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

  return Purchase;
};
