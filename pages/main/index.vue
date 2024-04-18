<template>
  <mobile-header :lang-switch="false">
    <div class="main-page-mobile-header-title">
      <nuxt-img class="main-page-mini-logo" src="/logo.svg" alt="logo"/>
      <span>Kidrent</span>
    </div>
  </mobile-header>
  <div :class="[{'main-page--mobile': !$device.isDesktop}, {'main-page--desktop': $device.isDesktop}]">

    <div class="main-page-top">
      <banner/>
    </div>

    <category-packs v-if="packsStore.getMainCategory" :category="packsStore.getMainCategory"/>

    <!-- Как это работает -->
    <banner-toys/>

    <!-- Тарифы -->
    <prices/>

    <category-packs
        v-for="(packCategory, index) in packsStore.getCategories" :key="index"
        v-show="packCategory.toyPacks?.length"
        :category="packCategory"
    />

    <!-- Напишите нам -->
    <still-questions/>

  </div>
</template>

<script setup>
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
import {useMainStore} from "../../store/main";
import StillQuestions from "../../components/common/main/stillQuestions";
import Banner from "../../components/common/main/banner";
import BannerToys from "../../components/common/main/bannerToys";
import Prices from "../../components/common/main/prices";
import {usePacksStore} from "../../store/packs";
import CategoryPacks from "../../components/common/main/categoryPacks";
const { $device } = useNuxtApp();

const packsStore = usePacksStore();

// Запрашиваю пакеты
packsStore.fetchPackCategories();

const goCollection = (collection) => {
  console.log(collection)
}

definePageMeta({
  key: (route) => route.fullPath,
  keepalive: true
})

</script>

<style lang="scss" scoped>
.main-page-mobile-header-title {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  font-size: $fs--title;
}
.main-page-mini-logo {
  height: 50px;
}
.main-page--mobile {

  .main-page-mobile-header-title {
    display: flex;
    align-items: center;
    justify-content: left;
    width: 100%;
  }

  .main-page-search-wrapper {
    padding: $side-space-mobile;
    background-color: white;;
  }

  .main-page-mini-logo {
    height: 50px;
  }

  .main-page-title {
    font-size: $fs--title;
    font-weight: normal;
  }

  .main-page-block {
    margin: 16px 0;
  }

  .main-page-steps {
    margin-top: 16px;
  }

  .main-page-step {
    display: flex;
    align-items: center;
    margin-top: 16px;
  }

  .main-page-step-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 100%;
    background-color: $color--red;
    color: white;
    margin-right: 8px;
  }

}
.main-page--desktop {

  .main-page-mobile-header-title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .main-page-search-wrapper {
    padding: $side-space-mobile;
    background-color: white;;
  }

  .main-page-top {
    display: grid;
    grid-template-columns: 540px 1fr;
    margin: 16px 0;
  }

  .main-page-mini-logo {
    height: 50px;
  }

  .main-page-title {
    font-size: $fs--title;
    font-weight: normal;
  }

  .main-page-block {

  }

  .main-page-steps {
    margin-top: 16px;
  }

  .main-page-step {
    display: flex;
    align-items: center;
    margin-top: 16px;
  }

  .main-page-step-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 100%;
    background-color: $color--red;
    color: white;
    margin-right: 8px;
  }

}
</style>