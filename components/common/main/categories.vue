<template>
  <div class="categories">

    <div class="categories__grid">
      <nuxt-link class="categories__item" v-for="category in categories" :key="category.id" to="/">
        <base-icon class="categories__item-icon" size="30" v-if="category.icon_mdi" :name="category.icon_mdi"/>
        <p class="categories__item-name">{{ category.name }}</p>
      </nuxt-link>
    </div>

  </div>
</template>

<script setup>
import {useMainCategoriesStore} from "../../../store/main/categories";
import {computed} from "vue";
import BaseIcon from "../../base/BaseIcon";

const categoriesStore = useMainCategoriesStore();
categoriesStore.fetchCategories();

// Показать все
const isShowAll = ref(false);
const showAll = () => isShowAll.value = true;

const categories = computed(() => categoriesStore.getCategories.slice(0, 6))
</script>

<style lang="scss" scoped>
.categories {

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: $side-space-mobile;
    grid-row-gap: 24px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $color--blue;
    text-align: center;
  }

  &__item-name {
    font-size: $fs--mini;
    color: $color--black;
  }

}
</style>