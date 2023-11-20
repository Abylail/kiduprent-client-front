<template>
  <mobile-header>
    <div class="main-page-mobile-header-title">
      <nuxt-img class="main-page-mini-logo" src="/logo.svg" alt="logo"/>
    </div>
  </mobile-header>
  <div :class="[{'main-page--mobile': !$device.isDesktop}, {'main-page--desktop': $device.isDesktop}]">

    <div class="main-page-top">
      <banner/>
      <subject-list class="container--white main-page-block"/>
    </div>

    <!-- Топ центры -->
    <div class="main-page-block">
      <card-list title="Топ центры" to="/catalog/almaty/centers" :loading="topCentersLoading">
        <center-card
            v-for="(lesson, index) in mainStore.getTopCenters" :key="index"
            :info="lesson"
        />
      </card-list>
    </div>

    <!-- Напишите нам -->
    <still-questions/>

    <subjects-feed title="Интереные занятия"/>

  </div>
</template>

<script setup>
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
import CardList from "../../components/common/cardList";
import CenterCard from "../../components/common/miniCards/centerCard";
import {useMainStore} from "../../store/main";
import SubjectCard from "../../components/common/miniCards/subjectCard";
import SubjectList from "../../components/common/main/subjectList";
import SubjectsFeed from "../../components/common/main/subjectsFeed";
import SearchSelectType from "../../components/common/search/searchSelectType";
import StillQuestions from "../../components/common/main/stillQuestions";
import {onMounted} from "vue";
import Banner from "../../components/common/main/banner";
const { $device } = useNuxtApp();

const mainStore = useMainStore();

// Запрашиваю инетересные уроки
mainStore.fetchCategories();

definePageMeta({
  key: (route) => route.fullPath,
  keepalive: true
})

// Топ центры
const topCentersLoading = ref(true);
const fetchTopCenters = async () => {
  topCentersLoading.value = true;
  await mainStore.fetchTopCenters();
  topCentersLoading.value = false;
}

// Топ центры
const interestingSubjectsLLoading = ref(true);
const fetchInterestingSubjects = async () => {
  interestingSubjectsLLoading.value = true;
  await mainStore.fetchInterestingSubjects();
  interestingSubjectsLLoading.value = false;
}

onMounted(() => {
  fetchTopCenters();
  fetchInterestingSubjects();
})

</script>

<style lang="scss" scoped>
.main-page-mobile-header-title {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.main-page-mini-logo {
  height: 50px;
}
.main-page--mobile {

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