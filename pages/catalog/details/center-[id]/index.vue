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
      <h1 class="center-info__title">{{ centerInfo.name }}</h1>
      <p class="center-info__description">{{ centerInfo.description }}</p>

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
    </div>

    <div class="center-info__contacts container--white">
      <h3 class="center-info__title">Контакты</h3>
      <lesson-contacts
          :groups="groups"
          :info="centerInfo"
      />
    </div>

    <!-- Предметы -->
    <div class="center-info__subject container--white" v-for="subject in subjects" :key="subjects.id">
      <h3>{{ subject.name }}</h3>
    </div>
  </div>
</template>

<script setup>
import MobileHeader from "../../../../components/common/layoutComponents/mobileHeader";
import {useCenterDetailsStore} from "../../../../store/details/center";
import {useRoute} from "nuxt/app";
import {computed} from "vue";
import BaseMiniPhotos from "../../../../components/base/BaseMiniPhotos";
import BaseIcon from "../../../../components/base/BaseIcon";
import LessonContacts from "../../../../components/common/lesson/lessonContacts";

const route = useRoute();
const centerId = computed(() => +route.params.id);
const centerStore = useCenterDetailsStore();
const centerInfo = computed(() => centerStore.getCenterInfo || {});
await centerStore.fetchCenterInfo({id: centerId.value});

const groups = computed(() => centerInfo.value.institutionGroups || []);
const photos = computed(() => centerInfo.value.photos);
const workTime = computed(() => `${centerInfo.value.start_time} - ${centerInfo.value.end_time}`)
const subjects = computed(() => centerInfo.value.institutionSubjects || []);

</script>

<style lang="scss" scoped>
.center-info {

  &__photos {
    height: 80vw;
    max-height: 400px;
    background-color: white;
  }

  &__title {
    font-size: $fs--title;
    margin-bottom: 8px;
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

  &__description-icon {
    color: $color--blue;
    margin-right: 4px;
  }

  &__contacts {
    margin: 16px 0;
  }

  &__subject {
    margin: 16px 0;
  }

}
</style>