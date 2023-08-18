<template>
  <mobile-header title="Выбор ребенка" :go-back="backRoute"/>
  <div class="select-children">
    <select-child @select="selectChild($event)"/>
  </div>
</template>

<script setup>
import MobileHeader from "../../../../components/common/layoutComponents/mobileHeader";
import SelectChild from "../../../../components/common/lesson/selectChild"
import {useRoute} from "nuxt/app";
import {computed} from "vue";
const route = useRoute();

const backRoute = computed(() => `/catalog/lesson/${route.params.id}`);

// Выбрать ребенка
const selectChild = child => {

}
</script>

<style scoped>

</style>