module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    usersId: {
      /**
       * users id (후보키) */          
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },
    name: {
      /**
       * 상품명 */                
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      /**
       * 상태
       * publish:공개
       * */              
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "publish",
    },
    ipAddress: {
      /**
       * 아이피주소 */       
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  });

  return Product;
};
