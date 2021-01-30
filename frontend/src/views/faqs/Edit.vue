<template>
  <div class="edit">
    FaqsEdit
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
import FaqsService from "@/services/faqs.service.js";

export default {
  name: "FaqsEdit",
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
       * id : 단건 식별자
       * item : 응답 데이터
       * wait : 로딩
       * formWait : 폼 로딩
       * form : 폼
       */
      id: 0,
      wait: false,
      formWait: false,
      form: {
        /**
         * question: 질문
         * answer: 답변
         * status: 상태
         */
        question: "",
        answer: "",
        status: ""
      },
      item: {}
    };
  },
  created() {
    /**
     * created
     */
    if (
      Object.prototype.hasOwnProperty.call(
        this.$router.currentRoute.params,
        "id"
      )
    ) {
      this.id = this.$router.currentRoute.params.id;
      this.findOne();
    }
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
    findOne() {
      this.wait = false;
      FaqsService.findOne(this.id).then(
        response => {
          const { data } = response;
          this.item = data;

          // form
          if (Object.prototype.hasOwnProperty.call(data, "question")) {
            this.form.question = data.question;
          }
          if (Object.prototype.hasOwnProperty.call(data, "answer")) {
            this.form.answer = data.answer;
          }
          if (Object.prototype.hasOwnProperty.call(data, "status")) {
            this.form.status = data.status;
          }

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

<style scoped></style>
