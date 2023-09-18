<template>
  <nuxt-link class="lesson-card" :class="{'lesson-card--full': props.full}" :to="`/catalog/details/lesson-${lessonId}`">
    <div class="lesson-card__head">
      Программирование для детей
    </div>
    <div class="lesson-card__content">
      <div class="lesson-card__rating">
        <base-icon class="lesson-card__icon" name="mdi-star-outline"/>
        <span>4.9</span>
      </div>
      <div class="lesson-card__count">
        <base-icon class="lesson-card__icon" name="mdi-account-group-outline"/>
        <span>8 чел</span>
      </div>
      <div class="lesson-card__lang">
        рус/каз
      </div>
    </div>
    <div class="lesson-card__extra-info">
      <div class="lesson-card__center-name">KnewIT Алматы</div>
      <div class="lesson-card__center-name">ул. Макатаев, 117</div>
    </div>
  </nuxt-link>
</template>

<script setup>
import BaseIcon from "../../base/BaseIcon";
import {computed} from "vue";

const props = defineProps({
  full: {
    type: Boolean,
    default: false
  },
  info: {
    type: Object,
    default: () => ({})
  }
})

const lessonId = computed(() => props.info?.id)
</script>

<style lang="scss" scoped>
.lesson-card {
  display: inline-flex;
  flex-direction: column;
  min-width: 150px;
  max-width: 200px;
  border-radius: 5px;
  overflow: hidden;
  flex: 1;
  background: $color--gray-light;
  color: $color--black;

  &--full {
    display: flex;
    width: 100%;
    max-width: none;
  }

  &__head {
    white-space: normal;
    background: #E55733;
    color: white;
    padding: 8px;
  }

  &__content {
    display: flex;
    align-items: center;
    padding: 8px;
    border-bottom: 1px solid $color--gray;
    font-size: $fs--mini;

    & > * {
      display: flex;
      align-items: center;
      line-height: 20px;
    }

    & > *:not(:last-child) {
      margin-right: 10px;
    }
  }

  &__extra-info {
    padding: 8px;
    font-size: $fs--mini;
  }

  &__icon {
    margin-right: 4px;
  }

}
</style>