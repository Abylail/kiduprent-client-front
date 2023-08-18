<template>
  <footer class="mobile-footer">
    <nuxt-link
        class="mobile-footer__link"
        :class="{'mobile-footer__link--active': activeModuleName === module.code}"
        v-for="module in modules" :key="module.code"
        :to="`/${module.code}`"
    >
      <base-icon class="mobile-footer__icon" :name="module.icon" size="28"/>
      <span class="mobile-footer__link-text">{{ module.name }}</span>
    </nuxt-link>
  </footer>
</template>

<script setup>
import {computed} from "vue";
import {useRoute} from "nuxt/app";
import modules from "../../../config/modules";
import BaseIcon from "../../base/BaseIcon";
const route = useRoute();

// Активный модуль
const activeModuleName = computed(() => route.name.split("-")[0])
</script>

<style lang="scss" scoped>
.mobile-footer {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  padding: 0 40px;
  background: $color--background-white;

  &__link {
    display: flex;
    align-items: center;
    font-weight: bold;
    line-height: 56px !important;
    color: $color--black;
  }

  &__link-text {
    max-width: 0;
    overflow-x: hidden;
    transition: $transition;
    transition-timing-function: ease-out;
  }

  &__link--active {
    color: $color--blue !important;
    .mobile-footer__link-text {
      max-width: 70px;
    }
  }

  &__icon {
    margin: 0 8px;
  }
}
</style>