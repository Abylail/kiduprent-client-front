<template>
  <button
      class="base-button"
      :class="[`base-button--type-${props.type}`, `base-button--size-${props.size}`, {'base-button--full-width': props.fullWidth}, {'base-button--loading': props.loading}]"
      v-bind="$attrs"
  ><slot/></button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "default",
    validator: t => ["default", "outline", "danger-outline", "naked"].includes(t),
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

  &--loading {
    pointer-events: none;
    opacity: 0.7;
  }
}
</style>