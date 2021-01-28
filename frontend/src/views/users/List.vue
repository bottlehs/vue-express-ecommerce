<template>
  <div class="list">
    users list
  </div>
</template>

<script>
/**
 * vuex
 */
import { mapGetters } from "vuex";

/**
 * service
 */
import UsersService from "@/services/users.service.js";

export default {
  name: "UsersList",
  components: {
    /**
     * components
     */
  },
  data() {
    /**
     * data
     */
    return {
      /**
       * search : 검색 데이터
       * items : 응답 리스트 데이터
       * page : 검색결과 페이지 데이터
       * wait : 로딩
       */
      wait: false,      
      search: {
        /**
         * page : 요청 페이지수
         * size : 요청 페이지별 데이터 수
         */
        page: 0,
        size: 10,
      },      
      items: [],
      page: {
        /**
         * totalItems : 전체 데이터수
         * totalPages : 전체 페이지수
         * currentPage : 현제 페이지
         */
        totalItems: 6,
        totalPages: 1,
        currentPage: 2
      }
    };
  },
  created() {
    /**
     * created
     */
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
          page: this.search.page,
          size: this.search.size,          
        };

        UsersService.findAll(params).then(
          response => {
            const { data } = response;
            this.page.totalItems = data.totalItems;
            this.page.totalPages = data.totalPages;
            this.page.currentPage = data.currentPage;
            this.items = data.items;
            this.wait = true;
          },
          error => {
            console.log(error);
          }
        );
    }
  }
};
</script>

<style scoped>
</style>
