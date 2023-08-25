<template>
  <mobile-header>
    <div class="main-page__mobile-header-title">
      <img class="main-page__mini-logo" src="~/assets/images/logo.svg" alt="logo"/>
    </div>
  </mobile-header>
  <div class="main-page">

    <!-- Поиск -->
    <search/>

    <!-- Фото -->
    <base-slider class="container--white"/>

    <div class="main-page__info container--white main-page__block">
      <h1 class="main-page__title title">Kidup - платформа</h1>
      <p>Найдите курс</p>
    </div>

    <categories class="container--white main-page__block"/>

    <!-- Список предметов -->
    <subject-list class="container--white main-page__block"/>

    <!-- Топ центры -->
    <div class="container--white main-page__block">
      <card-list title="Топ центры" to="/catalog">
        <center-card
            v-for="(lesson, index) in mainStore.getTopCenters" :key="index"
            :info="lesson"
        />
      </card-list>
    </div>

    <!-- Популярные уроки -->
    <div class="container--white main-page__block">
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

    <subjects-feed/>

  </div>
</template>

<script setup>
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
import Categories from "../../components/common/main/categories";
import CardList from "../../components/common/cardList";
import LessonCard from "../../components/common/miniCards/lessonCard";
import CenterCard from "../../components/common/miniCards/centerCard";
import {useMainStore} from "../../store/main";
import SubjectCard from "../../components/common/miniCards/subjectCard";
import SubjectList from "../../components/common/main/subjectList";
import BaseInput from "../../components/base/BaseInput";
import BaseButton from "../../components/base/BaseButton";
import SubjectsFeed from "../../components/common/main/subjectsFeed";
import Search from "../../components/common/main/search";
import BaseSlider from "../../components/base/BaseSlider";

const mainStore = useMainStore();

// Запрашиваю инетересные уроки
mainStore.fetchMainLists();
mainStore.fetchCategories();
mainStore.fetchTopCenters();

</script>

<style lang="scss" scoped>
.main-page {

  &__mobile-header-title {
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: center;
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

}
</style>