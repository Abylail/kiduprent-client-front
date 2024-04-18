<template>
  <card-list
      class="category-packs"
      :title="$getProp(category, 'name')"
      sub-title="Готовые пакеты"
  >
    <pack-card v-for="(pack, index) in packs" :key="index" :info="pack"/>
  </card-list>
</template>

<script setup>
import CardList from "../cardList";
import {computed} from "vue";
import PackCard from "../miniCards/packCard";

const props = defineProps({
  category: {
    type: Object,
    default: () => ({})
  }
})

const packs = computed(() => props.category.toyPacks)
</script>

<style lang="scss" scoped>
.category-packs {
  margin: 16px 0;
}
</style>