<template>
  <mobile-header
      title="Запись на пробный"
      :go-back="`/catalog/details/lesson-${lessonId}`"
  />
  <lesson-group
      class="container--white"
      :info="groupInfo"
  />

  <div class="trial container--white">
    <h3 class="trial__title">Выберите дату пробного</h3>
    <div class="trial__select">
      <div
          class="trial__select-item"
          :class="[{'trial__select-item--disabled': !weekDay.time}, {'trial__select-item--selected': weekDay.code === selectedDay?.code}]"
          v-for="(weekDay, index) in week" :key="index"
          @click="selectDayHandle(weekDay)"
      >
        <span class="trial__select-item__name">{{ weekDay.info.shortName }}</span>
        <span class="trial__select-item__date">{{ weekDay.dateNumber }}</span>
        <span class="trial__select-item__time">{{ weekDay.time }}</span>
      </div>
    </div>
  </div>

  <div class="container trial__action">
    <base-button
        :disabled="!selectedDay"
        full-width
        @click="submitHandle()"
    >Записаться</base-button>

    <a class="trial__help" href="https://wa.me/77752273768?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A3%20%D0%BC%D0%B5%D0%BD%D1%8F%20%D0%B2%D0%BE%D0%B7%D0%BD%D0%B8%D0%BA%D0%BB%D0%B0%20%D0%BE%D1%88%D0%B8%D0%B1%D0%BA%D0%B0%20...">Служба поддержки</a>
  </div>

  <select-child-modal v-model:open="openSelectChild" @select="selectChild($event)"/>
  <success-lesson-book
      v-model:open="openSuccessModal"
      :group="groupInfo"
      :lesson="lessonInfo"
      :day="selectedDay"
      @onClose="successModalClose()"
  />
</template>

<script setup>
import MobileHeader from "../../../../../components/common/layoutComponents/mobileHeader";
import {computed} from "vue";
import {useLessonDetailsStore} from "../../../../../store/details/lesson";
import {useRoute} from "nuxt/app";
import LessonGroup from "../../../../../components/common/lesson/lessonGroup";
import {weekdayList} from "../../../../../config/weekdays";
import BaseButton from "../../../../../components/base/BaseButton";
import SelectChildModal from "../../../../../components/common/catalog/selectChildModal";
import SuccessLessonBook from "../../../../../components/common/catalog/successLessonBook";
import {useParentRegistration} from "../../../../../store/client/parent/registration";
const { $goBack } = useNuxtApp();

const route = useRoute();
const lessonId = computed(() => +route.params.id);
const groupId = computed(() => +route.params.groupId);

const lessonDetailsStore = useLessonDetailsStore();
const lessonInfo = computed(() => lessonDetailsStore.getLessonInfo || {});
await lessonDetailsStore.fetchLessonInfo({id: lessonId.value});
const lessonName = computed(() => lessonInfo.value.name);

useSeoMeta({
  title: () => `Запись на пробный - ${lessonName.value}`,
  ogTitle: () => `Запись на пробный - ${lessonName.value}`,
})

const groupInfo = computed(() => lessonInfo.value?.institutionGroups?.find(g => g.id === groupId.value));

const selectedDay = ref(null);
const selectDayHandle = (day) => {
  if (!day.time) return;
  selectedDay.value = day;
}

const week = Array(7).fill(null).map((_, index) => {
  let day = new Date();
  day.setDate(day.getDate() + 1 + index);
  const weekDay = weekdayList[day.getDay()]
  return ({
    code: weekDay.code,
    date: day,
    dateNumber: day.getDate(),
    info: weekDay,
    time: groupInfo?.value?.[`${weekDay.code}_start`]
  })
})

const parentRegistrationStore = useParentRegistration();
const openSelectChild = ref(false);
const openSuccessModal = ref(false);
let selectedChild = null;
const selectChild = async child => {
  selectedChild = child;
  await parentRegistrationStore.registrationOnTrial({
    date: selectedDay.value.date,
    child_id: selectedChild.id,
    institution_group_id: groupId.value,
    weekday: selectedDay.value.info.code,
    time: selectedDay.value.time,
  })
  openSuccessModal.value = true;
}
const successModalClose = () => {
  $goBack(`/catalog/details/lesson-${lessonId.value}`)
}

// Записаться (кнопка)
const submitHandle = () => {
  openSelectChild.value = true;
}
</script>

<style lang="scss" scoped>
.trial {

  &__title {
    font-size: $fs--title;
    margin-bottom: 16px;
  }

  &__select {
    display: flex;
  }

  &__select-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px;
    border-radius: 5px;
    //&:not(:last-child) {border-right: 1px solid $color--gray;}

    &__name {
      font-weight: bold;
      color: $color--red;
    }

    &__date {
      font-size: $fs--title;
    }

    &__time {
      font-weight: bold;
      font-size: $fs--mini;
    }

    &--disabled {
      opacity: .6;
      pointer-events: none;
      * {color: $color--gray !important;}
    }

    &--selected {
      background-color: $color--blue;
      * {color: white !important;}
    }
  }

  &__action {
    margin-top: 16px;
  }

  &__help {
    display: block;
    text-align: center;
    color: $color--blue;
    margin-top: 64px;
  }

}
</style>