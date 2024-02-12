<template>
  <mobile-header>
    <div class="search-head">
      <nuxt-img class="search-head-logo"  src="/logo.svg" alt="logo"/>
      <span>Kidup.kz</span>
    </div>
  </mobile-header>

  <h1 class="container title">Список игрушек</h1>

  <div :class="[{'main-page--mobile': !$device.isDesktop}, {'main-page--desktop': $device.isDesktop}]">
    <div class="toy-list">
      <toy-card
        v-for="(toy, index) in toysStore.getList" :key="toy.id"
        :toy="toy"
        basket
      />
    </div>
  </div>

  <cart-window/>
</template>

<script setup>
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
import {useToysStore} from "../../store/toys";
import ToyCard from "../../components/common/miniCards/toyCard";
import {onMounted} from "vue";
import {useToysCartStore} from "../../store/toys/basket";
import CartWindow from "../../components/common/toys/cartWindow";
const { $device } = useNuxtApp();

const toysStore = useToysStore();
const toysCartStore = useToysCartStore();

await toysStore.fetchList();

onMounted(() => {
  toysCartStore.fetchCart();
})
</script>

<style lang="scss" scoped>
.search-head {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
}

.search-head-logo {
  height: 50px;
}

.toy-list {
  display: flex;
  flex-wrap: wrap;
  column-gap: 12px;
  padding: 0 $side-space-mobile;
}

.title {
  margin-top: 16px;
  color: $color--blue-dark;
}
</style>