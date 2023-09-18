<template>
  <mobile-header title="Уроки и курсы" go-back="/catalog/almaty"/>
  <search-select-subject  @update:subject="selectSubject($event)"/>
  <search-list
      title="Уроки и курсы для детей Алматы"
      :list="searchLessonStore.getLessons"
      :pagination="searchLessonStore.getHaveMore"
      :loading="isLoading"
      type="lessons"
      @paginate="search($event)"
  />
</template>

<script setup>
import MobileHeader from "../../../../components/common/layoutComponents/mobileHeader";
import SearchSelectSubject from "../../../../components/common/search/searchSelectSubject";
import {useRouter} from "nuxt/app";
import SearchList from "../../../../components/common/search/searchList";
import {useSearchLessonsStore} from "../../../../store/search/lessons";
import {onMounted} from "vue";

// Перейти ы поиск по предметку
const router = useRouter();
const selectSubject = subjectCode => {
  if (subjectCode) router.push(`/catalog/almaty/lessons/${subjectCode}`);
  else router.push(`/catalog/almaty/lessons`)
}

// Поиск уроков
const searchLessonStore = useSearchLessonsStore();
const isLoading = ref(true);
const search = async (page = 1) => {
  isLoading.value = true;
  await searchLessonStore.searchLessons({
    page
  });
  isLoading.value = false;
}

onMounted(() => {
  search();
})
</script>