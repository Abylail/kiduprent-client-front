<template>
  <mobile-header title="Главная kidup"/>
  <div class="main">
    <base-media/>

    <category-list :categories="mainStore.getCategories"/>

    <card-list title="Интересные" to="/catalog">
      <lesson-card
          v-for="(lesson, index) in mainStore.getInterestingLessons" :key="index"
          :info="lesson"
      />
    </card-list>

    <card-list title="Центры около вас" to="/catalog">
      <center-card
          v-for="(center, index) in exampleList" :key="index"
          :info="center"
      />
    </card-list>

    <card-list title="Популярные" to="/catalog">
      <lesson-card
          v-for="(lesson, index) in exampleList" :key="index"
          :info="lesson"
      />
    </card-list>

    <card-list title="Развитие ребенка" to="/catalog">
      <center-card
          v-for="(center, index) in exampleList" :key="index"
          :info="center"
      />
    </card-list>

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

const mainStore = useMainStore();

// Запрашиваю инетересные уроки
mainStore.fetchMainLists();
mainStore.fetchCategories();

// Пустой лист для примера
const exampleList = [{}, {}, {}, {}, {}];
</script>

<style scoped>

</style>