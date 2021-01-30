<template>
  <div class="list">
    CartsList
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartsList",
  components: {
    /**
     * components
     */
  },
  data() {
    /**
     * data
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
