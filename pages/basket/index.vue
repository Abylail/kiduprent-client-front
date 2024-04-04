<template>
  <mobile-header
      :title="$t('cart')"
      lang-switch
  />

  <div class="basket" v-if="!!toysCartStore.getList.length">
    <toy-card
        v-for="toy in toysCartStore.getList" :key="toy.id"
        :toy="toy"
        basket
        row
    />
  </div>

  <div class="container" v-if="!toysCartStore.getList.length">
    <div class="basket__empty">{{ $t('cart_empty') }}</div>
    <base-button full-width @click="router.push('/toys')">{{ $t('go_toys') }}</base-button>
  </div>

  <div class="basket__overall" v-if="!!toysCartStore.getList.length">
    <div v-if="!haveSubscribe">
    <h2 class="basket__overall-title">{{ $t('select_rate') }}</h2>
    <div class="basket__rates">
      <div
          class="basket__rate"
          :class="{'basket__rate--selected': selectedRate?.price === rate.price}"
          v-for="(rate, index) in rates" :key="index"
          @click="() => selectedRate = rate"
      >
        <div class="basket__rate-title">{{ rate.price_monthly.toLocaleString() }} тг/{{getDurationUnit(rate.duration)}}</div>
        <div>{{ rate.name_ru }} ({{ rate.price.toLocaleString() }})</div>
      </div>
    </div>
    </div>

    <base-notice
        class="basket__banner"
        v-if="!haveSubscribe && selectedRate.duration >= 1"
        :text="$t('in_this_rate_you_can_change_toys')"
    />

    <div class="basket__info">
      <div>{{ $t('tokens_used') }}</div>
      <div>{{ toysCartStore.getCount }}/
        <span v-if="toysCartStore.getCount <= 100">100</span>
        <span v-else>{{toysCartStore.getCount}}</span>
      </div>
    </div>
    <div class="basket__info" v-if="!haveSubscribe">
      <div>{{ $t('price') }}</div>
      <div><strong>{{ priceMonthly }} тг/{{durationUnit}}</strong></div>
    </div>
    <div class="basket__info" v-if="extraTokens && !haveSubscribe">
      <div>{{ $t('extra_tokens') }} ({{ extraTokens }})</div>
      <div><strong>{{ extraPrice }} тг/{{durationUnit}}</strong></div>
    </div>
    <div class="basket__info" v-if="!haveSubscribe">
      <div>{{ $t('to_pay') }}</div>
      <div>{{ price }} (
        <span v-if="selectedRate.duration >= 1">{{ selectedRate.duration }} {{durationUnit}}</span>
        <span v-else>{{ selectedRate.duration/0.25 }} {{durationUnit}}</span>
        )
      </div>
    </div>

    <base-button
        class="basket__submit"
        type="yellow"
        size="big"
        :loading="isLoading"
        full-width
        @click="submitHandle()"
    >{{ submitText }}</base-button>
    <a class="basket__help" href="https://wa.me/77753862246" target="_blank">{{ $t('manager_help') }}</a>
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
      <base-button type="yellow" size="big" full-width @click="router.push('/main')">{{ $t('go_main') }}</base-button>
    </div>
  </base-backdrop>
</template>

<script setup>
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
import {useToysCartStore} from "../../store/toys/basket";
import ToyCard from "../../components/common/miniCards/toyCard";
import {computed, onMounted} from "vue";
import BaseButton from "../../components/base/BaseButton";
import {rates} from "../../config/toysRates";
import AuthModal from "../../components/common/auth/authModal";
import {useAuthStore} from "../../store/client/parent/auth";
import {useRouter} from "nuxt/app";
import BaseIcon from "../../components/base/BaseIcon";
import BaseBackdrop from "../../components/base/BaseBackdrop";
import BaseNotice from "../../components/base/BaseNotice";
import {useToySubscribe} from "../../store/client/parent/toySubscribe";
const nuxtApp = useNuxtApp()

const toysCartStore = useToysCartStore();

const toySubscriberStore = useToySubscribe();
const haveSubscribe = computed(() => !!toySubscriberStore.getSubscribe)
const submitText = computed(() => haveSubscribe?.value ? nuxtApp.$t('submit_request_for_change') : nuxtApp.$t('submit_request'))

const isLoading = ref(false);

// Цена за доп докены
const extraTokens = computed(() => toysCartStore.getCount > 100 ? (toysCartStore.getCount-100) : 0);
const extraPrice = computed(() => {
  const monthlyExtraPrice = toysCartStore.getCount > 100 ? (toysCartStore.getCount-100)*120 : 0
  if (selectedRate.value.duration < 1) return monthlyExtraPrice * selectedRate.value.duration;
  else return monthlyExtraPrice
});

const selectedRate = ref(rates.value[0])
const priceMonthly = computed(() => selectedRate.value.price_monthly.toLocaleString())
const price = computed(() => parseInt(selectedRate.value.price + (extraPrice.value*selectedRate.value.duration)).toLocaleString())

const authStore = useAuthStore();

const openAuth = ref(false);
const authFinal = (successAuth) => {
  if (!successAuth) return;
  submit()
}

// Отправить заявку (кнопка)
const submitHandle = () => {
  if (authStore.isAuth) submit()
  else openAuth.value = true;
}

const router = useRouter();

const thanksWindow = ref(false);

// Отправить
const submit = async () => {
  isLoading.value = true;
  await toysCartStore.submitRequest(selectedRate.value);
  isLoading.value = false;
  thanksWindow.value = true;
}

// Еденица длительности (нед, мес)
const getDurationUnit = (duration) => duration < 1 ? nuxtApp.$t('week_short') : nuxtApp.$t('month_short');
const durationUnit = computed(() => selectedRate.value.duration < 1 ? nuxtApp.$t('week_short') : nuxtApp.$t('month_short'));

onMounted(() => {
  toysCartStore.fetchCart();
})
</script>

<style lang="scss" scoped>
.basket {

  &__overall {
    padding: 24px $side-space-mobile;
    background-color: white;
  }

  &__overall-title {
    font-size: $fs--default;
    padding: 8px 0;
  }

  &__back {
    font-weight: bold;
    margin-bottom: 12px;
    color: $color--blue-dark;
  }

  &__empty {
    color: $color--gray-dark;
    font-size: $fs--title;
    padding: 24px 0 8px;
  }

  &__submit {
    font-weight: bolder !important;
    font-size: $fs--default;
    margin-top: 16px;
  }

  &__help {
    display: block;
    text-align: center;
    margin: 12px 0;
    color: $color--blue;
  }

  &__banner {
    margin: 8px 0;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    color: $color--blue-dark;
  }

  &__rates {
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
    padding-bottom: 8px;
    margin-bottom: 12px;
  }

  &__rate {
    white-space: nowrap;
    padding: 8px 8px;
    border: 1px solid $color--blue;
    color: $color--blue-dark;
    border-radius: 5px;
    margin-right: 8px;
    font-size: $fs--mini;
    transition: .3s;

    &--selected {
      background-color: $color--yellow;
      border-color: $color--yellow;
    }
  }

  &__rate-title {
    font-size: $fs--default;
    margin-bottom: 4px;
    font-weight: bold;
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