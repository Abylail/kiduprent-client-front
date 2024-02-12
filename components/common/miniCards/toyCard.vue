<template>
  <div class="toy-card">
    <base-mini-photos class="toy-card__toys" :list="props.toy.photos" :showCount="props.toy.photos && props.toy.photos.length > 1"/>

    <div class="toy-card__info">
      <h3 class="toy-card__title">{{ props.toy.name_ru }}</h3>
      <div class="toy-card__price">
        <base-icon class="toy-card__icon" name="mdi-currency-usd" size="14" color="white"/>
        {{ props.toy.token }} токенов
      </div>
    </div>

    <div class="toy-card__basket-connection" v-if="basket">
      <base-button
          v-if="!isIncluded"
          class="toy-card__add"
          type="outline"
          size="mini"
          full-width
          @click="addHandle()"
      >Добавить +</base-button>
      <base-button
          v-else
          class="toy-card__add"
          type="outline-gray"
          size="mini"
          full-width
          @click="removeHandle()"
      >Убрать</base-button>
    </div>

  </div>
</template>

<script setup>
import BaseMiniPhotos from "../../base/BaseMiniPhotos";
import BaseIcon from "../../base/BaseIcon";
import BaseButton from "../../base/BaseButton";
import {useToysCartStore} from "../../../store/toys/basket";
import {computed} from "vue";

const props = defineProps({
  toy: {
    type: Object,
    default: () => ({})
  },
  basket: {
    type: Boolean,
    default: false
  }
})

const toysCartStore = useToysCartStore();

const isIncluded = computed(() => process.client && toysCartStore.getIdList.includes(props.toy.id));

// Добавить игрушку в корзину
const addHandle = () => {
  if (process.server) return;
  toysCartStore.addToy(props.toy);
  console.log(toysCartStore.getIdList)
}

// Добавить игрушку в корзину
const removeHandle = () => {
  if (process.server) return;
  toysCartStore.removeToy(props.toy);
}
</script>

<style lang="scss" scoped>
.toy-card {
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
  flex: 1;
  color: $color--black;
  padding: $side-space-mobile 0;
  margin-right: 8px;
  min-width: 150px;
  max-width: 180px;
  width: 100%;

  &__toys {
    height: 140px;
    width: 100%;
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

  &__basket-connection {
    display: block;
    margin-top: auto;
  }

  &__add {
    margin-top: 16px;
  }
}
</style>