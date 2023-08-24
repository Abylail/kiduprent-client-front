<template>
  <mobile-header title="Каталог">
    <template #right>
      <filter :options="filterOptions" @update:options="updateFilters($event)"/>
    </template>
  </mobile-header>

  <search-view/>
</template>

<script setup>
import {ref} from "vue";
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
import Filter from "../../components/common/search/filter";
import BaseInput from "../../components/base/BaseInput";
import BaseSwitch from "../../components/base/BaseSwitch";
import LessonCard from "../../components/common/miniCards/lessonCard";
import CenterCard from "../../components/common/miniCards/centerCard";
import SearchView from "../../components/common/search/searchView";

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