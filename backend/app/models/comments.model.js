module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comments", {
    postsId: {
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },
    usersId: {
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },
    parent: {
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "comment",
    },
    ipAddress: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  });

  return Comment;
};
