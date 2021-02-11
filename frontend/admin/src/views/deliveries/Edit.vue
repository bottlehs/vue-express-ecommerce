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
            :name="$t('deliveries_users_id')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("deliveries_users_id") }}
              <input
                ref="formUsersId"
                type="text"
                v-model="form.usersId"
                :placeholder="$t('deliveries_users_id')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormPurchasesId"
            :name="$t('deliveries_purchases_id')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("deliveries_purchases_id") }}
              <input
                ref="formPurchasesId"
                type="text"
                v-model="form.purchasesId"
                :placeholder="$t('deliveries_purchases_id')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormName"
            :name="$t('deliveries_name')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("deliveries_name") }}
              <input
                ref="formName"
                type="text"
                v-model="form.name"
                :placeholder="$t('deliveries_name')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormEmail"
            :name="$t('deliveries_email')"
            rules="required|email"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("deliveries_email") }}
              <input
                ref="formEmail"
                type="text"
                v-model="form.email"
                :placeholder="$t('deliveries_email')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormTel"
            :name="$t('deliveries_tel')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("deliveries_tel") }}
              <input
                ref="formTel"
                type="text"
                v-model="form.tel"
                :placeholder="$t('deliveries_tel')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormCountry"
            :name="$t('deliveries_country')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("deliveries_country") }}
              <input
                ref="formCountry"
                type="text"
                v-model="form.country"
                :placeholder="$t('deliveries_country')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormAddress"
            :name="$t('deliveries_address')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("deliveries_address") }}
              <input
                ref="formAddress"
                type="text"
                v-model="form.address"
                :placeholder="$t('deliveries_address')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormDetailAddress"
            :name="$t('deliveries_detail_address')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("deliveries_detail_address") }}
              <input
                ref="formDetailAddress"
                type="text"
                v-model="form.detailAddress"
                :placeholder="$t('deliveries_detail_address')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormPostcode"
            :name="$t('deliveries_postcode')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("deliveries_postcode") }}
              <input
                ref="formPostcode"
                type="text"
                v-model="form.postcode"
                :placeholder="$t('deliveries_postcode')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormCourier"
            :name="$t('deliveries_courier')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("deliveries_courier") }}
              <input
                ref="formCourier"
                type="text"
                v-model="form.courier"
                :placeholder="$t('deliveries_courier')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormTrackingNumber"
            :name="$t('deliveries_tracking_number')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("deliveries_tracking_number") }}
              <input
                ref="formTrackingNumber"
                type="text"
                v-model="form.trackingNumber"
                :placeholder="$t('deliveries_tracking_number')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormMemo"
            :name="$t('deliveries_memo')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("deliveries_memo") }}
              <input
                ref="formMemo"
                type="text"
                v-model="form.memo"
                :placeholder="$t('deliveries_memo')"
              />
              {{ errors[0] }}
            </label>
          </ValidationProvider>
          <ValidationProvider
            ref="validationFormStatus"
            :name="$t('deliveries_status')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("deliveries_status") }}
              <input
                ref="formStatus"
                type="text"
                v-model="form.status"
                :placeholder="$t('deliveries_status')"
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
import DeliveriesService from "@/services/deliveries.service.js";

export default {
  name: "DeliveriesEdit",
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
      item: {},
      wait: false,
      formWait: false,
      formAction: "",
      form: {
        /**
         * usersId: users id (후보키)
         * purchasesId: purchases id (후보키)
         * name: 주문자 이름
         * email: 주문자 Email
         * tel: 주문자 연락처
         * country: 주문자 국가
         * address: 주문자 주소
         * detailAddress: 주문자 상세 주소
         * postcode: 주문자 우편번호
         * courier: 배송택배사
         * trackingNumber: 운송장번호
         * memo: 주문자 메모
         * status: 상태
         */
        usersId: "",
        purchasesId: "",
        name: "",
        email: "",
        tel: "",
        country: "",
        address: "",
        detailAddress: "",
        postcode: "",
        courier: "",
        trackingNumber: "",
        memo: "",
        status: ""
      }
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
        purchasesId: this.form.purchasesId,
        name: this.form.name,
        email: this.form.email,
        tel: this.form.tel,
        country: this.form.country,
        address: this.form.address,
        detailAddress: this.form.detailAddress,
        postcode: this.form.postcode,
        courier: this.form.courier,
        trackingNumber: this.form.trackingNumber,
        memo: this.form.memo,
        status: this.form.status
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
      DeliveriesService.findOne(this.id).then(
        response => {
          const { data } = response;
          this.item = data;

          // form
          if (Object.prototype.hasOwnProperty.call(data, "usersId")) {
            this.form.usersId = data.usersId;
          }
          if (Object.prototype.hasOwnProperty.call(data, "purchasesId")) {
            this.form.purchasesId = data.purchasesId;
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
          if (Object.prototype.hasOwnProperty.call(data, "courier")) {
            this.form.courier = data.courier;
          }
          if (Object.prototype.hasOwnProperty.call(data, "trackingNumber")) {
            this.form.trackingNumber = data.trackingNumber;
          }
          if (Object.prototype.hasOwnProperty.call(data, "memo")) {
            this.form.memo = data.memo;
          }
          if (Object.prototype.hasOwnProperty.call(data, "status")) {
            this.form.status = data.status;
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
