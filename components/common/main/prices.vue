<template>
  <div class="prices container">
    <h3 class="prices__title">{{ $t('rates') }}</h3>
    <div class="prices__rates">
      <div class="prices__rate" v-for="(rate, index) in rates" :key="index">
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

        <div class="prices__rate-price">К оплате: {{ rate.price.toLocaleString() }} тг</div>
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
  </div>
</template>

<script setup>
import BaseButton from "../../base/BaseButton";

const nuxtApp = useNuxtApp();
import {rates} from "../../../config/toysRates";
import {computed} from "vue";
import BaseIcon from "../../base/BaseIcon";
import {useToysCartStore} from "../../../store/toys/basket";
import {useAuthStore} from "../../../store/client/parent/auth";
import AuthModal from "../auth/authModal";

// Еденица длительности (нед, мес)
const getDurationUnit = (duration) => duration < 1 ? nuxtApp.$t('week_short') : nuxtApp.$t('month_short');

const isLoading = ref(false);
const thanksWindow = ref(false);

const toysCartStore = useToysCartStore();
const authStore = useAuthStore();

const selectedRate = ref(null);

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

  &__rate {
    background-color: white;
    margin: 24px 0;
    padding: 16px;
    text-align: center;
    border-radius: 12px;
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
    padding: 8px 0;
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
    font-size: $fs--title;
  }

}
</style>