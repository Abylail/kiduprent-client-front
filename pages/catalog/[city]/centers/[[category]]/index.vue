<template>
  <mobile-header title="Детские центры" go-back="/catalog/almaty"/>
  <base-search-select
      title="Категория"
      modal-title="Выбор категории"
      :model-value="activeCategoryCode"
      :items="categoryStore.getList"
      empty-title="Все категории"
      @update:modelValue="selectCategory($event)"
  />
</template>

<script setup>
import MobileHeader from "../../../../../components/common/layoutComponents/mobileHeader";
import BaseSearchSelect from "../../../../../components/base/BaseSearchSelect";
import {useCategoriesStore} from "../../../../../store/categories";
import {useRoute, useRouter} from "nuxt/app";
import {computed} from "vue";

const categoryStore = useCategoriesStore();

const route = useRoute();
const activeCategoryCode = computed(() => route.params?.category);

const router = useRouter();
const selectCategory = subjectCode => {
  if (subjectCode) router.push(`/catalog/almaty/centers/${subjectCode}`);
  else router.push(`/catalog/almaty/selectCategory`)
}
</script>