<template>
  <mobile-header>
    <div class="main-page__mobile-header-title">
      <nuxt-img class="main-page__mini-logo" src="/logo.svg" alt="logo"/>
    </div>
  </mobile-header>
  <div class="main-page">

    <!-- Поиск -->
    <search-select-type/>

    <div class="main-page__info container--white main-page__block">
      <h1 class="main-page__title"><strong>Kidup</strong> - Все центры и кружки для ребенка, в одном месте.</h1>
      <div class="main-page__steps">
        <div class="main-page__step"><span class="main-page__step-count">1</span>Найдите занятие</div>
        <div class="main-page__step"><span class="main-page__step-count">2</span>Выберите удобное расписание</div>
        <div class="main-page__step"><span class="main-page__step-count">3</span>Запишитесь на пробный</div>
      </div>
    </div>
<!--    <categories class="container&#45;&#45;white main-page__block"/>-->

    <!-- Список предметов -->
    <subject-list class="container--white main-page__block"/>

    <!-- Топ центры -->
    <div class="main-page__block">
      <card-list title="Топ центры" to="/catalog" :loading="topCentersLoading">
        <center-card
            v-for="(lesson, index) in mainStore.getTopCenters" :key="index"
            :info="lesson"
        />
      </card-list>
    </div>

    <!-- Популярные уроки -->
    <div class="main-page__block">
      <card-list title="Популярные уроки" to="/catalog" :loading="interestingSubjectsLLoading">
        <subject-card
            v-for="(lesson, index) in mainStore.getInterestingSubjects" :key="index"
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
.main-page {

  &__mobile-header-title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  &__search-wrapper {
    padding: $side-space-mobile;
    background-color: white;;
  }

  &__mini-logo {
    height: 50px;
  }

  &__title {
    font-size: $fs--title;
    font-weight: normal;
  }

  &__block {
    margin: 16px 0;
  }

  &__steps {
    margin-top: 16px;
  }

  &__step {
    display: flex;
    align-items: center;
    margin-top: 16px;
  }

  &__step-count {
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