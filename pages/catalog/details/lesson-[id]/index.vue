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

    <div class="lesson-info__timetable container--white">
      <h3 class="lesson-info__title">Расписание групп</h3>
      <lesson-group
          v-for="group in groups"
          :info="group"
          selectable
          @select="selectGroupHandle(group)"
      />
    </div>

    <!-- Контакты -->
    <div class="lesson-info__contacts container--white">
      <h3 class="lesson-info__title">Контакты</h3>
      <lesson-contacts
          :groups="groups"
          :institution-info="institutionInfo"
      />
    </div>

    <center-card
        class="lesson-info__center-info"
        v-if="institutionInfo"
        :info="institutionInfo"
        full
    />
  </div>
</template>

<script setup>
import {useLessonDetailsStore} from "../../../../store/details/lesson";
import {useRoute, useRouter} from "nuxt/app";
import MobileHeader from "../../../../components/common/layoutComponents/mobileHeader";
import {computed, onMounted} from "vue";
import BaseMiniPhotos from "../../../../components/base/BaseMiniPhotos";
import CenterCard from "../../../../components/common/miniCards/centerCard";
import {useCenterDetailsStore} from "../../../../store/details/center";
import LessonGroup from "../../../../components/common/lesson/lessonGroup";
import LessonContacts from "../../../../components/common/lesson/lessonContacts";

const router = useRouter();
const route = useRoute();
const lessonDetailsStore = useLessonDetailsStore();
const lessonId = computed(() => +route.params.id);
const lessonInfo = computed(() => lessonDetailsStore.getLessonInfo || {});
await lessonDetailsStore.fetchLessonInfo({id: lessonId.value});

const centerDetailsStore = useCenterDetailsStore();
const isCenterLoading = ref(true);
const institutionInfo = computed(() => centerDetailsStore.getCenterInfo)
const fetchCenterInfo = async () => {
  isCenterLoading.value = true;
  await centerDetailsStore.fetchCenterInfo({id: lessonInfo.value.institution_id})
  isCenterLoading.value = false;
}

// Информация центра
const lessonName = computed(() => lessonInfo.value.name)
const lessonDescription = computed(() => lessonInfo.value.description)
const photos = computed(() => lessonInfo.value.photos)
const groups = computed(() => lessonInfo.value.institutionGroups || []);

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

const selectGroupHandle = group => {
  router.push(`/catalog/details/lesson-${lessonId.value}/group-${group.id}`)
}

onMounted(() => {
  fetchCenterInfo();
})
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
    margin-bottom: 8px;
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
    background: #222222b0;
    content: "";
    margin: 0 8px;
  }

  &__timetable {
    margin: 16px 0;
  }

  &__center-info {
    margin: 16px 0;
  }

}
</style>