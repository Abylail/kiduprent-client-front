<template>
  <mobile-header title="Избранное" go-back="/account"/>
  <div class="favorite">
    <base-switch v-model="favoriteType" :options="favoriteTypes"/>

    <div class="favorite__list" v-if="favoriteType === favoriteTypes[0].key">
      <lesson-card
          v-for="(lesson, index) in exampleList" :key="index"
          :info="lesson"
          full
      />
    </div>

    <div class="favorite__list" v-if="favoriteType === favoriteTypes[1].key">
      <center-card
          v-for="(center, index) in exampleList" :key="index"
          :info="center"
          full
      />
    </div>
  </div>
</template>

<script setup>
import MobileHeader from "../../../components/common/layoutComponents/mobileHeader";
import BaseSwitch from "../../../components/base/BaseSwitch";
import {computed} from "vue";
import {useRoute} from "nuxt/app";
import LessonCard from "../../../components/common/miniCards/lessonCard";
import CenterCard from "../../../components/common/miniCards/centerCard";

const route = useRoute();
const router = useRouter();
const favoriteTypes = [{name: 'Уроки', key: 'lessons'}, {name: 'Центры', key: 'centers'}];
const favoriteType = computed({
  get: () => route.query.type || favoriteTypes[0].key,
  set: (val) => router.replace({query: {type: val}}),
});

const exampleList = [{}, {}, {}, {}];
</script>

<style lang="scss" scoped>
.favorite {

  &__list {
    margin: 16px 0;
    & > * {
      margin-bottom: 16px;
    }
  }

}
</style>