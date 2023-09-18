<template>
  <mobile-header
      title="Урок"
      go-back="/catalog/almaty/lessons"
  />
  <div class="lesson-info">
    lesson-info
  </div>
</template>

<script setup>
import {useLessonDetailsStore} from "../../../../store/details/lesson";
import {useRoute} from "nuxt/app";
import MobileHeader from "../../../../components/common/layoutComponents/mobileHeader";

const isLoading = ref(false);

const route = useRoute();
const lessonDetailsStore = useLessonDetailsStore();
await lessonDetailsStore.fetchLessonMainInfo({id: route.params.id});
</script>

<style scoped>

</style>