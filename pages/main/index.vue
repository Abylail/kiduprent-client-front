<template>
  <mobile-header>
    <div class="main-page__mobile-header-title">
      <nuxt-img class="main-page__mini-logo" src="/logo.svg" alt="logo"/>
    </div>
  </mobile-header>
  <div class="main-page">

    <!-- Фото -->
<!--    <base-slider class="container&#45;&#45;white"/>-->

    <!-- Поиск -->
    <search-select-type/>

    <div class="main-page__info container--white main-page__block">
      <h1 class="main-page__title"><strong>Kidup</strong> - платформа для развития ребенка</h1>
      <div class="main-page__steps">
        <div class="main-page__step"><span class="main-page__step-count">1</span>Найдите занятия и выберите группу</div>
        <div class="main-page__step"><span class="main-page__step-count">2</span>Запишитесь на пробный</div>
        <div class="main-page__step"><span class="main-page__step-count">3</span>Приходите на занятие</div>
      </div>
    </div>

<!--    <categories class="container&#45;&#45;white main-page__block"/>-->

    <!-- Список предметов -->
    <subject-list class="container--white main-page__block"/>

    <!-- Топ центры -->
    <div class="main-page__block">
      <card-list title="Топ центры" to="/catalog">
        <center-card
            v-for="(lesson, index) in mainStore.getTopCenters" :key="index"
            :info="lesson"
        />
      </card-list>
    </div>

    <!-- Популярные уроки -->
    <div class="main-page__block">
      <card-list title="Популярные уроки" to="/catalog">
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

const mainStore = useMainStore();

// Запрашиваю инетересные уроки
mainStore.fetchMainLists();
mainStore.fetchCategories();
mainStore.fetchTopCenters();

definePageMeta({
  key: (route) => route.fullPath,
  keepalive: true
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