module.exports = (sequelize, Sequelize) => {
  const Delivery = sequelize.define("delivery", {
    usersId: {
      /**
       * users id (후보키) */             
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },    
    purchasesId: {
      /**
       * purchases id (후보키) */             
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },
    name: {
      /**
       * 주문자 이름 */            
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    email: {
      /**
       * 주문자 Email */            
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    tel: {
      /**
       * 주문자 연락처 */            
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    country: {
      /**
       * 주문자 국가 */            
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    address: {
      /**
       * 주문자 주소 */            
      type: Sequelize.STRING(100),
      allowNull: false,
    },    
    detailAddress: {
      /**
       * 주문자 상세 주소 */            
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    postcode: {
      /**
       * 주문자 우편번호 */            
      type: Sequelize.STRING(100),
      allowNull: false,
    },    
    courier: {
      /**
       * 배송택배사 */            
      type: Sequelize.STRING(100),
      allowNull: false,
    },    
    trackingNumber: {
      /**
       * 운송장번호 */            
      type: Sequelize.STRING(100),
      allowNull: false,
    },        
    memo: {
      /**
       * 주문자 메모 */            
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      /**
       * 상태
       * ready:배송준비
       * shipping:배송중
       * completed:배송완료
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

  return Delivery;
};
