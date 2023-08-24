<template>
  <mobile-header title="Курс от Наши дети" go-back="/main"/>
  <div class="lesson-info">

    <!-- Фотки -->
    <base-slider/>

    <!-- Основная информация -->
    <div class="lesson-info__main">
      <nuxt-link class="lesson-info__main-center" to="/">Наши дети <strong class="lesson-info__main-city">Алматы</strong></nuxt-link>
      <h1 class="lesson-info__main-name title">Робототехника для детей</h1>
      <div class="lesson-info__main-price">60 000 тг/мес</div>
    </div>

    <!-- Характеристики -->
    <div class="lesson-info__properties">
      <div class="lesson-info__properties-time">
        <base-icon class="lesson-info__properties-icon" name="mdi-go-kart-track" size="30"/>
        <span>72 урока</span>
      </div>
      <div class="lesson-info__properties-time">
        <base-icon class="lesson-info__properties-icon" name="mdi-timer-sand-complete" size="30"/>
        <span>90 мин</span>
      </div>
      <div class="lesson-info__properties-time">
        <base-icon class="lesson-info__properties-icon" name="mdi-account-group-outline" size="30"/>
        <span>8 чел</span>
      </div>
    </div>

    <!-- Описании -->
    <div class="lesson-info__description">
      <p class="lesson-info__description-text">Научиться основам программирования, изучить популярные языки и фреймворки теперь доступно для детей и школьников!</p>
      <div class="lesson-info__description-option">Язык обучения: <strong>русский и казахский</strong></div>
      <div class="lesson-info__description-option">Возраст: <strong>с 9 до 16 лет</strong></div>
    </div>

    <!-- Перейти в записаться -->
    <base-go-button title="Записаться на пробный (2000тг)" icon="mdi-text-long" @click="goSelectTime()"/>

    <!-- Расписание -->
    <div class="lesson-info__timetable">
      <h2 class="title">Расписание</h2>
      <lesson-time-table/>
    </div>

    <base-map class="lesson-info__map"/>

    <div class="lesson-info__center-info">
      <h2 class="title">Образовательный центр</h2>
      <center-card full/>
    </div>
  </div>
</template>

<script setup>
import MobileHeader from "~/components/common/layoutComponents/mobileHeader";
import BaseIcon from "~/components/base/BaseIcon";
import BaseGoButton from "~/components/base/BaseGoButton";
import LessonTimeTable from "../../../../components/common/lesson/lessonTimeTable";
import BaseMap from "../../../../components/base/BaseMap";
import CenterCard from "../../../../components/common/miniCards/centerCard";
import {useRoute, useRouter} from "nuxt/app";
import BaseSlider from "../../../../components/base/BaseSlider";

const router = useRouter();
const route = useRoute();
// Перейти в выбор времени
const goSelectTime = () => {
  router.push(`/catalog/lesson/${route.params.id}/selectTime`);
}
</script>

<style lang="scss" scoped>
.lesson-info {

  &__main-center {
    font-size: $fs--mini;
    font-weight: normal;
    line-height: 30px;
    color: $color--black;
  }

  &__main-name {
    font-size: $fs--big-title;
    line-height: 30px;
  }

  &__main-price {
    font-size: $fs--default;
    line-height: 30px;
  }



  &__properties {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;

    & > * {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
  }

  &__properties-icon {
    color: $color--blue;
    margin-right: 5px;
  }

  &__description {
    margin: 20px 0;

    & > * {
      margin: 10px 0;
    }
  }

  &__timetable {
    margin: 30px 0;
  }

  &__map {
    margin: 30px 0;
  }

  &__center-info {
    margin: 30px 0;
  }

}
</style>