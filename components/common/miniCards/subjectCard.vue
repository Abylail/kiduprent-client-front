<template>
  <nuxt-link class="subject-card" :class="{'subject-card--full': full}" :style="{borderColor: subjectColor}" :to="'/'">

    <div class="subject-card__head">
      <div class="subject-card__name">{{ props.info?.name }}</div>
      <div class="subject-card__center">{{ centerName }}</div>
    </div>

    <div class="subject-card__description">{{ props.info?.description }}</div>

    <div class="subject-card__content">
      <div class="subject-card__photos" v-if="info?.photos?.length"></div>
      <div class="subject-card__info">
        <div class="subject-card__info-item">{{ ageRange }}</div>
        <div class="subject-card__info-item">
          <div class="chip--outlined" v-if="langRu">Рус</div>
          <div class="chip--outlined" v-if="langKz">Каз</div>
        </div>
        <div class="subject-card__info-item">{{ priceRange }}</div>
      </div>
    </div>

<!--    <base-mini-photos class="subject-card__photos" v-if="props.info?.photos" :list="props.info?.photos"/>-->

<!--    &lt;!&ndash; Информация &ndash;&gt;-->
<!--    <div class="subject-card__info">-->
<!--      <div class="subject-card__description">-->
<!--        {{ props.info?.description }}-->
<!--      </div>-->

<!--      <div class="subject-card__price" v-if="priceRange">-->
<!--        <strong class="subject-card__info-title">Цена:</strong>-->
<!--        <span>{{ priceRange }}</span>-->
<!--      </div>-->

<!--      <div class="subject-card__price" v-if="ageRange">-->
<!--        <strong class="subject-card__info-title">Возраст:</strong>-->
<!--        <span>{{ ageRange }}</span>-->
<!--      </div>-->
<!--    </div>-->

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
import BaseMiniPhotos from "../../base/BaseMiniPhotos";

const props = defineProps({
  info: Object,
  full: {
    type: Boolean,
    default: false
  }
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
  return (minPrice === maxPrice ? (minPrice || "") : `${minPrice} - ${maxPrice}`) + ((minPrice || maxPrice) ? " ₸" : "");
})

// Возраст
const ageRange = computed(() => {
  let minAge = null;
  let maxAge = null;
  props.info?.institutionGroups.forEach(group => {
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
const langKz = computed(() => (props.info?.institutionGroups || []).some(group => group.language_kz));

// Рус яз
const langRu = computed(() => (props.info?.institutionGroups || []).some(group => group.language_ru));
</script>

<style lang="scss" scoped>
.subject-card {
  display: inline-flex;
  flex-direction: column;
  min-width: 300px;
  border-radius: 5px;
  overflow: hidden;
  flex: 1;
  background: white;
  color: $color--black;
  padding: $side-space-mobile 0;
  border: 1px solid gray;

  &--full {
    width: 100%;
    max-width: none;
    border: none;
  }

  &__head {
    display: flex;
    align-items: center;
    background-color: white;
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
    margin: 4px 0;
  }

  &__content {
    display: flex;
    padding: 0 $side-space-mobile;
  }

  &__photos {
    background-color: gray;
    height: 120px;
    width: 150px;
    margin-right: 8px;
  }

  &__info {
    flex:1;
    font-size: $fs--mini;
    white-space: normal;
    color: $color--gray-dark;
  }

  &__description {
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

  &__info-title {
    margin-right: 3px;
  }

  &__groups {
    padding: $side-space-mobile;
    border-top: 2px solid white;
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