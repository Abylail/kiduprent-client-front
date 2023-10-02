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
        <span class="trial__select-item__date">{{ weekDay.date }}</span>
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
  </div>

  <select-child-modal v-model:open="openSelectChild"/>
</template>

<script setup>
import MobileHeader from "../../../../../components/common/layoutComponents/mobileHeader";
import {computed} from "vue";
import {useLessonDetailsStore} from "../../../../../store/details/lesson";
import {useRoute} from "nuxt/app";
import LessonGroup from "../../../../../components/common/lesson/lessonGroup";
import {weekdayList} from "../../../../../config/weekdays";
import BaseButton from "../../../../../components/base/BaseButton";
import {useAuthStore} from "../../../../../store/client/parent/auth";
import SelectChildModal from "../../../../../components/common/catalog/selectChildModal";

const route = useRoute();
const lessonId = computed(() => +route.params.id);
const groupId = computed(() => +route.params.groupId);

const lessonDetailsStore = useLessonDetailsStore();
const lessonInfo = computed(() => lessonDetailsStore.getLessonInfo || {});
await lessonDetailsStore.fetchLessonInfo({id: lessonId.value});
const lessonName = computed(() => lessonInfo.value.name);

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
    date: day.getDate(),
    info: weekDay,
    time: groupInfo.value?.[`${weekDay.code}_start`]
  })
})

const authStore = useAuthStore();

const openSelectChild = ref(false);

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

}
</style>