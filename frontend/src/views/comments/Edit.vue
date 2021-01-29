<template>
  <div class="edit">
    CommentsEdit 
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
import CommentsService from "@/services/comments.service.js";

export default {
  name: "CommentsEdit",
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
         * postsId: posts id (후보키)
         * usersId: users id (후보키)
         * parent: comments id (대댓글 부모키)
         * content: 내용
         * type: 유형
         */
        postsId: "",
        usersId: "",
        parent: "",
        content: "",
        type: ""
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
        CommentsService.findOne(this.id).then(
          response => {
            const { data } = response;
            this.item = data;
            
            // form
            if (Object.prototype.hasOwnProperty.call(data,"postsId")) {
              this.form.postsId = data.postsId;
            };
            if (Object.prototype.hasOwnProperty.call(data,"usersId")) {
              this.form.usersId = data.usersId;
            };
            if (Object.prototype.hasOwnProperty.call(data,"parent")) {
              this.form.parent = data.parent;
            };
            if (Object.prototype.hasOwnProperty.call(data,"content")) {
              this.form.content = data.content;
            };
            if (Object.prototype.hasOwnProperty.call(data,"type")) {
              this.form.type = data.type;
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
