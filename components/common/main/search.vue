<template>
  <div class="search">
    
<!-- Выбор типа (центры/уроки) -->
    <div class="search__select-type">
      <div class="search__list">
        <nuxt-link class="search__item" to="/catalog/almaty/centers">
          <span class="search__item-name">Детские центры</span>
          <base-icon class="search__item-arrow" size="24" name="mdi-chevron-right"/>
        </nuxt-link>
        <nuxt-link class="search__item" to="/catalog/almaty/lessons">
          <span class="search__item-name">Уроки и курсы</span>
          <base-icon class="search__item-arrow" size="24" name="mdi-chevron-right"/>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseIcon from "../../base/BaseIcon";
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
    font-weight: bold;
  }

  &__item-arrow {
    color: $color--blue;
  }

}
</style>