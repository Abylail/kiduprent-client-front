<template>
  <mobile-header title="Выбор расписания" :go-back="backRoute"/>
  <div class="select-time">
    <base-notice text="Выберите расписание которое будем вам удобно в будущем"/>
    <lesson-time-table @select="selectTime($event)"/>
  </div>
</template>

<script setup>
import MobileHeader from "../../../../components/common/layoutComponents/mobileHeader";
import {useRoute, useRouter} from "nuxt/app";
import {computed} from "vue";
import LessonTimeTable from "../../../../components/common/lesson/lessonTimeTable";
import BaseNotice from "../../../../components/base/BaseNotice";
const route = useRoute();
const router = useRouter();

const backRoute = computed(() => `/catalog/lesson/${route.params.id}`)

// Выбрать время
const selectTime = time => {
  router.push(`/catalog/lesson/${route.params.id}/selectChild`);
}
</script>

<style lang="scss" scoped>
.select-time {

  &__description {
    background-color: $color--gray-light;
    padding: 12px;
    border-radius: 5px;
  }

}
</style>