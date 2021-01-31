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
import DeliveriesService from "@/services/deliveries.service.js";

export default {
  name: "DeliveriesList",
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
          key: 'temp',
          label: 'temp'
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

      DeliveriesService.findAll(params).then(
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
