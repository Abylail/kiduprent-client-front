<template>
  <div class="search-list">
    <h1 class="search-list__title container" v-if="props.title">{{ props.title }}</h1>

    <div class="search-list__result">

    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  list: Array,
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.search-list {
  margin-top: 16px;

  &__title {
    font-size: $fs--default;
    line-height: 24px;
    font-weight: normal;
  }

}
</style>