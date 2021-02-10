<template>
  <div class="edit">
    <div v-if="wait && id" class="d-flex justify-content-center mb-3">
      <b-spinner label="Loading..."></b-spinner>
    </div>
    <div v-else>
      <ValidationObserver v-slot="{ invalid }">
        <b-form @submit.prevent="onSubmit" @reset="onReset">
          <ValidationProvider
            ref="validationFormUsersId"
            :name="$t('addresses_users_id')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("addresses_users_id") }}
              <input
                ref="formUsersId"
                type="text"
                v-model="form.usersId"
                :placeholder="$t('addresses_users_id')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormTitle"
            :name="$t('addresses_title')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("addresses_title") }}
              <input
                ref="formTitle"
                type="text"
                v-model="form.title"
                :placeholder="$t('addresses_title')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormName"
            :name="$t('addresses_name')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("addresses_name") }}
              <input
                ref="formName"
                type="text"
                v-model="form.name"
                :placeholder="$t('addresses_name')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormEmail"
            :name="$t('addresses_email')"
            rules="required|email"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("addresses_email") }}
              <input
                ref="formEmail"
                type="text"
                v-model="form.email"
                :placeholder="$t('addresses_email')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormTel"
            :name="$t('addresses_tel')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("addresses_tel") }}
              <input
                ref="formTel"
                type="text"
                v-model="form.tel"
                :placeholder="$t('addresses_tel')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormCountry"
            :name="$t('addresses_country')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("addresses_country") }}
              <input
                ref="formCountry"
                type="text"
                v-model="form.country"
                :placeholder="$t('addresses_country')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormAddress"
            :name="$t('addresses_address')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("addresses_address") }}
              <input
                ref="formAddress"
                type="text"
                v-model="form.address"
                :placeholder="$t('addresses_address')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormDetailAddress"
            :name="$t('addresses_detail_address')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("addresses_detail_address") }}
              <input
                ref="formDetailAddress"
                type="text"
                v-model="form.detailAddress"
                :placeholder="$t('addresses_detail_address')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormPostcode"
            :name="$t('addresses_postcode')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("addresses_postcode") }}
              <input
                ref="formPostcode"
                type="text"
                v-model="form.postcode"
                :placeholder="$t('addresses_postcode')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormMemo"
            :name="$t('addresses_memo')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("addresses_memo") }}
              <input
                ref="formMemo"
                type="text"
                v-model="form.memo"
                :placeholder="$t('addresses_memo')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormStatus"
            :name="$t('addresses_status')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("addresses_status") }}
              <input
                ref="formStatus"
                type="text"
                v-model="form.status"
                :placeholder="$t('addresses_status')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormBasic"
            :name="$t('addresses_basic')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("addresses_basic") }}
              <input
                ref="formBasic"
                type="text"
                v-model="form.basic"
                :placeholder="$t('addresses_basic')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>

          <b-button type="submit" :disabled="invalid || formWait">
            <b-spinner
              v-if="formWait && formAction == 'onSubmit'"
              small
            ></b-spinner
            >{{ id ? $t("modify") : $t("add") }}
          </b-button>
          <b-button type="reset" :disabled="formWait">{{ $t("cancel") }}</b-button>
          <b-button
            v-if="id"
            type="button"
            @click.prevent.stop="remove"
            :disabled="formWait"
          >
            <b-spinner
              v-if="formWait && formAction == 'remove'"
              small
            ></b-spinner
            >{{ $t("remove") }}
          </b-button>
        </b-form>
      </ValidationObserver>
    </div>
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
import AddressesService from "@/services/addresses.service.js";

