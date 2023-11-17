<template>
  <button
      class="base-button"
      :class="[
          `base-button--type-${props.type}`,
          `base-button--size-${props.size}`,
          {'base-button--full-width': props.fullWidth},
          {'base-button--loading': props.loading},
          {'base-button--disabled': props.disabled},
          ]"
      v-bind="$attrs"
  ><slot/></button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "default",
    validator: t => ["default", "outline", "danger-outline", "naked", "naked-blue"].includes(t),
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: "default",
    validator: s => ["mini", "default", "big"]
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.base-button {
  border-radius: 10px;
  border: 1px solid transparent;

  &--type-default {
    background-color: $color--blue;
    color: white;
  }

  &--type-outline {
    color: $color--blue;
    border-color: $color--blue;
  }

  &--type-danger-outline {
    color: $color--red;
    border-color: $color--red;
  }

  &--type-naked {
    color: $color--blue;
  }

  &--type-naked-blue {
    color: $color--blue;
    background-color: $color--blue-light;
  }

  &--size-mini {
    font-size: $fs--mini;
    padding: 8px 12px;
  }

  &--size-default {
    font-size: $fs--default;
    padding: 10px 14px;
  }

  &--size-big {
    font-size: $fs--title;
    padding: 12px 16px;
  }

  &--full-width {
    width: 100%;
  }

  &--disabled {
    pointer-events: none;
    opacity: .7;
  }

  &--loading {
    opacity: .6;
    pointer-events: none;
    position: relative;
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      width: 50%;
      margin: 0 auto;
      background-color: rgba(255,255,255,.28);
      box-shadow: 0 0 50px rgba(255,255,255);
      z-index: 1;
      animation: btn-loading-pulse 1.5s ease-in-out infinite;
    }
  }
}

@keyframes btn-loading-pulse {
  0% {
    transform: translateX(-200%);
  }
  100% {
    transform: translateX(200%);
  }
}
</style>