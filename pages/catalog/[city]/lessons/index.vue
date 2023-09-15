<template>
  <mobile-header title="Уроки и курсы" go-back="/catalog/almaty"/>
  <search-select-subject  @update:subject="selectSubject($event)"/>
  <search-list title="Уроки и курсы для детей Алматы"/>
</template>

<script setup>
import MobileHeader from "../../../../components/common/layoutComponents/mobileHeader";
import SearchSelectSubject from "../../../../components/common/search/searchSelectSubject";
import {useRouter} from "nuxt/app";
import SearchList from "../../../../components/common/search/searchList";

// Перейти ы поиск по предметку
const router = useRouter();
const selectSubject = subjectCode => {
  router.push(`/catalog/almaty/lessons/${subjectCode}`);
}
</script>