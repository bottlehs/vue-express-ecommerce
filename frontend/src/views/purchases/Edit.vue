<template>
  <div class="edit">
    PurchasesEdit  
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
import PurchasesService from "@/services/purchases.service.js";

export default {
  name: "PurchasesEdit",
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
         * productsId: products id (후보키)
         * name:  옵션명
         * status: 상태
         */        
        productsId: "",
        name: "",
        status: ""
      },      
      item: {},      
    };
  },
  created() {
    /**
     * created
     */
    if (
      Object.prototype.hasOwnProperty.call(this.$router.currentRoute.params,"id")
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
        PurchasesService.findOne(this.id).then(
          response => {
            const { data } = response;
            this.item = data;
            
            // form
            if (Object.prototype.hasOwnProperty.call(data,"productsId")) {
              this.form.productsId = data.productsId;
            };
            if (Object.prototype.hasOwnProperty.call(data,"name")) {
              this.form.name = data.name;
            };
            if (Object.prototype.hasOwnProperty.call(data,"status")) {
              this.form.status = data.status;
            };

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
