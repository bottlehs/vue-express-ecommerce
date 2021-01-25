module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define("addresses", {
    usersId: {
      /**
       * users id (후보키) */          
      type: Sequelize.BIGINT(20),
      allowNull: false,
    },
    name: {
      /**
       * 주소지명 */          
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    /**
     * TODO : 국가, 도시, 우변번호, 상세주소, 전화번호, 받는사람등 정보 필요
     */    
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
