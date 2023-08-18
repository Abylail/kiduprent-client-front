<template>
  <button class="go-button" v-bind="$attrs">
    <base-icon class="go-button__icon" :name="icon"/>
    <div class="go-button__content">
      <span class="go-button__title">{{ title }}</span>
      <span class="go-button__subtitle" v-if="subTitle">{{ subTitle }}</span>
    </div>
    <base-icon name="mdi-chevron-right"/>
  </button>
</template>

<script setup>
import BaseIcon from "./BaseIcon";

const props = defineProps({
  title: String,
  subTitle: String,
  icon: String,
})
</script>

<style lang="scss" scoped>
.go-button {
  display: grid;
  grid-template-columns: 40px 1fr 24px;
  grid-column-gap: 10px;
  align-items: center;
  font-size: $fs--default;
  width: 100%;
  background: $color--gray-light;
  padding: 10px;
  min-height: 64px;
  border-radius: 14px;
  color: $color--black;
  text-align: left;

  &__icon {
    background-color: white;
    padding: 8px;
    border-radius: 14px;
    color: $color--blue;
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-weight: bold;
  }

  &__subtitle {
    color: $color--gray-dark;
  }
}
</style>