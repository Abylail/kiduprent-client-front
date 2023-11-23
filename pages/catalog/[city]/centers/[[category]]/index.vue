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
  <search-list
      :title="searchTitle"
      :list="searchCentersStore.getCenters"
      :pagination="searchCentersStore.getHaveMore"
      :loading="isLoading"
      type="centers"
      @paginate="search($event)"
  />
</template>

<script setup>
import MobileHeader from "../../../../../components/common/layoutComponents/mobileHeader";
import BaseSearchSelect from "../../../../../components/base/BaseSearchSelect";
import {useCategoriesStore} from "../../../../../store/categories";
import {useRoute, useRouter} from "nuxt/app";
import {computed, onMounted} from "vue";
import SearchList from "../../../../../components/common/search/searchList";
import {useSearchCentersStore} from "../../../../../store/search/centers";
import SwitchType from "../../../../../components/common/catalog/switchType";

import {
  categoryCenterCatalogClick,
  paginationCatalogCenters,
} from "../../../../../utlis/analitics";

const categoryStore = useCategoriesStore();
await categoryStore.fetchList();

const route = useRoute();
const activeCategoryCode = computed(() => route.params?.category);
const activeCategoryId = computed(() => categoryStore.getList?.find(category => category.code === activeCategoryCode.value)?.id || undefined);
const activeCategoryName = computed(() => categoryStore.getList?.find(category => category.code === activeCategoryCode.value)?.name || null);

const searchTitle = computed(() => activeCategoryCode.value ? `\"${activeCategoryName.value}\" центры Алматы` : "Детские центры Алматы")

useSeoMeta({
  title: () => searchTitle.value,
  ogTitle: () => searchTitle.value,
})

const router = useRouter();
const selectCategory = categoryCode => {
  categoryCenterCatalogClick(categoryCode)
  if (categoryCode) router.replace(`/catalog/almaty/centers/${categoryCode}`);
  else router.replace(`/catalog/almaty/centers`)
}

// Поиск центров
const searchCentersStore = useSearchCentersStore();
const isLoading = ref(true);
const search = async (page = 1) => {
  isLoading.value = true;
  await searchCentersStore.searchCenters({
    categoryId: activeCategoryId.value,
    page
  });
  if (page > 1) paginationCatalogCenters()
  isLoading.value = false;
}

onMounted(() => {
  search();
})
</script>