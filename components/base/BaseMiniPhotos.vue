<template>
  <div class="base-mini-photos">
    <div class="base-mini-photos__slides" :class="[{'base-mini-photos__slides--rounded': props.rounded}]">
      <img
          class="base-mini-photos__slide"
          v-for="(photo, index) in props.list"
          :src="getImageUrl(photo)"
          alt=""
      />
    </div>

    <div class="base-mini-photos__count" v-if="showCount">{{ list.length }}</div>
  </div>
</template>

<script setup>
import {useRuntimeConfig} from "nuxt/app";

const config = useRuntimeConfig();
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  showCount: {
    type: Boolean,
    default: true
  },
  rounded: {
    type: Boolean,
    default: true
  }
})

const getImageUrl = url => config.public.CDN_URL + url;
</script>

<style lang="scss" scoped>
.base-mini-photos {
  position: relative;

  &__slides {
    user-select: none;
    height: 100%;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    white-space: nowrap;
    scroll-snap-type: x mandatory;

    &--rounded {
      border-radius: 5px;
    }
  }

  &__slide {
    display: inline-block;
    scroll-snap-align: center;
    width: 100%;
    min-width: 100%;
    height: 100%;
    margin: 0 4px;
    box-sizing: content-box;
    object-fit: cover;
    border-radius: 0;
    &:first-child {margin-left: 0}
    &:last-child {margin-right: 0}
  }

  &__count {
    position: absolute;
    bottom: 8px;
    right: 8px;
    color: white;
    background-color: rgba(0, 0, 0, .5);
    padding: 2px 8px;
    border-radius: 5px;
    font-size: $fs--mini;
  }

}
</style>