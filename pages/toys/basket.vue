<template>
  <mobile-header
      title="Корзина"
      go-back="/toys"
  />

  <div class="basket" v-if="!!toysCartStore.getList.length">
    <toy-card
        v-for="toy in toysCartStore.getList" :key="toy.id"
        :toy="toy"
        basket
        row
    />
  </div>

  <div class="container" v-if="!!toysCartStore.getList.length && !submitWindow">
    <base-button
      class="basket__submit"
      type="yellow"
      size="big"
      full-width
      @click="submitWindow = true"
    >Продолжить</base-button>
  </div>

  <div class="container" v-if="!toysCartStore.getList.length">
    <div class="basket__empty">Ваша корзина пуста</div>
    <base-button full-width @click="router.push('/toys')">К игрушкам</base-button>
  </div>

  <div class="basket__overall" :class="{'basket__overall--active': submitWindow}">
    <button class="basket__back" @click="submitWindow = false"><base-icon name="mdi-arrow-left" size="14"/> К корзине</button>

    <div class="basket__rates">
      <div
          class="basket__rate"
          :class="{'basket__rate--selected': selectedRate?.price === rate.price}"
          v-for="(rate, index) in rates" :key="index"
          @click="() => selectedRate = rate"
      >
        <div class="basket__rate-title">{{ rate.price_monthly.toLocaleString() }} тг/{{durationUnit}}</div>
        <div>{{ rate.name_ru }} ({{ rate.price.toLocaleString() }})</div>
      </div>
    </div>

    <div class="basket__info">
      <div>Токенов использовано</div>
      <div>{{ toysCartStore.getCount }}/
        <span v-if="toysCartStore.getCount <= 100">100</span>
        <span v-else>{{toysCartStore.getCount}}</span>
      </div>
    </div>
    <div class="basket__info">
      <div>Цена</div>
      <div><strong>{{ priceMonthly }} тг/{{durationUnit}}</strong></div>
    </div>
    <div class="basket__info" v-if="extraTokens">
      <div>Дополнительные токены ({{ extraTokens }})</div>
      <div><strong>{{ extraPrice }} тг/{{durationUnit}}</strong></div>
    </div>
    <div class="basket__info">
      <div>К оплате</div>
      <div>{{ price }} на
        <span v-if="selectedRate.duration >= 1">{{ selectedRate.duration }} {{durationUnit}}</span>
        <span v-else>{{ selectedRate.duration/0.25 }} {{durationUnit}}</span>
      </div>
    </div>
    <base-button
        class="basket__submit"
        type="yellow"
        size="big"
        :loading="isLoading"
        full-width
        @click="submitHandle()"
    >Оставить заявку</base-button>
  </div>

  <auth-modal v-model:open="openAuth" @final="authFinal($event)"/>

  <base-backdrop v-model:active="thanksWindow">
    <div class="thanks-window container">
      <base-icon class="thanks-window__icon" name="mdi-party-popper" size="70"/>
      <div class="thanks-window__title">Спасибо на заявку</div>
      <div class="thanks-window__subtitle">Наш менеджер свяжется с вами в ближайшее время</div>
      <base-button type="yellow" size="big" full-width @click="router.push('/main')">На главную</base-button>
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

const toysCartStore = useToysCartStore();

const isLoading = ref(false);
const submitWindow = ref(false);

// Цена за доп докены
const extraTokens = computed(() => toysCartStore.getCount > 100 ? (toysCartStore.getCount-100) : 0);
const extraPrice = computed(() => toysCartStore.getCount > 100 ? (toysCartStore.getCount-100)*120 : 0);

const selectedRate = ref(rates[0])
const priceMonthly = computed(() => selectedRate.value.price_monthly.toLocaleString())
const price = computed(() => (selectedRate.value.price + (extraPrice.value*selectedRate.value.duration)).toLocaleString())

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
const durationUnit = computed(() => selectedRate.value.duration < 1 ? "нед" : "мес");

onMounted(() => {
  toysCartStore.fetchCart();
})
</script>

<style lang="scss" scoped>
.basket {

  &__overall {
    position: fixed;
    z-index: 1;
    bottom: -100%;
    left: 0;
    right: 0;
    padding: $side-space-mobile;
    background-color: white;
    transition: .3s;
    box-shadow: 0px -7px 10px 0px rgba(34, 60, 80, 0.2);

    &--active {
      bottom: 61px;
    }
  }

  &__back {
    font-weight: bold;
    margin-bottom: 12px;
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

  &__info {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    color: $color--blue-dark;
  }

  &__overall {
    border-top: 1px solid $color--gray;
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