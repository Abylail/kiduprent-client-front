<template>
  <span
    class="base-icon mdi"
    :class="[props.name]"
    :style="[{fontSize: `${props.size}px`}, {color}]"
    v-bind="$attrs"
  />
</template>

<script setup>
import "@mdi/font/css/materialdesignicons.min.css";
const props = defineProps({
  name: String, // Имя иконки
  color: {
    type: String,
    default: undefined
  },
  size: { // Размер иконки
    type: [Number, String],
    default: 24
  }
})
</script>

<style lang="scss" scoped>
.base-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>