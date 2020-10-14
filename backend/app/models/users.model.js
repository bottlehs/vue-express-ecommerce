module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("users", {
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    firstname: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    languege: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "ko",
    },
    country: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "KO",
    },
    status: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "register",
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "USER",
    },
  });

  return user;
};
