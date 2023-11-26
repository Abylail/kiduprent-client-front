<template>
  <mobile-header
      :title="centerInfo.name"
      go-back="/catalog/almaty/centers"
  />

  <div class="center-info">
    <base-mini-photos
        class="center-info__photos"
        v-if="photos"
        :list="photos"
        :rounded="false"
    />

    <div class="center-info__main container--white">
      <h1 class="center-info__title">
        <img class="center-info__logo" v-if="logoUrl" :src="logoUrl" alt="logo"/>
        <span>{{ centerInfo.name }}</span>
      </h1>

      <p class="center-info__description">
        <span>
          <base-icon class="center-info__description-icon" name="mdi-star" color="#dbdb2f"/>
          <span>{{ centerInfo.rating }}</span>
        </span>
        <span>
          <base-icon class="center-info__description-icon" name="mdi-clock-time-eight-outline"/>
          <span>{{ workTime }}</span>
        </span>
        <span>
          <base-icon class="center-info__description-icon" name="mdi-account-group"/>
          <span>{{ groups.length }} групп</span>
        </span>
      </p>

      <pre class="center-info__description-text"><base-cut-text :text="centerInfo.description" :max-symbols="300"/></pre>
    </div>

    <div class="center-info__go-subjects container">
      <base-button type="outline" full-width @click="goSubjects()">Записаться</base-button>
    </div>

    <div class="center-info__contacts container--white">
      <h3 class="center-info__title">Контакты</h3>
      <lesson-contacts
          :groups="groups"
          :info="centerInfo"
      />
    </div>

    <div class="center-info__contacts container--white">
      <h3 class="center-info__title">Местоположение</h3>
      <base-yandex-mini-map
          :branches="branches"
          height="150px"
      />
    </div>

    <div class="center-info__subjects" id="subjects">
      <h3 class="center-info__title container">Уроки в центре</h3>
      <subject-card
        class="center-info__subject"
        v-for="subject in subjects" :key="subject.id"
        :info="subject"
        full
      />
    </div>

    <!-- Предметы -->

  </div>
</template>

<script setup>
import MobileHeader from "../../../../components/common/layoutComponents/mobileHeader";
import {useCenterDetailsStore} from "../../../../store/details/center";
import {useRoute, useRouter, useRuntimeConfig} from "nuxt/app";
import {computed, onMounted} from "vue";
import BaseMiniPhotos from "../../../../components/base/BaseMiniPhotos";
import BaseIcon from "../../../../components/base/BaseIcon";
import LessonContacts from "../../../../components/common/lesson/lessonContacts";
import SubjectCard from "../../../../components/common/miniCards/subjectCard";
import BaseYandexMiniMap from "../../../../components/base/BaseYandexMiniMap";
import BaseCutText from "../../../../components/base/BaseCutText";
import BaseButton from "../../../../components/base/BaseButton";

const config = useRuntimeConfig();

const route = useRoute();
const centerId = computed(() => +route.params.id);
const centerStore = useCenterDetailsStore();
const centerInfo = computed(() => centerStore.getCenterInfo || {});
await centerStore.fetchCenterInfo({id: centerId.value});

useSeoMeta({
  title: () => centerInfo.value?.name,
  ogTitle: () => centerInfo.value?.name,
})

const groups = computed(() => centerInfo.value.institutionGroups || []);
const branches = computed(() => centerInfo.value.institutionBranches || []);
const photos = computed(() => centerInfo.value.photos);
const workTime = computed(() => `${centerInfo.value.start_time} - ${centerInfo.value.end_time}`)
const logoUrl = computed(() => centerInfo.value?.logo && (config.public.CDN_URL + centerInfo.value?.logo) || null);

const isSubjectsLoading = ref(true);
const subjects = computed(() => centerStore.getSubjects || []);
const fetchSubjects = async () => {
  isSubjectsLoading.value = true;
  await centerStore.fetchCenterSubjects({id: centerId.value})
  isSubjectsLoading.value = false;
}

const router = useRouter()
const goSubjects = () => {
  router.replace({hash: "#subjects"})
}

onMounted(() => {
  fetchSubjects();
})
</script>

<style lang="scss" scoped>
.center-info {

  &__photos {
    height: 80vw;
    max-height: 400px;
    background-color: white;
  }

  &__title {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    font-size: $fs--title;
    margin-bottom: 8px;
  }

  &__logo {
    width: 32px;
    height: 32px;
    background: white;
    padding: 4px;
    border-right: 60px;
    margin-right: 8px;
    border-radius: 32px;
  }

  &__description {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $color--black;
    font-weight: normal;
    margin-top: 8px;
    font-size: $fs--default;

    & > * {
      display: flex;
      align-items: center;
    }
  }

  &__description-text {
    white-space: pre-wrap;
    font-size: $fs--mini;
  }

  &__description-icon {
    color: $color--blue;
    margin-right: 4px;
  }

  &__go-subjects {
    margin: 16px 0;
  }

  &__contacts {
    margin: 16px 0;
  }

  &__subjects {
    margin-top: 16px;
    padding-top: 8px;
  }

  &__subject {
    margin: 8px 0;
  }

}
</style>