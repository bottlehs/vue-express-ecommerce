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
    thirdPartyUid: {
      /**
       * 서드파티 거래 고유 번호	아임포트에서 부여하는 거래건 당 고유한 번호(success:false일 때, 사전 validation에 실패한 경우라면 imp_uid는 null일 수 있음) */            
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    merchantUid: {
      /**
       * 가맹점에서 생성/관리하는 고유 주문번호 */            
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    method: {
      /**
       * 결제수단	
       * card:신용카드
       * trans:실시간계좌이체,
       * vbank:가상계좌,
       * phone:휴대폰소액결제 */            
      type: Sequelize.STRING(100),
      allowNull: false,
    },    
    amount: {
      /**
       * 결제금액	실제 결제승인된 금액이나 가상계좌 입금예정 금액 */            
      type: Sequelize.BIGINT(100),
      allowNull: false,
    },
    pgProvider: {
      /**
       * 결제승인/시도된 PG사	
       * html5_inicis:웹표준방식의 KG이니시스
       * inicis:일반 KG이니시스
       * kakaopay:카카오페이
       * uplus:LGU+,
       * nice:나이스정보통신
       * jtnet:JTNet
       * danal:다날 */            
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    pgId: {
      /**
       * PG사 거래고유번호 */            
      type: Sequelize.STRING(100),
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
    customData: {
      /**
       * 가맹점 임의 지정 데이터 */            
      type: Sequelize.TEXT,
      allowNull: false,
    },
    purchasesAt: {
      /**
       * 결제승인시각 UNIX timestamp */            
      type: Sequelize.BIGINT(100),
      allowNull: false,
    },
    receiptUrl: {
      /**
       * PG사에서 발행되는 거래 매출전표 URL	전달되는 URL을 그대로 open하면 매출전표 확인가능 */            
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    applyNumber: {
      /**
       * 카드사 승인번호	신용카드결제에 한하여 제공 */            
      type: Sequelize.STRING(100),
      allowNull: false,
    },    
    vbankNumber: {
      /**
       * 가상계좌 입금계좌번호	PG사로부터 전달된 정보 그대로 제공하므로 숫자 외 dash(-)또는 기타 기호가 포함되어 있을 수 있음 */            
      type: Sequelize.STRING(100),
      allowNull: false,
    },    
    vbankName: {
      /**
       * 가상계좌 은행명 */            
      type: Sequelize.STRING(100),
      allowNull: false,
    }, 
    vbankHolder: {
      /**
       * 가상계좌 예금주	계약된 사업자명으로 항상 일정함. 단, 일부 PG사의 경우 null반환하므로 자체 처리 필요 */            
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    vbankDate: {
      /**e
       * 가상계좌 입금기한	UNIX timestamp */            
      type: Sequelize.BIGINT(100),
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
       * ready:미결제
       * paid:결제완료
       * cancelled:결제취소(부분취소포함)
       * failed:결제실패
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
