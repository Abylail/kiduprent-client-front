<template>
  <nuxt-link class="subject-card" :to="'/'" :style="{borderColor: subjectColor}">
    <div class="subject-card__head" :style="{backgroundColor: subjectColor}">
      <div class="subject-card__name">{{ props.info?.name }}</div>
      <div class="subject-card__center">{{ centerName }}</div>
    </div>

    <!-- Информация -->
    <div class="subject-card__info">
      <div class="subject-card__description">
        {{ props.info?.description }}
      </div>

      <div class="subject-card__price" v-if="priceRange">
        <strong class="subject-card__info-title">Цена:</strong>
        <span>{{ priceRange }}</span>
      </div>

      <div class="subject-card__price" v-if="ageRange">
        <strong class="subject-card__info-title">Возраст:</strong>
        <span>{{ ageRange }}</span>
      </div>
    </div>

    <!-- Группы -->
<!--    <div class="subject-card__groups" :style="{borderColor: subjectColor}">-->
<!--      <div class="subject-card__group" v-for="(group, index) in groups" :key="index">-->
<!--         <div class="subject-card__group-weekday"-->
<!--              v-for="(weekday, windex) in getGroupTimes(group)" :key="windex"-->
<!--         >{{ weekday.title }} {{ weekday.time }}</div>-->
<!--      </div>-->
<!--    </div>-->
  </nuxt-link>
</template>

<script setup>
import {computed} from "vue";
import {weekdayList} from "../../../config/weekdays";

const props = defineProps({
  info: Object
})

// Получить время уроков группы
const getGroupTimes = group => weekdayList
    .filter(weekday => group[`${weekday.code}_start`])
    .map(weekday => ({title: weekday.shortName, time: group[`${weekday.code}_start`]}))

// Скольлько групп показать изначально
const GroupCountLimit = 2;
const showAllGroups = ref(false);
const groups = computed(() => props.info?.institutionGroups || []);

// Цена
const priceRange = computed(() => {
  let minPrice = null;
  let maxPrice = null;
  (props.info?.institutionGroups || []).forEach(group => {
    if (typeof group.price === "number") {
      if (!minPrice || group.price < minPrice) minPrice = group.price;
      if (!maxPrice || group.price > maxPrice) maxPrice = group.price;
    }
  })
  return minPrice === maxPrice ? minPrice : `${minPrice} - ${maxPrice}`;
})

// Цена
const ageRange = computed(() => {
  let minAge = null;
  let maxAge = null;
  (props.info?.institutionGroups || []).forEach(group => {
    if (typeof group.price === "number") {
      if (!minAge || group.min_age < minAge) minAge = group.min_age;
      if (!maxAge || group.max_age > maxAge) maxAge = group.max_age;
    }
  })
  return (minAge && `от ${minAge}` || "") + (maxAge && ` до ${maxAge}` || "");
})

// Цвет предмета
const subjectColor = computed(() => props.info?.subject?.color || "#f1f1f1");

// Название центра
const centerName = computed(() => props.info?.institution?.name);
</script>

<style lang="scss" scoped>
.subject-card {
  display: inline-flex;
  flex-direction: column;
  min-width: 250px;
  width: 250px;
  border-radius: 5px;
  overflow: hidden;
  flex: 1;
  //background: $color--gray-light;
  border: 2px solid $color--gray-light;
  color: $color--black;

  &__head {
    background-color: $color--gray-light;
    color: white;
    padding: 8px;
  }

  &__name {
    font-size: $fs--title;
    font-weight: bold;
  }

  &__info {
    margin: 8px;
    font-size: $fs--default;
    white-space: normal;

    & > * {
      margin: 4px 0;
    }
  }

  &__info-title {
    margin-right: 3px;
  }

  &__groups {
    padding: 10px;
    border-top: 2px solid $color--gray-light;
  }

  &__group {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow: auto;

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  &__group-weekday {
    border-radius: 3px;
    padding: 2px 4px;
    margin-right: 5px;
    color: $color--gray-light;
    background-color: $color--blue-light;
    font-size: $fs--mini;
  }
}
</style>