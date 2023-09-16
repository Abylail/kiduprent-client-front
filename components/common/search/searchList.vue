<template>
  <div class="search-list">
    <h1 class="search-list__title container" v-if="props.title">{{ props.title }}</h1>

    <!-- Уроки -->
    <div class="search-list__result" v-if="type === 'lessons'">
      <subject-card
          v-for="lesson in props.list" :key="lesson.id"
          :info="lesson"
          full
      />
    </div>

    <!-- Центры -->
    <div class="search-list__result" v-else-if="type === 'centers'">

    </div>
  </div>
</template>

<script setup>
import SubjectCard from "../miniCards/subjectCard";

const props = defineProps({
  title: String,
  list: Array,
  type: {
    type: String,
    default: "lessons",
    validator: t => ["lessons", "centers"].includes(t)
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.search-list {
  margin-top: 16px;

  &__title {
    font-size: $fs--default;
    line-height: $fs--default;
    font-weight: normal;
  }

  &__result {
    margin-top: 8px;
  }

}
</style>