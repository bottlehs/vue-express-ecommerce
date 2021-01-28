<template>
  <div class="edit">
    InquiresEdit   
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
import InquiresService from "@/services/inquires.service.js";

export default {
  name: "InquiresEdit",
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
       */      
      id: 0,
      wait: false,
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
        InquiresService.findOne(this.id).then(
          response => {
            const { data } = response;
            this.item = data;
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
