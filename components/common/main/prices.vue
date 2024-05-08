<template>
  <div class="prices container" id="prices">
    <h3 class="prices__title">{{ props.title || $t('rates') }}</h3>
    <div class="prices__rates">
      <div class="prices__rate" v-for="(rate, index) in prices" :key="index">
        <div class="prices__rate-head">
          <div>
            <div class="prices__rate-title">{{ rate.name_ru }}</div>
            <div>
              <base-icon
                  v-for="num in 3" :key="num"
                  name="mdi-star-circle"
                  :color="num > rate.stars ? '#b2b2b2' : '#ecc926'"
                  size="26"
              />
            </div>
          </div>
          <div class="prices__rate-price-monthly">{{ rate.price_monthly.toLocaleString() }} тг/{{ getDurationUnit(rate.duration) }}</div>
        </div>

        <div class="prices__rate-pluses" v-if="rate.pluses?.length">
          <div class="prices__rate-plus" v-for="(text, index) in rate.pluses" :key="index">
            <base-icon class="prices__rate-plus-icon" name="mdi-check" size="18"/>
            <span>{{ text }}</span>
          </div>
        </div>

        <div class="prices__rate-minuses" v-if="rate.minuses?.length">
          <div class="prices__rate-minus" v-for="(text, index) in rate.minuses" :key="index">
            <base-icon class="prices__rate-minus-icon" name="mdi-close" size="18"/>
            <span>{{ text }}</span>
          </div>
        </div>

        <div class="prices__rate-price" :class="{'prices__rate-price--crossed': !!rate.sale_price}">К оплате: {{ rate.price.toLocaleString() }} тг</div>
        <div class="prices__rate-price-sale" v-if="rate.sale_price">Со скидкой: {{ rate.sale_price.toLocaleString() }} тг</div>
        <base-button class="prices__submit" type="yellow" @click="submitHandle(rate)">Оставить заявку</base-button>
      </div>
    </div>

    <auth-modal
        :title="$t('request_sending')"
        :enter-button-title="$t('submit_request')"
        :sms-button-title="$t('submit_request')"
        v-model:open="openAuth"
        @final="authFinal($event)"
    />

    <base-backdrop v-model:active="thanksWindow">
      <div class="thanks-window container">
        <base-icon class="thanks-window__icon" name="mdi-party-popper" size="70"/>
        <div class="thanks-window__title">{{ $t('thank_you_for_request') }}</div>
        <div class="thanks-window__subtitle">{{ $t('manager_calls_you') }}</div>
        <base-button type="yellow" size="big" full-width @click="thanksWindow = false">{{ $t('go_main') }}</base-button>
      </div>
    </base-backdrop>
  </div>
</template>

<script setup>
import BaseButton from "../../base/BaseButton";

const nuxtApp = useNuxtApp();
import {rates} from "../../../config/toysRates";
import BaseIcon from "../../base/BaseIcon";
import {useToysCartStore} from "../../../store/toys/basket";
import {useAuthStore} from "../../../store/client/parent/auth";
import AuthModal from "../auth/authModal";
import BaseBackdrop from "../../base/BaseBackdrop";
import {useRouter} from "nuxt/app";

const props = defineProps({
  title: {
    type: String,
    default: null
  },
  prices: {
    type: Array,
    default: () => rates.value
  }
});

// Еденица длительности (нед, мес)
const getDurationUnit = (duration) => duration < 1 ? nuxtApp.$t('week_short') : nuxtApp.$t('month_short');

const isLoading = ref(false);
const thanksWindow = ref(false);

const toysCartStore = useToysCartStore();
const authStore = useAuthStore();

const selectedRate = ref(null);

const router = useRouter();

// Отправить
const submit = async () => {
  isLoading.value = true;
  await toysCartStore.submitRequest(selectedRate.value);
  isLoading.value = false;
  thanksWindow.value = true;
}

const openAuth = ref(false);
const authFinal = (successAuth) => {
  if (!successAuth) return;
  submit()
}

// Отправить заявку (кнопка)
const submitHandle = r => {
  selectedRate.value = r;
  if (authStore.isAuth) submit()
  else openAuth.value = true;
}
</script>

<style lang="scss" scoped>
.prices {
  margin: 20px;

  &__title {
    padding-bottom: 8px;
  }

  &__rates {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(4, minmax(330px, 1fr));
    gap: 8px;

    user-select: none;
    height: 100%;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    scroll-snap-type: x mandatory;
    padding: 12px;
  }

  &__rate {
    flex: 1;
    min-width: 300px;
    background-color: white;
    padding: 16px;
    text-align: center;
    border-radius: 12px;
    box-shadow: 0px 4px 10px 0px rgba(34, 60, 80, 0.2);

    display: inline-block;
    scroll-snap-align: center;
    margin: 0 4px;
    &:first-child {margin-left: 0}
    &:last-child {margin-right: 0}
  }

  &__rate-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border-bottom: 1px solid $color--gray;
    padding: 0 8px 12px;
    text-align: left;
  }

  &__rate-title {
    text-align: center;
    font-size: $fs--title;
    font-weight: bold;
  }

  &__rate-price-monthly {
    text-align: center;
    font-size: $fs--sub-title;
    color: $color--blue;
    //padding-top: 8px;
  }

  &__rate-pluses {
    margin: 16px 0;
  }

  &__rate-plus {
    display: flex;
    align-items: center;
    text-align: left;
    font-size: $fs--default;
  }

  &__rate-plus-icon {
    margin: 4px 8px 4px;
    color: white;
    background-color: #1ab01a;
    padding: 4px;
    border-radius: 50%;
  }

  &__rate-price {
    margin-top: 16px;
    &--crossed {text-decoration:line-through}
  }

  &__rate-price-sale {
    font-weight: bold;
    font-size: $fs--title;
    color: $color--orange;
  }

  &__rate-minuses {
    margin-top: 16px;
  }

  &__rate-minus {
    display: flex;
    align-items: center;
    text-align: left;
    font-size: $fs--default;
  }

  &__rate-minus-icon {
    margin: 4px 8px 4px;
    color: white;
    background-color: #d14a4a;
    padding: 4px;
    border-radius: 50%;
  }

  &__submit {
    font-size: $fs--default;
    margin-top: 16px;
  }

}

.thanks-window {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__title {
    text-align: center;
    font-size: $fs--title;
    margin: 24px 0 12px;
  }

  &__subtitle {
    text-align: center;
    margin: 12px 0 32px;
  }

  &__icon {
    padding-top: 24px;
    color: $color--blue;
  }
}
</style>