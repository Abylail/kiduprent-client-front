<template>
  <div class="base-mini-photos">
    <img
        class="base-mini-photos__photo"
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
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;

  &__photo {
    height: 50px;
    width: 50px;
    box-sizing: content-box;
    &:not(:last-child) {
      margin-right: 8px;
    }
  }

}
</style>