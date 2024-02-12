<template>
  <mobile-header
      title="Корзина"
      go-back="/toys"
  />

  <div class="basket">
    <toy-card
        v-for="toy in toysCartStore.getList" :key="toy.id"
        :toy="toy"
        basket
        row
    />
  </div>

  <div class="basket__overall">

    <div class="basket__rates">
      <div
          class="basket__rate"
          :class="{'basket__rate--selected': selectedRate?.price === rate.price}"
          v-for="(rate, index) in rates" :key="index"
          @click="() => selectedRate = rate"
      >
        <div class="basket__rate-title">{{ rate.price_monthly.toLocaleString() }} тг/мес</div>
        <div>{{ rate.name_ru }} ({{ rate.price.toLocaleString() }})</div>
      </div>
    </div>

    <div class="basket__info">
      <div>Токенов использовано</div>
      <div>{{ toysCartStore.getCount }}/100</div>
    </div>
    <div class="basket__info">
      <div>Цена</div>
      <div><strong>{{ priceMonthly }} тг/мес</strong></div>
    </div>
    <div class="basket__info">
      <div>К оплате</div>
      <div>{{ price }}</div>
    </div>
    <base-button class="basket__submit" type="yellow" size="big" full-width @click="submitHandle()">Оставить заявку</base-button>
  </div>

  <auth-modal v-model:open="openAuth" @final="authFinal($event)"/>
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

const toysCartStore = useToysCartStore();

const isLoading = ref(false);

const selectedRate = ref(rates[0])
const priceMonthly = computed(() => selectedRate.value.price_monthly.toLocaleString())
const price = computed(() => selectedRate.value.price.toLocaleString())

const authStore = useAuthStore();

const openAuth = ref(false);
const authFinal = (successAuth) => {

}

// Отправить заявку
const submitHandle = async () => {
  if (authStore.isAuth) {
    isLoading.value = true;
    await toysCartStore.submitRequest();
    isLoading.value = false;
  }
  else openAuth.value = true;
}

onMounted(() => {
  toysCartStore.fetchCart();
})
</script>

<style lang="scss" scoped>
.basket {
  padding-bottom: 200px;

  &__overall {
    position: fixed;
    z-index: 1;
    bottom: 61px;
    left: 0;
    right: 0;
    padding: $side-space-mobile;
    background-color: white;
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
</style>