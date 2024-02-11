<template>
  <div class="toy-card">
    <base-mini-photos class="toy-card__toys" :list="props.toy.photos" :showCount="props.toy.photos.length > 1"/>
    <div class="toy-card__info">
      <h3 class="toy-card__title">{{ props.toy.name_ru }}</h3>
      <div class="toy-card__price">
        <base-icon class="toy-card__icon" name="mdi-currency-usd" size="14" color="white"/>
        {{ props.toy.token }} токенов
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseMiniPhotos from "../../base/BaseMiniPhotos";
import BaseIcon from "../../base/BaseIcon";

const props = defineProps({
  toy: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style lang="scss" scoped>
.toy-card {
  display: inline-flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
  flex: 1;
  color: $color--black;
  padding: $side-space-mobile 0;
  border: 1px solid $color--gray-light;
  margin-right: 8px;

  &__toys {
    height: 140px;
    width: 140px;
    min-width: 150px;
    background-color: white;
  }

  &__title {
    color: $color--blue-dark;
    font-size: $fs--default;
    margin: 8px 0;
  }

  &__icon {
    border: 1px solid black;
    border-radius: 100%;
    padding: 1px;
    background-color: $color--blue-dark;
  }

  &__price {
    font-size: $fs--mini;
  }
}
</style>