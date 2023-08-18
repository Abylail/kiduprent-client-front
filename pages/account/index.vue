<template>
  <mobile-header title="Личный кабинет"/>
  <div class="account">

    <div class="account__block">
      <personal-data/>
    </div>

    <div class="account__block">
      <div class="title">Мои дети</div>
      <children/>
    </div>

    <div class="account__block">
      <card-list title="Избранные центры" to="/account/favorite?type=centers">
        <center-card
            v-for="(lesson, index) in exampleList" :key="index"
            :info="lesson"
        />
      </card-list>
    </div>

    <div class="account__block">
      <card-list title="Избранные уроки" to="/account/favorite?type=lessons">
        <lesson-card
            v-for="(lesson, index) in exampleList" :key="index"
            :info="lesson"
        />
      </card-list>
    </div>
  </div>
</template>

<script setup>
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
import PersonalData from "../../components/common/account/personalData";
import Children from "../../components/common/account/children";
import CenterCard from "../../components/common/miniCards/centerCard";
import LessonCard from "../../components/common/miniCards/lessonCard";
import CardList from "../../components/common/cardList";

const exampleList = [{}, {}, {}, {}]
</script>

<style lang="scss" scoped>
.account {

  &__block {
    &:first-child {margin-top: 16px}
    margin: 32px 0;
  }

  &__user-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

}
</style>