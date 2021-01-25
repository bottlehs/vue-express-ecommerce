module.exports = (sequelize, Sequelize) => {
  const ProductOption = sequelize.define("products_options", {
    productsId: {
      /**
       * products id (후보키) */                 
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },
    name: {
      /**
       * 옵션명 */                 
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

  return ProductOption;
};
