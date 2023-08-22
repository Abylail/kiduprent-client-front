<template>
  <mobile-header>
    <img class="main-page__mini-logo" src="~/assets/images/logo.svg" alt="logo"/>
    <h2 class="main-page__title">Kidup - главная</h2>
  </mobile-header>
  <div class="main">
    <base-media/>

    <card-list title="Популярные уроки" to="/catalog">
      <subject-card
          v-for="(lesson, index) in mainStore.getInterestingSubjects" :key="index"
          :info="lesson"
      />
    </card-list>
    <subject-list/>

<!--    <category-list :categories="mainStore.getCategories"/>-->

  </div>
</template>

<script setup>
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
import CategoryList from "../../components/common/main/categoryList";
import CardList from "../../components/common/cardList";
import LessonCard from "../../components/common/miniCards/lessonCard";
import CenterCard from "../../components/common/miniCards/centerCard";
import {useMainStore} from "../../store/main";
import BaseMedia from "../../components/base/BaseMedia";
import SubjectCard from "../../components/common/miniCards/subjectCard";
import SubjectList from "../../components/common/main/subjectList";

const mainStore = useMainStore();

// Запрашиваю инетересные уроки
mainStore.fetchMainLists();
mainStore.fetchCategories();

// Пустой лист для примера
const exampleList = [{}, {}, {}, {}, {}];
</script>

<style lang="scss" scoped>
.main-page {

  &__mini-logo {
    height: 50px;
    width: 50px;
  }

  &__title {
    font-size: $fs--title;
  }

}
</style>