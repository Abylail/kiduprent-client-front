<template>
  <div class="cart-window" :class="{'cart-window--active': !!toysCartStore.getCount}">
    <base-button class="cart-window__button" type="yellow" full-width @click="goCart()">
      <div class="cart-window__left">
        <base-icon class="cart-window__icon" name="mdi-currency-usd" size="14" color="white"/>
        <span class="cart-window__count">{{ toysCartStore.getCount }}</span>/<span>100</span>
      </div>
      <div class="cart-window__right">
        Оформить подписку
      </div>
    </base-button>
  </div>
</template>

<script setup>
import BaseButton from "../../base/BaseButton";
import BaseIcon from "../../base/BaseIcon";
import {useToysCartStore} from "../../../store/toys/basket";
import {useRouter} from "nuxt/app";

const toysCartStore = useToysCartStore();

const router = useRouter()
const goCart = () => {
  router.push("/toys/basket");
}
</script>

<style lang="scss" scoped>
.cart-window {
  position: fixed;
  bottom: -65px;
  left: $side-space-mobile;
  right: $side-space-mobile;
  z-index: 10;
  transition: .3s;

  &--active {
    bottom: 70px;
  }

  &__button {
    display: flex;
    justify-content: space-between;
    font-size: $fs--default !important;
  }

  &__icon {
    border: 1px solid black;
    border-radius: 100%;
    padding: 1px;
    background-color: $color--blue-dark;
    margin-right: 8px;
  }

  &__count {
    font-weight: bolder;
    color: $color--blue-dark;
  }
}
</style>