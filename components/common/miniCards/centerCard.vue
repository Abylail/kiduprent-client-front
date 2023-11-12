<template>
  <nuxt-link class="center-card" :class="{'center-card--full': props.full}" :to="`/catalog/details/center-${info.id}`">

    <div class="center-card__head">
      <div>
        <nuxt-img class="center-card__logo" v-if="logoUrl" :src="logoUrl" alt="logo" quality="70" loading="lazy"/>
        <div class="center-card__name">{{ info.name }}</div>
      </div>
      <div>
        <span class="center-card__rating-text">{{ info.rating }}</span>
        <base-icon class="center-card__rating-icon" name="mdi-star"/>
      </div>
    </div>

    <div class="center-card__description">{{ info.description }}</div>

    <!-- Время работы -->
    <div class="center-card__info" v-if="workTime">
      <base-icon class="center-card__info-icon" name="mdi-clock-time-eight-outline" size="20"/>
      <span class="center-card__info-text">{{ workTime }}</span>
    </div>

    <div class="center-card__subjects">
      <span class="center-card__subject" v-for="(subjectName, index) in subjectNames" :key="index">{{ subjectName }}</span>
    </div>

  </nuxt-link>
</template>

<script setup>
import BaseIcon from "../../base/BaseIcon";
import {computed} from "vue";
import {useRuntimeConfig} from "nuxt/app";

const config = useRuntimeConfig();

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

// Ссылка на лого
const logoUrl = computed(() => props.info?.logo && (config.public.CDN_URL + props.info?.logo) || null);

// Список предметов
const subjects = computed(() => (props.info?.institutionSubjects || []));
const subjectNames = computed(() => subjects.value.map(({name}, index) => name + (index + 1 < subjects.value.length ? ", " : "")));

// Время работы
const workTime = computed(() => props.info.end_time && props.info.start_time && `${props.info.start_time}-${props.info.end_time}` || null)
</script>

<style lang="scss" scoped>
.center-card {
  display: inline-flex;
  flex-direction: column;
  min-width: 300px;
  border-radius: 5px;
  overflow: hidden;
  flex: 1;
  color: $color--black;
  padding: $side-space-mobile 0;
  border: 1px solid $color--gray-light;
  max-width: 500px;

  &--full {
    display: flex;
    width: 100%;
    max-width: none;
    background-color: white;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 $side-space-mobile;
    height: 40px;
    & > * {
      display: flex;
      align-items: center;
    }
  }

  &__logo {
    width: 32px;
    height: 32px;
    background: white;
    padding: 4px;
    border-right: 60px;
    margin-right: 6px;
    border-radius: 32px;
  }

  &__name {
    font-weight: bold;
  }

  &__rating-text {
    font-size: $fs--mini;
  }

  &__rating-icon {
    color: $color--yellow;
  }

  &__description {
    color: $color--gray-dark;
    margin: 8px 0;
    padding: 0 $side-space-mobile;
  }

  &__subjects {
    display: flex;
    flex-wrap: wrap;
    margin: 8px 0;
    padding: 0 $side-space-mobile;
    font-size: $fs--mini;

    & > * {
      white-space: nowrap;
    }
  }

  &__info {
    display: flex;
    align-items: center;
    margin: 8px 0;
    padding: 0 $side-space-mobile;
  }

  &__info-icon {
    color: $color--blue;
    margin-right: 4px;
  }

  &__info-text {
    font-size: $fs--mini;
  }

}
</style>