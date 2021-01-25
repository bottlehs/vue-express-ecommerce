module.exports = (sequelize, Sequelize) => {
  const Purchase = sequelize.define("purchases", {
    usersId: {
      /**
       * users id (후보키) */             
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },
    cartsId: {
      /**
       * carts id (후보키) */             
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
    /**
     * TODO : 국가, 도시, 우변번호, 상세주소, 전화번호, 받는사람등 정보 필요
     */    
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
      defaultValue: "payment",
    },
    ipAddress: {
      /**
       * 아이피주소 */            
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  });

  return Purchase;
};
