<template>
  <div class="subjects-feed">
    <h2 v-if="props.title" class="container subjects-feed__title title">{{ props.title }}</h2>

    <base-scroll-pagination class="subjects-feed__list" @paginate="fetchMore()">
      <subject-card
        v-for="subject in feedStore.getFeed"
        :info="subject"
        full
      />
    </base-scroll-pagination>

    <base-loader v-if="isLoading" center-horizontal/>

  </div>
</template>

<script setup>
import {useSubjectFeedStore} from "../../../store/main/subjectFeed";
import SubjectCard from "../miniCards/subjectCard";
import BaseButton from "../../base/BaseButton";
import {paginationMainPage} from "../../../utlis/analitics";
import BaseScrollPagination from "../../base/BaseScrollPagination";
import BaseLoader from "../../base/BaseLoader";

const props = defineProps({
  title: String
})

const feedStore = useSubjectFeedStore();
await feedStore.fetchSubjectsInit();

const isLoading = ref(false);
const fetchMore = async () => {
  if (isLoading.value) return;
  paginationMainPage()
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
    font-weight: bold !important;
    text-align: center;
    * {font-weight: bold !important;}
  }

}
</style>