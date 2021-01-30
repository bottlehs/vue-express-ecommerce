<template>
  <div class="edit">
    CartsEdit
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
import CartsService from "@/services/carts.service.js";

export default {
  name: "CartsEdit",
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
       * formWait : 폼전송
       * form : 폼
       */

      id: 0,
      wait: false,
      formWait: false,
      form: {
        /**
         * usersId: users id (후보키)
         * productsId: products id (후보키)
         * productsOptionsId: productsOptions id (후보키)
         * status: 상태
         */
        usersId: "",
        productsId: "",
        productsOptionsId: "",
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
      CartsService.findOne(this.id).then(
        response => {
          const { data } = response;
          this.item = data;

          // form
          if (Object.prototype.hasOwnProperty.call(data, "usersId")) {
            this.form.usersId = data.usersId;
          }
          if (Object.prototype.hasOwnProperty.call(data, "productsId")) {
            this.form.productsId = data.productsId;
          }
          if (Object.prototype.hasOwnProperty.call(data, "productsOptionsId")) {
            this.form.productsOptionsId = data.productsOptionsId;
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
