<template>
  <header class="mobile-header" :class="{'mobile-header--three-cols': goBack}" v-if="!$device.isDesktop">
    <slot name="left">
      <button class="mobile-header__go-back" v-if="goBack" @click="goBackHandle()">
        <base-icon name="mdi-chevron-left" size="36"/>
      </button>
    </slot>
    <div class="mobile-header__title" :class="{'mobile-header__title--big': !goBack}">
      {{ title }}
    </div>
    <div class="mobile-header__right">
      <slot name="right"/>
    </div>
  </header>
</template>

<script setup>
import BaseIcon from "../../base/BaseIcon";
const { $device, $goBack } = useNuxtApp();
const props = defineProps({
  title: {
    type: String
  },
  goBack: {
    type: [String, Function],
    default: null
  }
})

// Нажатие перейти назад
const goBackHandle = () => {
  if (typeof props.goBack === "string") $goBack(props.goBack || "/");
  else if (typeof props.goBack === "function") props.goBack()
}
</script>

<style lang="scss" scoped>
.mobile-header {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 36px;
  height: $header-height;
  font-weight: bold;

  &--three-cols {
    grid-template-columns: 36px 1fr 36px;
  }

  &__go-back {
    padding: 0;
    width: 36px;
    color: $color--blue;
  }

  &__title {
    padding: 0 8px;
    font-size: $fs--title;

    &--big {
      font-size: $fs--big-title;
    }
  }

  &__right {
    display: flex;
    justify-content: flex-end;
  }
}
</style>