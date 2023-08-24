<template>
  <div class="search-view">

    <div class="search-view__tools">
      <div class="search-view__input-wrapper">
        <base-input
            class="search-view__input"
            title="Поиск"
            prev-icon="mdi-magnify"
            v-model="searchText"
            type="naked-gray"
        />
        <filter-search/>
      </div>
      <base-switch
          v-model="type"
          :options="types"
      />
    </div>

    <div class="search-view__result">

    </div>

  </div>
</template>

<script setup>
import BaseSwitch from "../../base/BaseSwitch";
import {ref} from "vue";
import BaseInput from "../../base/BaseInput";
import MobileHeader from "../layoutComponents/mobileHeader";
import BaseIcon from "../../base/BaseIcon";
import FilterSearch from "./filter";

// Тип поиска
const types = [{key: "lessons", name: "Уроки"}, {key: "centers", name: "Центры"}];
const type = ref(types[0].key);

// Поисковый текст
const searchText = ref("");
</script>

<style lang="scss" scoped>
.search-view {
  background-color: $color--gray-light;
  overflow-x: visible;
  height: 100%;

  &__input-wrapper {
    display: flex;
  }

  &__input {
    flex: 1;
    margin-right: 8px;
  }

  &__tools {
    padding: 0 $side-space-mobile 8px;
    background-color: white;
  }
}
</style>