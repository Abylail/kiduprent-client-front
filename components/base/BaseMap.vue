<template>
  <div class="base-map" :style="{height: myHeight, width: myWidth}">
    map
  </div>
</template>

<script setup>
import {computed, onMounted} from "vue";

const props = defineProps({
  height: {
    type: [String, Number],
    default: "200",
  },
  width: {
    type: [String, Number],
    default: null
  }
})

const myWidth = computed(() => props.width ? `${props.width}px` : "100%");
const myHeight = computed(() => `${props.height}px`);

</script>

<style lang="scss" scoped>
.base-map {
  background-color: $color--gray;
  border-radius: 10px;
}
</style>