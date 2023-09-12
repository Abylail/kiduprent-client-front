<template>
  <div class="search">
    <div class="search__list">
      <button class="search__item" @click="showModalHandle()">
        <span class="search__item-name">Детские центры</span>
        <base-icon class="search__item-arrow" size="24" name="mdi-chevron-right"/>
      </button>
      <button class="search__item" @click="showModalHandle()">
        <span class="search__item-name">Развивающие курсы</span>
        <base-icon class="search__item-arrow" size="24" name="mdi-chevron-right"/>
      </button>
      <button class="search__item" @click="showModalHandle()">
        <span class="search__item-name">Курсы по школьной программе</span>
        <base-icon class="search__item-arrow" size="24" name="mdi-chevron-right"/>
      </button>
    </div>
  </div>

    <div class="search__modal" v-if="showModal">
      <mobile-header>
        <template #default>Поиск</template>
        <template #right><button @click="showModal = false"><base-icon name="mdi-close"/></button></template>
      </mobile-header>
      <search-view/>
    </div>
</template>

<script setup>
import BaseIcon from "../../base/BaseIcon";
import SearchView from "../search/searchView";
import MobileHeader from "../layoutComponents/mobileHeader";
import BaseGoButton from "../../base/BaseGoButton";

const showModal = ref(false);
const showModalHandle = () => {
  showModal.value = true;
}
</script>

<style lang="scss" scoped>
.search {
  background-color: white;
  padding: 0 $side-space-mobile;

  &__modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: white;
  }

  &__list {
    padding-top: 12px;
  }

  &__item {
    width: 100%;
    text-align: left;
    display: grid;
    grid-template-columns: 1fr 20px;
    align-items: center;
    padding: 12px 0;
    border-top: 1px solid $color--gray-light;
    color: $color--black;
    font-size: $fs--default;
  }

  &__item-arrow {
    color: $color--blue;
  }

}
</style>