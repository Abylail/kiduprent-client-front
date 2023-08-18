<template>
  <nuxt-link class="center-card" :class="{'center-card--full': props.full}" to="/catalog/center/1">
    <div class="center-card__head">
      <img class="center-card__logo" src="~/assets/images/center-logo-example.png" alt="logo"/>
      <span class="center-card__name">Наши дети</span>
    </div>
    <div class="center-card__description">
      Продленка для школьников
    </div>
    <div class="center-card__address">
      ул. Макатаев, 117
    </div>
    <div class="center-card__bottom-content">
      <div class="center-card__rating">
        <base-icon class="center-card__icon" name="mdi-star-outline"/>
        <span>4.9</span>
      </div>
      <div class="center-card__city">
        Алматы
      </div>
    </div>
  </nuxt-link>
</template>

<script setup>
import BaseIcon from "../../base/BaseIcon";

const props = defineProps({
  full: {
    type: Boolean,
    default: false
  },
  info: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style lang="scss" scoped>
.center-card {
  display: inline-flex;
  flex-direction: column;
  min-width: 150px;
  max-width: 200px;
  border-radius: 5px;
  overflow: hidden;
  flex: 1;
  background: $color--gray-light;
  color: $color--black;

  &--full {
    display: flex;
    width: 100%;
    max-width: none;
  }

  &__head {
    display: flex;
    align-items: center;
    padding: 8px;
  }

  &__bottom-content {
    display: flex;
    align-items: center;
    padding: 8px;
    font-size: $fs--mini;
    & > * {
      display: flex;
      align-items: center;
      line-height: 20px;
    }

    & > *:not(:last-child) {
      margin-right: 20px;
    }
  }

  &__address {
    padding: 8px;
    border-bottom: 1px solid $color--gray;
    font-size: $fs--mini;
  }

  &__description {
    padding: 0 8px 8px;
    font-size: $fs--mini;
    color: $color--gray-dark;
    white-space: normal;
  }

  &__logo {
    width: 32px;
    height: 32px;
    background: white;
    padding: 4px;
    border-right: 60px;
    margin-right: 6px;
  }

  &__name {
    font-weight: bold;
  }

  &__rating {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>