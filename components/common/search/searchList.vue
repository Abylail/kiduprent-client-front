<template>
  <div class="search-list">
    <h1 class="search-list__title container" v-if="props.title">{{ props.title }}</h1>

    <!-- Уроки -->
    <div class="search-list__result" v-if="type === 'lessons'">
      <subject-card
          class="search-list__result-item"
          v-for="lesson in props.list" :key="lesson.id"
          :info="lesson"
          full
      />
    </div>

    <!-- Центры -->
    <div class="search-list__result" v-else-if="type === 'centers'">

    </div>

    <base-loader center-horizontal v-if="props.loading"/>

    <div class="search-list__more" v-if="pagination && haveData && !props.loading">
      <base-button type="naked" @click="loadMoreHandle()">Загрузить еще</base-button>
    </div>
  </div>
</template>

<script setup>
import SubjectCard from "../miniCards/subjectCard";
import BaseButton from "../../base/BaseButton";
import {computed} from "vue";
import BaseLoader from "../../base/BaseLoader";

const emits = defineEmits(["paginate"]);
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
  },
  pagination: {
    type: Boolean,
    default: true
  }
})

const haveData = computed(() => !!props.list?.length)

// Загрузить еще
const page = ref(1);
const loadMoreHandle = () => {
  emits("paginate", ++page.value);
}
</script>

<style lang="scss" scoped>
.search-list {
  margin-top: 16px;

  &__title {
    font-size: $fs--default;
    line-height: 30px;
    font-weight: normal;
  }

  &__result {
    margin-top: 8px;
  }

  &__result-item {
    margin-bottom: 16px;
  }

  &__more {
    text-align: center;
  }

}
</style>