<template>
  <mobile-header
      :title="lessonName"
      go-back="/catalog/almaty/lessons"
  />

  <div class="lesson-info">
    <base-mini-photos
        class="lesson-info__photos"
        v-if="photos"
        :list="photos"
        :rounded="false"
    />

    <div class="lesson-info__main container--white">
      <h1 class="lesson-info__title">{{ lessonName }}</h1>

      <p class="lesson-info__description">
        <span>{{ price.short }}</span>
        <span class="lesson-info__description-divider"/>
        <span>{{ age.range }}</span>
        <span class="lesson-info__description-divider"/>
        <span v-if="language.ru">Рус</span>
        <span class="lesson-info__description-divider"/>
        <span v-if="language.ru">Каз</span>
      </p>

      <p class="lesson-info__description">{{ lessonDescription }}</p>
    </div>

    <center-card class="lesson-info__center-info" :info="institutionInfo" full/>
  </div>
</template>

<script setup>
import {useLessonDetailsStore} from "../../../../store/details/lesson";
import {useRoute} from "nuxt/app";
import MobileHeader from "../../../../components/common/layoutComponents/mobileHeader";
import {computed} from "vue";
import BaseMiniPhotos from "../../../../components/base/BaseMiniPhotos";
import CenterCard from "../../../../components/common/miniCards/centerCard";

const route = useRoute();
const lessonDetailsStore = useLessonDetailsStore();
await lessonDetailsStore.fetchLessonInfo({id: route.params.id});

// Информация центра
const lessonName = computed(() => lessonDetailsStore.getLessonInfo.name)
const lessonDescription = computed(() => lessonDetailsStore.getLessonInfo.description)
const photos = computed(() => lessonDetailsStore.getLessonInfo.photos)
const groups = computed(() => lessonDetailsStore.getLessonInfo.institutionGroups || []);

const institutionInfo = computed(() => lessonDetailsStore.getLessonInfo.institution)

// Цена {min, max}
const price = computed(() => {
  let minPrice = null;
  let maxPrice = null;
  groups.value.forEach(group => {
    if (typeof group.price === "number") {
      if (!minPrice || group.price < minPrice) minPrice = group.price;
      if (!maxPrice || group.price > maxPrice) maxPrice = group.price;
    }
  })
  return {
    max: maxPrice,
    min: minPrice,
    short: (minPrice === maxPrice ? minPrice : `от ${minPrice}`) +"₸",
    range: (minPrice === maxPrice ? (minPrice || "") : `${minPrice} - ${maxPrice}`) + ((minPrice || maxPrice) ? " ₸" : "")
  };
})

// Возраст
const age = computed(() => {
  let minAge = 100;
  let maxAge = null;
  groups.value.forEach(group => {
    if (typeof group.min_age === "number" && (!group.min_age || group.min_age < minAge)) minAge = group.min_age;
    if (typeof group.min_age === "number" && group.max_age > maxAge) maxAge = group.max_age;
  })
  return {
    min: minAge,
    max: maxAge,
    range: (minAge && `${minAge}` || "") + (maxAge && ` - ${maxAge}` || "") + ((minAge || maxAge) ? " лет" : "")
  }
})

// Язык
const language = computed(() => ({
  kz: groups.value.some(group => group.language_kz),
  ru: groups.value.some(group => group.language_ru),
}))
</script>

<style lang="scss" scoped>
.lesson-info {

  &__photos {
    height: 80vw;
    max-height: 400px;
    background-color: white;
  }

  &__main {

  }

  &__title {
    font-size: $fs--title;
  }

  &__description {
    display: flex;
    align-items: center;
    color: $color--black;
    font-size: $fs--default;
    font-weight: normal;
    margin-top: 8px;
  }

  &__description-divider {
    display: inline-block;
    height: 5px;
    width: 5px;
    border-radius: 100%;
    background: $color--black;
    content: "";
    margin: 0 8px;
  }

  &__center-info {
    margin: 16px 0;
  }

}
</style>