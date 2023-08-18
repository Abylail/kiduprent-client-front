<template>
  <div class="category-list">

    <div class="category-list__head">
      <span class="category-list__title title">Категории</span>
      <button class="category-list__go-categories" v-if="!isShowAll" @click="showAll()">Смотреть все</button>
    </div>

    <div class="category-list__content">
      <nuxt-link
          class="category-list__item chip"
          v-for="category in categories" :key="category.code"
          :to="`/catalog?category=${category.code}`"
      >{{ category.name }}</nuxt-link>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  categories: Array
})

// Список показанных категорий
const categories = computed(() => isShowAll.value ? props.categories : props.categories.slice(0, 5));

// Показать все
const isShowAll = ref(false);
const showAll = () => isShowAll.value = true;
</script>

<style lang="scss" scoped>
.category-list {
  margin-top: 20px;

  * {
    transition: 0s;
  }

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__go-categories {
    color: $color--blue;
    font-weight: bold;
    font-size: $fs--mini;
  }

  &__content {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }

  &__item {
    margin-right: 8px;
    margin-bottom: 8px;
  }

}
</style>