<template>
  <div :class="[{'subject-list--mobile': !$device.isDesktop}, {'subject-list--desktop': $device.isDesktop}]">
    <h2 class="subject-list-title title">Предметы</h2>

    <!-- Список предметов -->
    <div class="subject-list-list">
      <button
          class="subject-list-item"
          v-for="(subject, index) in subjectList" :key="index"
          @click="goLessons(subject.code)"
      >
        <span class="subject-list-item-name">{{ subject.name }}</span>
        <base-icon class="subject-list-item-arrow" size="16" name="mdi-arrow-right"/>
      </button>

      <base-button
          v-if="showMoreButton && $device.isDesktop"
          type="naked"
          :loading="isLoading"
          @click="showMore()"
      >Еще предметы +</base-button>
    </div>

    <div class="subject-list-more" v-if="showMoreButton">
      <base-button
          v-if="!$device.isDesktop"
          type="naked"
          :loading="isLoading"
          @click="showMore()"
      >Смотреть еще</base-button>
    </div>
  </div>
</template>

<script setup>
import BaseIcon from "../../base/BaseIcon";
import BaseButton from "../../base/BaseButton";
import {computed} from "vue";
import {useSubjectsStore} from "../../../store/subjects";
import {useRouter} from "nuxt/app";

const router = useRouter();
const { $device } = useNuxtApp();
const subjectStore = useSubjectsStore();
await subjectStore.fetchList();

const isLoading = ref(false);

// Показывать ли кнопку еще
const showMoreButton = computed(() => subjectStore.getList.length !== subjectList.value.length)

// Показать еще
const page = ref(0);
const showMore = () => page.value++;
const subjectList = computed(() => subjectStore.getList.slice(0, (page.value + 1)*5));

// Перейти в уроки
const goLessons = (subjectCode) => {
  router.push(`/catalog/almaty/lessons/${subjectCode}`);
}
</script>

<style lang="scss" scoped>
.subject-list--mobile {
  margin: 16px 0;

  .subject-list-list {
    padding-top: 12px;
  }

  .subject-list-item {
    display: grid;
    grid-template-columns: 1fr 20px;
    align-items: center;
    padding: 12px 8px;
    border-top: 1px solid $color--gray-light;
    color: $color--black;
    width: 100%;
    text-align: left;
    font-size: $fs--default;
  }

  .subject-list-item-arrow {
    color: $color--gray-dark;
  }

  .subject-list-more {
    text-align: center;
  }

}
.subject-list--desktop {

  .subject-list-title {
    display: none;
  }

  .subject-list-list {
    display: flex;
    flex-wrap: wrap;
  }

  .subject-list-item {
    padding: 8px 12px;
    border: 1px solid $color--blue;
    color: $color--blue;
    border-radius: 16px;
    margin-right: 8px;
    margin-bottom: 4px;
    font-size: $fs--default;
  }

  .subject-list-item-arrow {
    display: none;
    color: $color--blue;
  }

  .subject-list-more {
    text-align: center;
  }

}
</style>