<template>
  <div class="base-loader" :class="{'base-loader--center-horizontal': props.centerHorizontal}">
    <img
      v-if="props.type === 'basketball'"
      class="base-loader__image"
      src="~/assets/images/basketball-loader.svg"
      alt="basketball-loader"
      :style="styles"
    />
  </div>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "basketball",
    validator: t => ["basketball"].includes(t)
  },
  size: {
    type: [Number, String],
    default: 50
  },
  centerHorizontal: {
    type: Boolean,
    default: false
  }
})

const styles = computed(() => ({height: `${props.size}px`, width: `${props.size}px`}))
</script>

<style lang="scss" scoped>
.base-loader {
  display: inline-block;

  &--center-horizontal {
    display: block;
    text-align: center;
  }

}
</style>