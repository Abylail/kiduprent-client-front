<template>
  <mobile-header>
    <div class="search-head">
      <nuxt-img class="search-head-logo"  src="/logo.svg" alt="logo"/>
      <span>Kidup.kz</span>
    </div>
  </mobile-header>
  <search-filter :type="activeType"/>
  <search-map
      v-if="isSearchMap"
      :list="searchBranchesStore.getBranches"
      :subject-id="activeSubjectId"
      :loading="isLoading"
      :type="activeType"
  />
  <search-list
      v-else
      :title="searchTitle"
      :list="resultList"
      :pagination="isHaveMore"
      :loading="isLoading"
      :type="activeType"
      @paginate="search($event)"
  />
  <search-type-switch
      :is-map="isSearchMap"
      @change="toggleSearchType()"
  />
</template>

<script setup>
import MobileHeader from "../../../../../components/common/layoutComponents/mobileHeader";
import BaseSearchSelect from "../../../../../components/base/BaseSearchSelect";
import {useCategoriesStore} from "../../../../../store/categories";
import {useRoute, useRouter} from "nuxt/app";
import {computed, onMounted, watch} from "vue";
import SearchList from "../../../../../components/common/search/searchList";
import {useSearchCentersStore} from "../../../../../store/search/centers";
import SwitchType from "../../../../../components/common/catalog/switchType";

import {
  categoryCenterCatalogClick,
  paginationCatalogCenters,
} from "../../../../../utlis/analitics";

import SearchTypeSwitch from "../../../../../components/common/search/searchTypeSwitch";
import SearchMap from "../../../../../components/common/search/searchMap";
import SearchFilter from "../../../../../components/common/search/searchFilter";
import {useSubjectsStore} from "../../../../../store/subjects";
import {useSearchLessonsStore} from "../../../../../store/search/lessons";
import {useSearchBranchesStore} from "../../../../../store/search/branches";

const router = useRouter();
const route = useRoute();

const activeType = computed(() => route.params.type);

const isSearchMap = computed(() => route.query.searchType === "map");
const toggleSearchType = () => {
  router.replace({query: {...route.query, searchType: !isSearchMap.value ? "map" : "list"}})
}

const categoryStore = useCategoriesStore();
const subjectStore = useSubjectsStore();
await Promise.all([
  subjectStore.fetchList(),
  categoryStore.fetchList()
])

const activeSubjectCode = computed(() => route.params?.subject);
const activeSubjectName = computed(() => subjectStore.getList?.find(subject => subject.code === activeSubjectCode.value)?.name || "Все предметы");
const activeSubjectId = computed(() => subjectStore.getList?.find(subject => subject.code === activeSubjectCode.value)?.id || null);
const activeCategoryCode = computed(() => route.query?.category || null);
const activeCategoryId = computed(() => categoryStore.getList?.find(category => category.code === activeCategoryCode.value)?.id || null);

const searchTitle = computed(() => {
  if (activeType.value === "centers") return activeSubjectCode.value ? `${activeSubjectName.value} детские центры Алматы` : "Детские центры Алматы"
  else if (activeType.value === "lessons") return activeSubjectCode.value ? `${activeSubjectName.value} уроки и курсы Алматы` : "Уроки и курсы Алматы"
})

useSeoMeta({
  title: () => searchTitle.value,
  ogTitle: () => searchTitle.value,
})

const selectCategory = categoryCode => {
  categoryCenterCatalogClick(categoryCode)
  if (categoryCode) router.replace({params: {category: categoryCode}, query: route.query});
  else router.replace({path: `/catalog/almaty/centers`, query: route.query})
}

// Поиск центров
const searchCentersStore = useSearchCentersStore();
const searchLessonsStore = useSearchLessonsStore();
const searchBranchesStore = useSearchBranchesStore()
const isLoading = ref(true);

const resultList = computed(() => {
  if (activeType.value === 'centers') return searchCentersStore.getCenters
  else if (activeType.value === 'lessons') return searchLessonsStore.getLessons
})

const isHaveMore = computed(() => {
  if (activeType.value === 'centers') return searchCentersStore.getHaveMore
  else if (activeType.value === 'lessons') return searchLessonsStore.getHaveMore
})

const search = async (page = 1) => {
  isLoading.value = true;
  if (isSearchMap.value) {
    await searchBranchesStore.searchBranches({
      subjectId: activeSubjectId.value
    });
  }
  else if (activeType.value === 'centers') {
    await searchCentersStore.searchCenters({
      subjectId: activeSubjectId.value,
      categoryId: activeCategoryId.value,
      page
    });
  }
  else if (activeType.value === 'lessons') {
    await searchLessonsStore.searchLessons({
      subjectId: activeSubjectId.value,
      categoryId: activeCategoryId.value,
      page
    });
  }
  isLoading.value = false;
}

watch(() => isSearchMap.value, () => {
  search()
})

watch(() => route.query, () => {
  search()
})

onMounted(() => {
  console.log("mounted")
  search();
})
</script>
<style lang="scss" scoped>
.search-head {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
}

.search-head-logo {
  height: 50px;
}
</style>