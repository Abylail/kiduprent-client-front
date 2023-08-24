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
  padding: 0 $side-space-mobile;

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