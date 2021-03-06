module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define("carts", {
    usersId: {
      /**
       * users id (후보키) */       
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },
    productsId: {
      /**
       * products id (후보키) */        
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },
    productsOptionsId: {
      /**
       * productsOptions id (후보키) */        
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },
    status: {
      /**
       * 상태
       * standby:결제대기
       * payment:결제완료 
       * delivery:배송중 
       * complete:결제대기 ~ 결제완료 ~ 배송중 ~ 완료 
       * return:반품
       * cancel:취소 
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

  return Cart;
};
