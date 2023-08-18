<template>
  <mobile-header title="Каталог">
    <template #right>
      <filter-catalog #right :options="filterOptions" @update:options="updateFilters($event)"/>
    </template>
  </mobile-header>

  <div class="catalog">
    <div class="catalog__tools">
      <base-input title="Поиск" prev-icon="mdi-magnify" v-model="searchText"/>
      <base-switch
        v-model="type"
        :options="types"
      />
    </div>

    <!-- Список уроков -->
    <div class="catalog__list" v-if="type === 'lessons'">
      <lesson-card
          v-for="(lesson, index) in exampleList" :key="index"
          :info="lesson"
          full
      />
    </div>

    <!-- Список центров -->
    <div class="catalog__list" v-else-if="type === 'centers'">
      <center-card
          v-for="(center, index) in exampleList" :key="index"
          :info="center"
          full
      />
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
import FilterCatalog from "../../components/common/catalog/filterCatalog";
import BaseInput from "../../components/base/BaseInput";
import BaseSwitch from "../../components/base/BaseSwitch";
import LessonCard from "../../components/common/miniCards/lessonCard";
import CenterCard from "../../components/common/miniCards/centerCard";

const searchText = ref("");

// Тип поиска
const types = [{key: "lessons", name: "Уроки"}, {key: "centers", name: "Центры"}];
const type = ref(types[0].key);

const exampleList = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

// Фильтр и сортировка
const defaultOptions = {city: "almaty"};
const filterOptions = ref(defaultOptions);
const updateFilters = options => {
  if (!options) filterOptions.value = defaultOptions;
  else filterOptions.value = options;
}
</script>

<style lang="scss" scoped>
.catalog {

  &__tools {
    position: sticky;
    top: 0;
    background: $color--background-white;
    padding: 12px 0;
  }

  &__list {
    margin: 16px 0;
    & > * {
      margin-bottom: 16px;
    }
  }

}
</style>