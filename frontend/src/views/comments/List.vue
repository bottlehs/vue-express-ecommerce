<template>
  <div class="list"></div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CommentsList",
  components: {
    /**
     * components
     */
  },
  data() {
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
    return {};
  },
  created() {
    /**
     * created
     */
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
  }
};
</script>

<style scoped></style>
