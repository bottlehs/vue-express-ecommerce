<template>
  <div class="edit">
    <div v-if="wait && id" class="d-flex justify-content-center mb-3">
      <b-spinner label="Loading..."></b-spinner>
    </div>
    <div v-else>
      <ValidationObserver v-slot="{ invalid }">
        <b-form @submit.prevent="onSubmit" @reset="onReset">
          <ValidationProvider
            ref="validationFormProductsId"
            :name="$t('purchases_products_id')"
            rules="required"
            v-slot="{ errors }"
          >
            <label>
              {{ $t("purchases_products_id") }}
              <input
                ref="formProductsId"
                type="text"
                v-model="form.productsId"
                :placeholder="$t('purchases_products_id')"
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
       * formAction : 폼 액션
       * form : 폼
       */

      id: 0,
      wait: false,
      formWait: false,
      formAction: "",
      form: {
        /*
        usersId: users id (후보키)
        cartsId: carts id (후보키)
        productsId: products id (후보키)
        productsOptionsId: productsOptions id (후보키)
        thirdPartyUid: 서드파티 거래 고유 번호	아임포트에서 부여하는 거래건 당 고유한 번호(success:false일 때, 사전 validation에 실패한 경우라면 imp_uid는 null일 수 있음)
        merchantUid: 가맹점에서 생성/관리하는 고유 주문번호
        method: 결제수단
        amount: 결제금액	실제 결제승인된 금액이나 가상계좌 입금예정 금액
        pgProvider: 결제승인/시도된 PG사
        pgId: PG사 거래고유번호
        name: 주문자 이름
        email: 주문자 Email
        tel: 주문자 연락처
        country: 주문자 국가
        address: 주문자 주소
        detailAddress: 주문자 상세 주소
        postcode: 주문자 우편번호
        customData: 가맹점 임의 지정 데이터
        purchasesAt: 결제승인시각 UNIX timestamp
        receiptUrl: PG사에서 발행되는 거래 매출전표 URL	전달되는 URL을 그대로 open하면 매출전표 확인가능
        applyNumber: 카드사 승인번호	신용카드결제에 한하여 제공
        vbankNumber: 가상계좌 입금계좌번호	PG사로부터 전달된 정보 그대로 제공하므로 숫자 외 dash(-)또는 기타 기호가 포함되어 있을 수 있음
        vbankName: 가상계좌 은행명
        vbankHolder: 가상계좌 예금주	계약된 사업자명으로 항상 일정함. 단, 일부 PG사의 경우 null반환하므로 자체 처리 필요
        vbankDate: 가상계좌 입금기한	UNIX timestamp
        memo: 주문자 메모
        status: 상태,
        */
        usersId: "",
        cartsId: "",
        productsId: "",
        productsOptionsId: "",
        thirdPartyUid: "",
        merchantUid: "",
        method: "",
        amount: "",
        pgProvider: "",
        pgId: "",
        name: "",
        email: "",
        tel: "",
        country: "",
        address: "",
        detailAddress: "",
        postcode: "",
        customData: "",
        purchasesAt: "",
        receiptUrl: "",
        applyNumber: "",
        vbankNumber: "",
        vbankName: "",
        vbankHolder: "",
        vbankDate: "",
        memo: "",
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
    async onSubmit(evt) {
      evt.preventDefault();

      this.formWait = true;
      this.formAction = 'onSubmit';

      let params = {
        productsId: this.form.productsId
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
      PurchasesService.findOne(this.id).then(
        response => {
          const { data } = response;
          this.item = data;

          // form
          if (Object.prototype.hasOwnProperty.call(data, "usersId")) {
            this.form.usersId = data.usersId;
          }
          if (Object.prototype.hasOwnProperty.call(data, "cartsId")) {
            this.form.cartsId = data.cartsId;
          }
          if (Object.prototype.hasOwnProperty.call(data, "productsId")) {
            this.form.productsId = data.productsId;
          }
          if (Object.prototype.hasOwnProperty.call(data, "productsOptionsId")) {
            this.form.productsOptionsId = data.productsOptionsId;
          }
          if (Object.prototype.hasOwnProperty.call(data, "thirdPartyUid")) {
            this.form.thirdPartyUid = data.thirdPartyUid;
          }
          if (Object.prototype.hasOwnProperty.call(data, "method")) {
            this.form.method = data.method;
          }
          if (Object.prototype.hasOwnProperty.call(data, "amount")) {
            this.form.amount = data.amount;
          }
          if (Object.prototype.hasOwnProperty.call(data, "pgProvider")) {
            this.form.pgProvider = data.pgProvider;
          }
          if (Object.prototype.hasOwnProperty.call(data, "pgId")) {
            this.form.pgId = data.pgId;
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
          if (Object.prototype.hasOwnProperty.call(data, "customData")) {
            this.form.customData = data.customData;
          }
          if (Object.prototype.hasOwnProperty.call(data, "purchasesAt")) {
            this.form.purchasesAt = data.purchasesAt;
          }
          if (Object.prototype.hasOwnProperty.call(data, "receiptUrl")) {
            this.form.receiptUrl = data.receiptUrl;
          }
          if (Object.prototype.hasOwnProperty.call(data, "applyNumber")) {
            this.form.applyNumber = data.applyNumber;
          }
          if (Object.prototype.hasOwnProperty.call(data, "vbankNumber")) {
            this.form.vbankNumber = data.vbankNumber;
          }
          if (Object.prototype.hasOwnProperty.call(data, "vbankName")) {
            this.form.vbankName = data.vbankName;
          }
          if (Object.prototype.hasOwnProperty.call(data, "vbankHolder")) {
            this.form.vbankHolder = data.vbankHolder;
          }
          if (Object.prototype.hasOwnProperty.call(data, "vbankDate")) {
            this.form.vbankDate = data.vbankDate;
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
