<template>
  <div class="subject-list">
    <h2 class="subject-list__title title">Предметы</h2>

    <!-- Список предметов -->
    <div class="subject-list__list">
      <nuxt-link
          class="subject-list__item"
          v-for="(subject, index) in subjectList" :key="index"
          :to="`/catalog/almaty/lessons/${subject.code}`"
      >
<!--        <span class="subject-list__item-color"/>-->
        <span class="subject-list__item-name">{{ subject.name }}</span>
        <base-icon class="subject-list__item-arrow" size="16" name="mdi-arrow-right"/>
      </nuxt-link>
    </div>

    <div class="subject-list__more" v-if="showMoreButton">
      <base-button type="naked" :loading="isLoading" @click="fetchMore()">Смотреть еще</base-button>
    </div>
  </div>
</template>

<script setup>
import {useMainSubjectsStore} from "../../../store/main/subjects";
import BaseIcon from "../../base/BaseIcon";
import BaseButton from "../../base/BaseButton";
import {computed} from "vue";

const isLoading = ref(false);

// Показывать ли кнопку еще
const showMoreButton = computed(() => subjectStore.getHaveMore || subjectList.value.length < subjectStore.getList.length)

const subjectStore = useMainSubjectsStore();
subjectStore.fetchListInit();

const page = ref(0);
const subjectList = computed(() => subjectStore.getList.slice(0, (page.value + 1)*5));

const fetchMore = async () => {
  isLoading.value = true;
  page.value++;
  await subjectStore.fetchListMore(page.value);
  isLoading.value = false;
}
</script>

<style lang="scss" scoped>
.subject-list {
  margin: 16px 0;

  &__list {
    padding-top: 12px;
  }

  &__item {
    display: grid;
    grid-template-columns: 1fr 20px;
    align-items: center;
    padding: 12px 8px;
    border-top: 1px solid $color--gray-light;
    color: $color--black;
  }

  &__item-arrow {
    color: $color--gray-dark;
  }

  &__more {
    text-align: center;
  }

}
</style>