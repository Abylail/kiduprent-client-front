<template>
  <div class="base-loader" :class="{'base-loader--center-horizontal': props.centerHorizontal}">
    <svg
        v-if="props.type === 'basketball'"
        class="base-loader__image"
        :style="styles"
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
    >
      <circle cx="50" cy="50" r="35.25" fill="#dc4946" stroke="#b11904" stroke-width="5.5"></circle>
      <path d="M50 15L50 85" stroke="#b11904" stroke-width="5"></path>
      <path d="M25.251262658470836 25.25126265847084 A35 35 0 0 1 25.251262658470836 74.74873734152916" fill="none" stroke="#b11904" stroke-width="5"></path>
      <path d="M74.74873734152916 25.25126265847084 A35 35 0 0 0 74.74873734152916 74.74873734152916" fill="none" stroke="#b11904" stroke-width="5"></path>
      <g transform="translate(0 50)"><g>
        <path d="M15 0A35 35 0 0 1 85 0" fill="none" stroke="#b11904" stroke-width="5">
          <animate attributeName="d" repeatCount="indefinite" dur="0.5s" calcMode="spline" keyTimes="0;0.499999;0.5;1" keySplines="0.1 0 1 0.9;0.5 0.5 0.5 0.5;0 0.1 0.9 1" values="M15 0A35 35 0 0 1 85 0;M15 0A35 0 0 0 1 85 0;M15 0A35 0 0 0 0 85 0;M15 0A35 35 0 0 0 85 0" begin="0"></animate>
        </path>
        <path d="M15 0A35 35 0 0 1 85 0" fill="none" stroke="#b11904" stroke-width="5">
          <animate attributeName="d" repeatCount="indefinite" dur="0.5s" calcMode="spline" keyTimes="0;0.499999;0.5;1" keySplines="0.1 0 1 0.9;0.5 0.5 0.5 0.5;0 0.1 0.9 1" values="M15 0A35 35 0 0 1 85 0;M15 0A35 0 0 0 1 85 0;M15 0A35 0 0 0 0 85 0;M15 0A35 35 0 0 0 85 0" begin="-0.5"></animate>
        </path>
      </g></g>
    </svg>
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

const styles = computed(() => ({
  height: `${props.size}px`,
  width: `${props.size}px`,
  margin: 'auto',
  display: 'inline-block'
}))
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