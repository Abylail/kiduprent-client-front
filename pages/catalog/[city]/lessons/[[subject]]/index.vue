<template>
  <mobile-header title="Уроки и курсы" go-back="/catalog/almaty"/>
  <base-search-select
      title="Предмет"
      modal-title="Выбор предмета"
      :model-value="activeSubjectCode"
      :items="subjectStore.getList"
      empty-title="Все предметы"
      @update:modelValue="selectSubject($event)"
  />
  <search-list
      :title="searchTitle"
      :list="searchLessonStore.getLessons"
      :pagination="searchLessonStore.getHaveMore"
      :loading="isLoading"
      type="lessons"
      @paginate="search($event)"
  />
</template>

<script setup>
import MobileHeader from "../../../../../components/common/layoutComponents/mobileHeader";
import {useRoute, useRouter} from "nuxt/app";
import {computed, onMounted} from "vue";
import {useSubjectsStore} from "../../../../../store/subjects";
import SearchList from "../../../../../components/common/search/searchList";
import {useSearchLessonsStore} from "../../../../../store/search/lessons";
import BaseSearchSelect from "../../../../../components/base/BaseSearchSelect";

const subjectStore = useSubjectsStore();
await subjectStore.fetchList();

const route = useRoute();
const activeSubjectCode = computed(() => route.params?.subject);
const activeSubjectName = computed(() => subjectStore.getList?.find(subject => subject.code === activeSubjectCode.value)?.name || "Все предметы");
const activeSubjectId = computed(() => subjectStore.getList?.find(subject => subject.code === activeSubjectCode.value)?.id || null);
const searchTitle = computed(() => activeSubjectCode.value ? `${activeSubjectName.value} уроки и курсы для детей Алматы` : "Уроки и курсы для детей Алматы")

useSeoMeta({
  title: () => searchTitle.value,
  ogTitle: () => searchTitle.value,
})

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
    subjectId: activeSubjectId.value,
    page
  });
  isLoading.value = false;
}

onMounted(() => {
  search();
})
</script>

<style scoped>

</style>