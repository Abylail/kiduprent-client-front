<template>
  <mobile-header title="Наши дети" go-back="/main"/>
  <div class="center-info">

    <!-- Фотки -->
    <base-media/>

    <!-- Основная информация -->
    <div class="center-info__main">
      <h1 class="center-info__main-name title">Наши дети</h1>
      <div class="center-info__main-price">ул. Макатаева, 117 (уг. ул. Масанчи)</div>
    </div>

    <div class="center-info__properties">
      <div class="center-info__properties-time">
        <base-icon class="center-info__properties-icon" name="mdi-star-outline" size="30"/>
        <span>4.9</span>
      </div>
      <div class="center-info__properties-time">
        <base-icon class="center-info__properties-icon" name="mdi-clock-time-eight-outline" size="30"/>
        <span>2 года</span>
      </div>
      <div class="center-info__properties-time">
        <base-icon class="center-info__properties-icon" name="mdi-book-multiple" size="30"/>
        <span>22 урока</span>
      </div>
    </div>

    <!-- Описании -->
    <div class="center-info__description">
      <p class="center-info__description-text">
        Первая школа программирования KnewIT в Казахстане предлагает вам курсы для любого уровня подготовки по популярным IT направлениям.
        <br/>
        90 дней обучения позволят вам освоить выбранный язык программирования, разобрать реальные кейсы, а также применить знания на практике, выполняя собственные проекты.
      </p>
      <div class="center-info__description-option">Адрес: <strong>ул. Макатаева, 117 (уг. ул. Масанчи)</strong></div>
      <div class="center-info__description-option">Контакты: <strong>+7 (705) 670 78 91</strong></div>
    </div>

    <div class="center-info__map">
      <base-map/>
    </div>

    <!-- Уроки -->
    <div class="center-info__lessons">

      <card-list title="Математика">
        <lesson-card
            v-for="(lesson, index) in lessonsExample" :key="index"
            :info="lesson"
        />
      </card-list>

      <card-list title="Программирование">
        <lesson-card
            v-for="(lesson, index) in lessonsExample" :key="index"
            :info="lesson"
        />
      </card-list>

      <card-list title="Робототехника">
        <lesson-card
            v-for="(lesson, index) in lessonsExample" :key="index"
            :info="lesson"
        />
      </card-list>

    </div>

  </div>
</template>

<script setup>
import MobileHeader from "../../../components/common/layoutComponents/mobileHeader";
import BaseMedia from "../../../components/base/BaseMedia";
import CardList from "../../../components/common/cardList";
import LessonCard from "../../../components/common/miniCards/lessonCard";
import BaseMap from "../../../components/base/BaseMap";
import BaseIcon from "../../../components/base/BaseIcon";

const lessonsExample = [{}, {}, {}]
</script>

<style lang="scss" scoped>
.center-info {

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

  &__description {
    margin: 20px 0;

    & > * {
      margin: 10px 0;
    }
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
}
</style>