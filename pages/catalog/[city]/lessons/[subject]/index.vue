<template>
  <mobile-header title="Уроки и курсы" go-back="/catalog/almaty"/>
  <search-select-subject :subject="activeSubjectCode" @update:subject="selectSubject($event)"/>
  <search-list :title="searchTitle" :list="searchLessonStore.getLessons" type="lessons"/>
</template>

<script setup>
import MobileHeader from "../../../../../components/common/layoutComponents/mobileHeader";
import SearchSelectSubject from "../../../../../components/common/search/searchSelectSubject";
import {useRoute, useRouter} from "nuxt/app";
import {computed, onMounted} from "vue";
import {useSubjectsStore} from "../../../../../store/subjects";
import SearchList from "../../../../../components/common/search/searchList";
import {useSearchLessonsStore} from "../../../../../store/search/lessons";

const subjectStore = useSubjectsStore();

const route = useRoute();
const activeSubjectCode = computed(() => route.params?.subject);
const activeSubjectName = computed(() => subjectStore.getList?.find(subject => subject.code === activeSubjectCode.value)?.name || "Все предметы");
const activeSubjectId = computed(() => subjectStore.getList?.find(subject => subject.code === activeSubjectCode.value)?.id || null);
const searchTitle = computed(() => `${activeSubjectName.value} уроки и курсы для детей Алматы`)

// Перейти ы поиск по предметку
const router = useRouter();
const selectSubject = subjectCode => {
  router.push(`/catalog/almaty/lessons/${subjectCode}`);
}

// Поиск уроков
const searchLessonStore = useSearchLessonsStore();
const isLoading = ref(true);
const search = async () => {
  isLoading.value = true;
  await searchLessonStore.searchLessons({
    subjectId: activeSubjectId.value
  });
  console.log(activeSubjectId.value);
  console.log("getLessons", searchLessonStore.getLessons);
  isLoading.value = false;
}

onMounted(() => {
  search();
})
</script>

<style scoped>

</style>