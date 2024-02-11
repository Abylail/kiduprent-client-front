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
        v-for="(toy, index) in toysStore.getList" :key="toy.index"
        :toy="toy"
      />
    </div>
  </div>
</template>

<script setup>
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
import {useToysStore} from "../../store/toys";
import ToyCard from "../../components/common/miniCards/toyCard";
const { $device } = useNuxtApp();

const toysStore = useToysStore();

await toysStore.fetchList();
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
  padding: 0 $side-space-mobile;
}

.title {
  margin-top: 16px;
  color: $color--blue-dark;
}
</style>