export default {
  name: "AddressesEdit",
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
       * formAction : 폼 액션
       * form : 폼
       */

      id: 0,
      wait: false,
      formWait: false,
      formAction: "",
      form: {
        /**
         * usersId: users id (후보키)
         * title: 주소지명
         * name: 주문자 이름
         * email: 주문자 Email
         * tel: 주문자 연락처
         * country: 주문자 국가
         * address: 주문자 주소
         * detailAddress: 주문자 상세 주소
         * postcode: 주문자 우편번호
         * memo: 메모
         * status: 상태
         * basic: 기본여부
         */
        usersId: "",
        title: "",
        name: "",
        email: "",
        tel: "",
        country: "",
        address: "",
        detailAddress: "",
        postcode: "",
        memo: "",
        status: "",
        basic: ""
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
    async onSubmit(evt) {
      evt.preventDefault();

      this.formWait = true;
      this.formAction = 'onSubmit';

      let params = {
        usersId: this.form.usersId,
        title: this.form.title,
        name: this.form.name,
        email: this.form.email,
        tel: this.form.tel,
        country: this.form.country,
        address: this.form.address,
        detailAddress: this.form.detailAddress,
        postcode: this.form.postcode,
        memo: this.form.memo,
        status: this.form.status,
        basic: this.form.basic
      };

      if (this.id) {
        // 수정
        PurchasesService.modify(this.id, params).then(
          response => {
            const { data } = response;
            this.item = data;

            alert(this.$t("successful"));
            this.$router.go(-1);

            this.formWait = false;
          },
          error => {
            alert(this.$t("failure"));
            console.log(error);
          }
        );
      } else {
        // 등록
        PurchasesService.add(params).then(
          response => {
            const { data } = response;
            this.item = data;

            alert(this.$t("successful"));
            this.$router.go(-1);

            this.formWait = false;
          },
          error => {
            if (
              Object.prototype.hasOwnProperty.call(response.data, "message")
            ) {
              alert(response.data.message);
            } else {
              alert(this.$t("failure"));
            }
            console.log(error);
          }
        );
      }
    },
    onReset(evt) {
      evt.preventDefault();

      this.$router.go(-1);
    },
    remove() {
      if (confirm(this.$t("remove_text"))) {
        this.formWait = true;
        this.formAction = 'remove';

        PurchasesService.remove(this.id).then(
          response => {
            const { data } = response;
            this.item = data;

            alert(this.$t("successful"));
            this.$router.go(-1);

            this.formWait = false;
          },
          error => {
            alert(this.$t("failure"));
            console.log(error);
          }
        );
      }
    },
    findOne() {
      this.wait = true;
      AddressesService.findOne(this.id).then(
        response => {
          const { data } = response;
          this.item = data;

          // form
          if (Object.prototype.hasOwnProperty.call(data, "usersId")) {
            this.form.usersId = data.usersId;
          }
          if (Object.prototype.hasOwnProperty.call(data, "title")) {
            this.form.title = data.title;
          }
          if (Object.prototype.hasOwnProperty.call(data, "name")) {
            this.form.name = data.name;
          }
          if (Object.prototype.hasOwnProperty.call(data, "email")) {
            this.form.email = data.email;
          }
          if (Object.prototype.hasOwnProperty.call(data, "tel")) {
            this.form.tel = data.tel;
          }
          if (Object.prototype.hasOwnProperty.call(data, "country")) {
            this.form.country = data.country;
          }
          if (Object.prototype.hasOwnProperty.call(data, "address")) {
            this.form.address = data.address;
          }
          if (Object.prototype.hasOwnProperty.call(data, "detailAddress")) {
            this.form.detailAddress = data.detailAddress;
          }
          if (Object.prototype.hasOwnProperty.call(data, "postcode")) {
            this.form.postcode = data.postcode;
          }
          if (Object.prototype.hasOwnProperty.call(data, "memo")) {
            this.form.memo = data.memo;
          }
          if (Object.prototype.hasOwnProperty.call(data, "status")) {
            this.form.status = data.status;
          }
          if (Object.prototype.hasOwnProperty.call(data, "basic")) {
            this.form.basic = data.basic;
          }

          this.wait = false;
        },
        error => {
          if (
            Object.prototype.hasOwnProperty.call(error.response.data, "message")
          ) {
            alert(response.data.message);
          }
          this.wait = false;
        }
      );
    }
  }
};
</script>

<style scoped></style>
