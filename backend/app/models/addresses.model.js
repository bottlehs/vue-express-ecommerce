module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define("addresses", {
    usersId: {
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },    
    status: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "publish",
    },
    basic: {
      type: Sequelize.STRING(1),
      allowNull: false,
      defaultValue: "N",
    },
    ipAddress: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  });

  return Address;
};
