<template>
  <div class="list">
    <b-container fluid>
      <!-- 검색 폼 -->
      <b-row> </b-row>

      <!-- 검색 결과 -->
      <b-table striped hover :items="items" :fields="fields">
        <template #cell(actions)="row">
          <b-link :to="{ name: 'AddressesId', params: { id: row.item.id } }">
            <b-icon-search></b-icon-search>
          </b-link>
          <b-link
            :to="{ name: 'AddressesEditId', params: { id: row.item.id } }"
          >
            <b-icon-pencil></b-icon-pencil>
          </b-link>
        </template>
      </b-table>

      <!-- 페이징 -->
      <b-row>
        <b-col lg="6">
          <div align="left">
            Showing <b>{{ $n(currentPage) }}</b> to <b>{{ $n(pageSize) }}</b> of
            <b>{{ $n(totalItems) }}</b> entries
          </div>
        </b-col>
        <b-col lg="6">
          <b-pagination-nav
            :link-gen="linkGen"
            :number-of-pages="totalPages"
            v-model="currentPage"
            align="right"
            @page-click="pageLink"
          ></b-pagination-nav>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

/**
 * service
 */
import AddressesService from "@/services/addresses.service.js";

export default {
  name: "AddressesList",
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
          key: "usersId",
          label: this.$t("addresses_users_id")
        },
        {
          /**
           * 주소지명 */
          key: "title",
          label: this.$t("addresses_title")
        },
        {
          /**
           * 주문자 이름 */
          key: "name",
          label: this.$t("addresses_name")
        },
        {
          /**
           * 주문자 Email */
          key: "email",
          label: this.$t("addresses_email")
        },
        {
          /**
           * 주문자 연락처 */
          key: "tel",
          label: this.$t("addresses_tel")
        },
        {
          /**
           * 주문자 국가 */
          key: "country",
          label: this.$t("addresses_country")
        },
        {
          /**
           * 주문자 주소 */
          key: "address",
          label: this.$t("addresses_address")
        },
        {
          /**
           * 주문자 상세 주소 */
          key: "detailAddress",
          label: this.$t("addresses_detail_address")
        },
        {
          /**
           * 주문자 우편번호 */
          key: "postcode",
          label: this.$t("addresses_postcode")
        },
        {
          /**
           * 메모 */
          key: "memo",
          label: this.$t("addresses_memo")
        },
        {
          /**
           * 상태 */
          key: "status",
          label: this.$t("addresses_status")
        },
        {
          /**
           * 기본여부 */
          key: "basic",
          label: this.$t("addresses_basic")
        },
        {
          /**
           * Action
           */
          key: "actions",
          label: "Actions"
        }
      ],
      items: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
      pageSize: 10
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
        page: this.currentPage,
        size: this.pageSize
      };

      AddressesService.findAll(params).then(
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
        path: "/users/",
        query: { page: pageNum }
      };
    }
  }
};
</script>

<style scoped></style>
