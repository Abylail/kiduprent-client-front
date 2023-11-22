<template>
  <mobile-header title="Уроки и курсы" go-back="/main"/>
  <switch-type/>
  <base-search-select
      title="Предмет"
      modal-title="Выбор предмета"
      :model-value="activeSubjectCode"
      :items="subjectStore.getList"
      empty-title="Все предметы"
      @update:modelValue="selectSubject($event)"
  />
  <search-map
      v-if="isSearchMap"
      :list="searchLessonStore.getBranches"
      :subject-id="activeSubjectId"
      :loading="isLoading"
  />
  <search-list
      v-else
      :title="searchTitle"
      :list="searchLessonStore.getLessons"
      :pagination="searchLessonStore.getHaveMore"
      :loading="isLoading"
      type="lessons"
      @paginate="search($event)"
  />
  <search-type-switch
      :is-map="isSearchMap"
      @change="toggleSearchType()"
  />
</template>

<script setup>
import MobileHeader from "../../../../../components/common/layoutComponents/mobileHeader";
import {useRoute, useRouter} from "nuxt/app";
import {computed, onMounted, watch} from "vue";
import {useSubjectsStore} from "../../../../../store/subjects";
import SearchList from "../../../../../components/common/search/searchList";
import {useSearchLessonsStore} from "../../../../../store/search/lessons";
import BaseSearchSelect from "../../../../../components/base/BaseSearchSelect";
import SwitchType from "../../../../../components/common/catalog/switchType";
import SearchMap from "../../../../../components/common/search/searchMap";
import Search from "../../../../../components/common/main/search";
import SearchTypeSwitch from "../../../../../components/common/search/searchTypeSwitch";

const router = useRouter();
const route = useRoute();

const isSearchMap = computed(() => route.query.searchType === "map");
const toggleSearchType = () => {
  router.replace({query: {searchType: !isSearchMap.value ? "map" : "list"}})
}

const subjectStore = useSubjectsStore();
await subjectStore.fetchList();

const activeSubjectCode = computed(() => route.params?.subject);
const activeSubjectName = computed(() => subjectStore.getList?.find(subject => subject.code === activeSubjectCode.value)?.name || "Все предметы");
const activeSubjectId = computed(() => subjectStore.getList?.find(subject => subject.code === activeSubjectCode.value)?.id || null);
const searchTitle = computed(() => activeSubjectCode.value ? `${activeSubjectName.value} уроки и курсы для детей Алматы` : "Уроки и курсы для детей Алматы")

useSeoMeta({
  title: () => searchTitle.value,
  ogTitle: () => searchTitle.value,
})

// Перейти ы поиск по предметку
const selectSubject = subjectCode => {
  if (subjectCode) router.replace({params: {subject: subjectCode}, query: route.query});
  else router.replace({path: `/catalog/almaty/lessons`, query: route.query})
}

// Поиск уроков
const searchLessonStore = useSearchLessonsStore();
const isLoading = ref(true);
const search = async (page = 1) => {
  isLoading.value = true;
  if (isSearchMap.value) {
    await searchLessonStore.searchBranches({
      subjectId: activeSubjectId.value
    });
  }
  else {
    await searchLessonStore.searchLessons({
      subjectId: activeSubjectId.value,
      page
    });
  }
  isLoading.value = false;
}

watch(() => isSearchMap.value, () => {
  search()
})
onMounted(() => {
  search();
})
</script>

<style scoped>

</style>