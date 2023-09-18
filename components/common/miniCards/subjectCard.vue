<template>
  <nuxt-link class="subject-card" :class="{'subject-card--full': full}" :to="`/catalog/details/lesson-${subjectId}`">

    <div class="subject-card__head">
      <div class="subject-card__name">{{ props.info?.name }}</div>
      <div class="subject-card__center">{{ centerName }}</div>
    </div>

    <div class="subject-card__description">{{ props.info?.description }}</div>

    <div class="subject-card__content">
      <base-mini-photos class="subject-card__photos" v-if="info?.photos?.length" :list="info.photos"/>
      <div class="subject-card__info">
        <div class="subject-card__info-item">{{ priceRange }}</div>
        <div class="subject-card__info-item">{{ ageRange }}</div>
        <div class="subject-card__info-item">
          <div class="chip--outlined" v-if="langRu">Рус</div>
          <div class="chip--outlined" v-if="langKz">Каз</div>
        </div>
      </div>
    </div>

    <!-- Группы -->
    <div class="subject-card__bottom-block" v-if="props.full && subjectWeekdays.length">
      <div class="subject-card__weekdays-title">В какие дни есть уроки:</div>
      <div class="subject-card__weekdays">
        <div class="subject-card__weekday" v-for="(weekday, windex) in subjectWeekdays" :key="windex">{{ weekday.shortName }}</div>
      </div>
    </div>
  </nuxt-link>
</template>

<script setup>
import {computed} from "vue";
import {weekdayList} from "../../../config/weekdays";
import BaseMiniPhotos from "../../base/BaseMiniPhotos";

const props = defineProps({
  info: Object,
  full: {
    type: Boolean,
    default: false
  }
})

const subjectId = computed(() => props.info?.id)

// Получить время уроков группы
const getGroupTimes = group => weekdayList
    .filter(weekday => group[`${weekday.code}_start`])
    .map(weekday => ({title: weekday.shortName, time: group[`${weekday.code}_start`]}))

const groups = computed(() => props.info?.institutionGroups || []);

const subjectWeekdays = computed(() => weekdayList.filter(weekday => groups.value.some(g => g[`${weekday.code}_start`])))

// Цена
const priceRange = computed(() => {
  let minPrice = null;
  let maxPrice = null;
  groups.value.forEach(group => {
    if (typeof group.price === "number") {
      if (!minPrice || group.price < minPrice) minPrice = group.price;
      if (!maxPrice || group.price > maxPrice) maxPrice = group.price;
    }
  })
  return (minPrice === maxPrice ? (minPrice || "") : `${minPrice} - ${maxPrice}`) + ((minPrice || maxPrice) ? " ₸" : "");
})

// Возраст
const ageRange = computed(() => {
  let minAge = null;
  let maxAge = null;
  groups.value.forEach(group => {
    if (typeof group.price === "number") {
      if (!minAge || group.min_age < minAge) minAge = group.min_age;
      if (!maxAge || group.max_age > maxAge) maxAge = group.max_age;
    }
  })
  return (minAge && `от ${minAge}` || "") + (maxAge && ` до ${maxAge}` || "") + ((minAge || maxAge) ? " лет" : "");
})

// Цвет предмета
const subjectColor = computed(() => props.info?.subject?.color || "#f1f1f1");

// Название центра
const centerName = computed(() => props.info?.institution?.name);

// Каз яз
const langKz = computed(() => groups.value.some(group => group.language_kz));

// Рус яз
const langRu = computed(() => groups.value.some(group => group.language_ru));
</script>

<style lang="scss" scoped>
.subject-card {
  display: inline-flex;
  flex-direction: column;
  min-width: 300px;
  border-radius: 5px;
  overflow: hidden;
  flex: 1;
  color: $color--black;
  padding: $side-space-mobile 0;
  border: 1px solid $color--gray-light;

  &--full {
    width: 100%;
    max-width: none;
    border: none;
    box-shadow: 1px 0px 4px 0px rgba(34, 60, 80, 0.2);
    border-radius: 0;
    background: white;
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 $side-space-mobile;
  }

  &__name {
    font-size: $fs--default;
    font-weight: bold;
  }

  &__center {
    color: $color--blue;
    font-size: $fs--mini;
  }

  &__content {
    display: flex;
    padding: 0 $side-space-mobile;
  }

  &__photos {
    height: 120px;
    width: 150px;
    margin-right: 8px;
    background-color: white;
  }

  &__info {
    flex:1;
    font-size: $fs--mini;
    white-space: normal;
  }

  &__description {
    color: $color--gray-dark;
    padding: 8px $side-space-mobile;
  }

  &__info-item {
    display: flex;
    font-size: $fs--default;
    line-height: $fs--default;

    &:not(:last-child) {
      margin-bottom: 6px;
    }
  }

  &__bottom-block {
    padding: $side-space-mobile $side-space-mobile 0;
    margin-top: $side-space-mobile;
    border-top: 1px solid $color--gray;
  }

  &__weekdays {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    overflow: auto;

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  &__weekday {
    border-radius: 3px;
    padding: 3px 8px;
    margin-right: 5px;
    color: $color--blue;
    background-color: $color--blue-light;
    font-size: $fs--mini;
    text-align: center;
  }

  &__weekdays-title {
    color: $color--gray-dark;
    margin-right: 4px;
    margin-bottom: 8px;
  }
}
</style>