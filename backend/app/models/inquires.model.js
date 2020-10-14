module.exports = (sequelize, Sequelize) => {
  const Inquire = sequelize.define("inquires", {
    usersId: {
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },
    question: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    answer: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "publish",
    },
  });

  return Inquire;
};
