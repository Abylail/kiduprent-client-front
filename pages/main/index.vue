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
    <base-media class="container--white"/>

    <div class="main-page__info container--white main-page__block">
      <h1 class="main-page__title title">Kidup - платформа</h1>
      <p>Найдите курс</p>
    </div>

    <categories class="container--white main-page__block"/>

    <!-- Список предметов -->
    <subject-list class="container--white main-page__block"/>

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
      <base-button>Напишите нам</base-button>
    </div>

    <subjects-feed class="container"/>

  </div>
</template>

<script setup>
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
import Categories from "../../components/common/main/categories";
import CardList from "../../components/common/cardList";
import LessonCard from "../../components/common/miniCards/lessonCard";
import CenterCard from "../../components/common/miniCards/centerCard";
import {useMainStore} from "../../store/main";
import BaseMedia from "../../components/base/BaseMedia";
import SubjectCard from "../../components/common/miniCards/subjectCard";
import SubjectList from "../../components/common/main/subjectList";
import BaseInput from "../../components/base/BaseInput";
import BaseButton from "../../components/base/BaseButton";
import SubjectsFeed from "../../components/common/main/subjectsFeed";
import Search from "../../components/common/main/search";

const mainStore = useMainStore();

// Запрашиваю инетересные уроки
mainStore.fetchMainLists();
mainStore.fetchCategories();

// Пустой лист для примера
const exampleList = [{}, {}, {}, {}, {}];
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
    height: 130px;
    border-radius: 10px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &__title {
      margin-bottom: 10px;
    }
  }

}
</style>