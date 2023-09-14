<template>
  <div class="subjects-feed">
    <h2 v-if="props.title" class="container subjects-feed__title title">{{ props.title }}</h2>

    <div class="subjects-feed__list">
      <subject-card
        v-for="subject in feedStore.getFeed"
        :info="subject"
        full
      />
    </div>

    <!-- Кнопка загрузить еще -->
    <div class="subjects-feed__more" v-if="feedStore.getHaveMore">
      <base-button type="naked" :loading="isLoading" @click="fetchMore()">Смотреть еще</base-button>
    </div>
  </div>
</template>

<script setup>
import {useSubjectFeedStore} from "../../../store/main/subjectFeed";
import SubjectCard from "../miniCards/subjectCard";
import BaseButton from "../../base/BaseButton";

const props = defineProps({
  title: String
})

const feedStore = useSubjectFeedStore();
feedStore.fetchSubjectsInit();

const isLoading = ref(false);
const fetchMore = async () => {
  isLoading.value = true;
  await feedStore.fetchSubjectsMore();
  isLoading.value = false;
}
</script>

<style lang="scss" scoped>
.subjects-feed {

  &__title {
    margin-top: 24px;
    margin-bottom: 8px;
  }

  &__list > * {
    margin-bottom: $side-space-mobile;
  }

  &__more {
    text-align: center;
  }

}
</style>