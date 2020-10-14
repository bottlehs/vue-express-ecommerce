module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("posts", {
    usersId: {
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },
    title: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "publish",
    },
    commentsStatus: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "open",
    },
    type: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "post",
    },
    commentsCount: {
      type: Sequelize.BIGINT(20),
      allowNull: false,
      defaultValue: 0,
    },
    ipAddress: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  });

  return Post;
};
