<template>
  <div class="list">
    <b-table striped hover :items="items" :fields="fields"></b-table>
    <div class="overflow-auto">
      <b-pagination-nav :link-gen="linkGen" :number-of-pages="totalPages" v-model="currentPage" align="center" @page-click="pageLink"></b-pagination-nav>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

/**
 * service
 */
import PurchasesService from "@/services/purchases.service.js";

export default {
  name: "PurchasesList",
  components: {
    /**
     * components
     */
  },
  data() {
    return {
      /**
       * search : 검색 데이터
       * fields : 검색결과 페이지 리스트 필드
       * items : 응답 리스트 데이터
       * page : 검색결과 페이지 데이터
       * wait : 로딩
       * totalItems : 전체 데이터수
       * totalPages : 전체 페이지수
       * currentPage : 현제 페이지
       * pageSize: 페이지 요청 데이터수
       */
      wait: false,
      search: {
        /**
         */
      },
      fields: [
        {
          /**
           * users id (후보키) */
          key: 'usersId',
          label: 'usersId'
        },
        {
          /**
           * carts id (후보키) */
          key: 'cartsId',
          label: 'cartsId'
        },
        {
          /**
           * products id (후보키) */
          key: 'productsId',
          label: 'productsId'
        },
        {
          /**
           * productsOptions id (후보키) */
          key: 'productsOptionsId',
          label: 'productsOptionsId'
        },
        {
          /**
           * 서드파티 거래 고유 번호 */
          key: 'thirdPartyUid',
          label: 'thirdPartyUid'
        },
        {
          /**
           * 가맹점에서 생성/관리하는 고유 주문번호 */
          key: 'merchantUid',
          label: 'merchantUid'
        },
        {
          /**
           * 결제수단 */
          key: 'method',
          label: 'method'
        },
        {
          /**
           * 결제금액	*/
          key: 'amount',
          label: 'amount'
        },
        {
          /**
           * 결제승인/시도된 PG사 */
          key: 'pgProvider',
          label: 'temp'
        },
        {
          /**
           * PG사 거래고유번호 */
          key: 'pgId',
          label: 'pgId'
        },
        {
          /**
           * 주문자 이름 */
          key: 'name',
          label: 'name'
        },
        {
          /**
           * 주문자 Email */
          key: 'email',
          label: 'email'
        },
        {
          /**
           * 주문자 연락처 */
          key: 'tel',
          label: 'tel'
        },
        {
          /**
           * 주문자 국가 */
          key: 'country',
          label: 'country'
        },
        {
          /**
           * 주문자 주소 */
          key: 'address',
          label: 'address'
        },
        {
          /**
           * 주문자 상세 주소 */
          key: 'detailAddress',
          label: 'detailAddress'
        },
        {
          /**
           * 주문자 우편번호 */
          key: 'postcode',
          label: 'postcode'
        },
        {
          /**
           * 가맹점 임의 지정 데이터 */
          key: 'customData',
          label: 'customData'
        },
        {
          /**
           * 결제승인시각*/
          key: 'purchasesAt',
          label: 'purchasesAt'
        },
        {
          /**
           * PG사에서 발행되는 거래 매출전표 URL*/
          key: 'receiptUrl',
          label: 'receiptUrl'
        },
        {
          /**
           * 카드사 승인번호*/
          key: 'applyNumber',
          label: 'applyNumber'
        },
        {
          /**
           * 가상계좌 입금계좌번호*/
          key: 'vbankNumber',
          label: 'vbankNumber'
        },
        {
          /**
           * 가상계좌 은행명 */
          key: 'vbankName',
          label: 'vbankName'
        },
        {
          /**
           * 가상계좌 예금주*/
          key: 'vbankHolder',
          label: 'vbankHolder'
        },
        {
          /**
           * 가상계좌 입금기한*/
          key: 'vbankDate',
          label: 'vbankDate'
        },
        {
          /**
           * 주문자 메모 */
          key: 'memo',
          label: 'memo'
        },
        {
          /**
           * 상태
           * */
          key: 'status',
          label: 'status'
        }
      ],
      items: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: 0,
      pageSize: 10,
    };
  },
  created() {
    /**
     * created
     */
    console.log(this.$router.currentRoute.query);
    if (
      Object.prototype.hasOwnProperty.call(
        this.$router.currentRoute.query,
        "page"
      )
    ) {
      this.currentPage = this.$router.currentRoute.query.page;
    }

    this.findAll();
  },
  mounted() {
    /**
     * mounted
     */
  },
  computed: {
    /**
     * computed
     */
    ...mapGetters(["isAuthenticated"])
  },
  destroyed() {
    /**
     * destroyed
     */
  },
  methods: {
    /**
     * methods
     */
    findAll() {
      this.wait = false;

      const params = {
        page: this.currentPage - 1,
        size: this.pageSize
      };

      PurchasesService.findAll(params).then(
        response => {
          const { data } = response;
          this.totalItems = data.totalItems;
          this.totalPages = data.totalPages;
          this.items = data.items;
          this.wait = true;
        },
        error => {
          console.log(error);
        }
      );
    },
    pageLink(button, page) {
      this.currentPage = page;
      this.findAll();
    },
    linkGen(pageNum) {
      return {
        path: '/users/',
        query: { page: pageNum }
      }
    }
  }
};
</script>

<style scoped></style>
