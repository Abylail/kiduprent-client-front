<template>
  <mobile-header title="Детские центры" go-back="/main"/>
  <switch-type/>
  <base-search-select
      title="Категория"
      modal-title="Выбор категории"
      :model-value="activeCategoryCode"
      :items="categoryStore.getList"
      empty-title="Все категории"
      icon-field="icon_mdi"
      @update:modelValue="selectCategory($event)"
  />
  <search-map
      v-if="isSearchMap"
      :list="searchCentersStore.getBranches"
      :category-id="activeCategoryId"
      :loading="isLoading"
      type="centers"
  />
  <search-list
      v-else
      :title="searchTitle"
      :list="searchCentersStore.getCenters"
      :pagination="searchCentersStore.getHaveMore"
      :loading="isLoading"
      type="centers"
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

const router = useRouter();
const route = useRoute();

const isSearchMap = computed(() => route.query.searchType === "map");
const toggleSearchType = () => {
  router.replace({query: {searchType: !isSearchMap.value ? "map" : "list"}})
}

const categoryStore = useCategoriesStore();
await categoryStore.fetchList();

const activeCategoryCode = computed(() => route.params?.category);
const activeCategoryId = computed(() => categoryStore.getList?.find(category => category.code === activeCategoryCode.value)?.id || undefined);
const activeCategoryName = computed(() => categoryStore.getList?.find(category => category.code === activeCategoryCode.value)?.name || null);

const searchTitle = computed(() => activeCategoryCode.value ? `\"${activeCategoryName.value}\" центры Алматы` : "Детские центры Алматы")

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
const isLoading = ref(true);
const search = async (page = 1) => {
  isLoading.value = true;
  if (isSearchMap.value) {
    await searchCentersStore.searchBranches({
      categoryId: activeCategoryId.value
    });
  }
  else {
    await searchCentersStore.searchCenters({
      categoryId: activeCategoryId.value,
      page
    });
  }
  if (page > 1) paginationCatalogCenters()
  isLoading.value = false;
}

watch(() => isSearchMap.value, () => {
  search()
})

onMounted(() => {
  search();
})
</script>