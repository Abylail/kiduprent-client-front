<template>
  <div class="base-mini-photos">
    <img
        class="base-mini-photos__slide"
        v-for="(photo, index) in props.list"
        :src="getImageUrl(photo)"
        :alt="`slide-${index}`"
    />
  </div>
</template>

<script setup>
import {useRuntimeConfig} from "nuxt/app";

const config = useRuntimeConfig();
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})

const getImageUrl = url => config.public.CDN_URL + url;
</script>

<style lang="scss" scoped>
.base-mini-photos {
  user-select: none;
  height: 100%;
  overflow-x: auto !important;
  overflow-y: hidden !important;
  white-space: nowrap;
  scroll-snap-type: x mandatory;
  border-radius: 5px;

  &__slide {
    display: inline-block;
    scroll-snap-align: center;
    width: 100%;
    min-width: 100%;
    height: 100%;
    margin: 0 4px;
    box-sizing: content-box;
    object-fit: cover;
    &:first-child {margin-left: 0}
    &:last-child {margin-right: 0}
  }

}
</style>