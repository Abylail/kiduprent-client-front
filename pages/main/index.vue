<template>
  <mobile-header>
    <div class="main-page__mobile-header-title">
      <img class="main-page__mini-logo" src="~/assets/images/logo.svg" alt="logo"/>
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
    <div class="main-page__questions container main-page__block">
      <h3 class="main-page__questions__title title">Остались вопросы?</h3>
      <p class="main-page__questions__text">Оставьте заявку и ваш вопрос обязательно рассмотрят</p>
      <base-button>Напишите нам</base-button>
    </div>

    <subjects-feed title="Интереные занятия"/>

  </div>
</template>

<script setup>
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
// import Categories from "../../components/common/main/categories";
import CardList from "../../components/common/cardList";
import CenterCard from "../../components/common/miniCards/centerCard";
import {useMainStore} from "../../store/main";
import SubjectCard from "../../components/common/miniCards/subjectCard";
import SubjectList from "../../components/common/main/subjectList";
import BaseButton from "../../components/base/BaseButton";
import SubjectsFeed from "../../components/common/main/subjectsFeed";
import SearchSelectType from "../../components/common/search/searchSelectType";

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

  &__questions {
    border-radius: 10px;
    background-color: white;
    padding: 20px;
    text-align: center;
    width: calc(100% - 4*#{$side-space-mobile});
    margin-left: auto;
    margin-right: auto;

    &__title {
      margin-bottom: 5px;
    }

    &__text {
      margin: 5px 0 20px;
      color: $color--gray-dark;
    }
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