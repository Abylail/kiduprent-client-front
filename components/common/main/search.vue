<template>
  <div class="search">
    <div class="search__fake-input" @click="showModalHandle()">
      <base-icon class="search__fake-input-icon" name="mdi-magnify"/>
      <span class="search__fake-input-label">Поиск курсов и центров</span>
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

const showModal = ref(false);
const showModalHandle = () => {
  showModal.value = true;
}
</script>

<style lang="scss" scoped>
.search {
  background-color: white;
  padding: 0 $side-space-mobile;

  &__fake-input {
    display: flex;
    align-items: center;
    background-color: $color--gray-light;
    height: calc(50px - 2*#{$side-space-mobile});
    border-radius: 10px;
    padding: $side-space-mobile;
  }

  &__fake-input-icon {
    margin-right: 4px;
  }

  &__modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: white;
  }

}
</style>