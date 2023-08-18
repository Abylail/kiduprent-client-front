<template>
  <div class="category-list">

    <div class="category-list__head">
      <span class="category-list__title title">Категории</span>
      <nuxt-link class="category-list__go-categories" to="/catalog">Смотреть все</nuxt-link>
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
const categories = [
  {name: "Алгоритмы", code: "algorithm"},
  {name: "Программирование", code: "coding"},
  {name: "Математика", code: "math"},
  {name: "Физика", code: "phis"},
  {name: "Химия", code: "chemistry"},
]
</script>

<style lang="scss" scoped>
.category-list {
  margin-top: 20px;

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