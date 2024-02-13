<template>
  <mobile-header>
    <div class="search-head">
      <nuxt-img class="search-head-logo"  src="/logo.svg" alt="logo"/>
      <span>Kidup.kz</span>
    </div>
  </mobile-header>

  <div class="toy-filter">
    <div class="toy-filter-right">Возраст</div>
    <base-select
        :model-value="activeAge"
        :options="ages"
        view-type="mini"
        @update:modelValue="selectAge($event)"
    />
  </div>

  <div :class="[{'toy-page--mobile': !$device.isDesktop}, {'toy-page--desktop': $device.isDesktop}]">
    <h1 class="container toy-title">Список игрушек</h1>
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
import {computed, onMounted} from "vue";
import {useToysCartStore} from "../../store/toys/basket";
import CartWindow from "../../components/common/toys/cartWindow";
import BaseSelect from "../../components/base/BaseSelect";
import {useRoute, useRouter} from "nuxt/app";
const { $device } = useNuxtApp();

const toysStore = useToysStore();
const toysCartStore = useToysCartStore();

await toysStore.fetchList();

const router = useRouter();
const route = useRoute();
const activeAge = computed(() => route.query?.ageKey || "0");

const ages = [
  {name: "Любой возраст", key: "0", min: null, max: null},
  {name: "0 - 3 мес", key: "1", min: null, max: null},
  {name: "3 - 6 мес", key: "2", min: null, max: null},
  {name: "6 - 12 мес", key: "3", min: null, max: null},
  {name: "12 - 18 мес", key: "4", min: null, max: null},
  {name: "18 - 24 мес", key: "5", min: null, max: null},
  {name: "2 - 3 года", key: "6", min: null, max: null},
  {name: "3 - 5 лет", key: "7", min: null, max: null},
  {name: "5 - 8 лет", key: "8", min: null, max: null},
]

const selectAge = (age) => {
  console.log(age, activeAge.value);
  if (age === activeAge.value) return;
  router.replace({
    path: '/toys',
    query: {...route.query, ageKey: age || undefined}
  })
}

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

.toy-title {
  //margin-top: 16px;
  //color: $color--blue-dark;
  //font-size: $fs--default;
  //font-weight: normal;
  display: table-cell;
  vertical-align: bottom;
  font-size: 1rem;
  line-height: 1rem;
  font-weight: normal;
  height: 24px;
  padding: 0 16px;
  margin-top: 24px;
  margin-bottom: 8px;

}

.toy-page--mobile {
  margin-top: 24px;
}

.toy-filter {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  box-sizing: content-box !important;
  width: calc(100% - 32px);
  padding: 12px 16px;
  border-bottom: 3px solid #efefef;
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>