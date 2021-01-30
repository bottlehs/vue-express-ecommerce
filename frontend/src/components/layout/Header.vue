<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">ECOMMERCE</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-for="menu in menus" :key="menu.name">
            {{ menu.title }}
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
/**
 * vuex
 */
import { mapGetters } from "vuex";

export default {
  name: "Header",
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
       * menus : 메뉴
       */
      menus: [
        {
          title: "Dashboard",
          path: "/",
          name: "Dashboard"
        },
        {
          title: "Users",
          path: "/users",
          name: "Users"
        },
        {
          title: "Purchases",
          path: "/purchases",
          name: "Purchases"
        },
        {
          title: "",
          path: "/products",
          name: "Products"
        },
        {
          title: "Posts",
          path: "/posts",
          name: "Posts"
        },
        {
          title: "Inquires",
          path: "/inquires",
          name: "Inquires"
        },
        {
          title: "Faqs",
          path: "/faqs",
          name: "Faqs"
        },
        {
          title: "Deliveries",
          path: "/deliveries",
          name: "Deliveries"
        },
        {
          title: "Comments",
          path: "/comments",
          name: "Comments"
        },
        {
          title: "Carts",
          path: "/carts",
          name: "Carts"
        },
        {
          title: "Addresses",
          path: "/addresses",
          name: "Addresses"
        }
      ]
    };
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
