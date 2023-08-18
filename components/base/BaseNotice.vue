<template>
  <div class="base-notice">
    <base-icon class="base-notice__icon" name="mdi-information-outline" size="30"/>
    <div class="base-notice__text">{{ props.text }}</div>
  </div>
</template>

<script setup>
import BaseIcon from "./BaseIcon";

const props = defineProps({
  text: String
})
</script>

<style lang="scss" scoped>
.base-notice {
  display: flex;
  align-items: center;
  background-color: $color--gray-light;
  padding: 12px;
  border-radius: 6px;

  &__icon {
    color: $color--blue-light;
    margin-right: 12px;
  }

  &__text {
    color: $color--blue-light;
  }
}
</style>