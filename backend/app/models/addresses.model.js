module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define("addresses", {
    usersId: {
      /**
       * users id (후보키) */          
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },
    title: {
      /**
       * 주소지명 */          
      type: Sequelize.STRING(20),
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
    memo: {
      /**
       * 메모 */            
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
    basic: {
      /**
       * 기본여부
       * Y:기본주소
       * Y:주소 
       * */        
      type: Sequelize.STRING(1),
      allowNull: false,
      defaultValue: "N",
    },
    ipAddress: {
      /**
       * 아이피주소 */      
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  });

  return Address;
};
