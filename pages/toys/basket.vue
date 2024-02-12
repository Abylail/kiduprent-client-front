<template>
  <mobile-header
      title="Корзина"
      go-back="/toys"
  />

  <div class="basket">
    <div class="basket__toys">
      <toy-card
          v-for="toy in toysCartStore.getList" :key="toy.id"
          :toy="toy"
          basket
      />
    </div>
  </div>
</template>

<script setup>
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
import {useToysCartStore} from "../../store/toys/basket";
import ToyCard from "../../components/common/miniCards/toyCard";

const toysCartStore = useToysCartStore();

</script>

<style lang="scss" scoped>
.basket {
  &__toys {
    display: flex;
    flex-wrap: wrap;
    column-gap: 12px;
    padding: 0 $side-space-mobile;
  }
}
</style>