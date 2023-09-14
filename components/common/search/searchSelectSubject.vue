<template>
  <div class="search-select-subject">
    <button class="search-select-subject__select" @click="setShowModal(true)">
      <span class="search-select-subject__select-left">
        <span class="search-select-subject__title">Предмет</span>
        <span class="search-select-subject__value">{{ selectedSubjectName }}</span>
      </span>
      <base-icon name="mdi-chevron-right"/>
    </button>
  </div>

  <!-- Модалка с предметами -->
  <div class="search-select-subject__modal" v-if="showSelectModal">
    <mobile-header title="Выбор предмета">
      <template #right>
        <button @click="setShowModal(false)">
          <base-icon name="mdi-close"/>
        </button>
      </template>
    </mobile-header>

    <!-- Список предметов -->
    <div class="search-select-subject__modal-list">
      <button
          class="search-select-subject__modal-subject"
          v-for="subject in subjectList" :key="subject.code"
          @click="selectSubject(subject)"
      >{{ subject.name }}</button>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import BaseIcon from "../../base/BaseIcon";
import {useRoute, useRouter} from "nuxt/app";
import {useSubjectsStore} from "../../../store/subjects";
import MobileHeader from "../layoutComponents/mobileHeader";

const showSelectModal = ref(false);
const setShowModal = (val = false) => showSelectModal.value = val;

const subjectStore = useSubjectsStore();
subjectStore.fetchListInit();

const page = ref(0);
const subjectList = computed(() => subjectStore.getList.slice(0, (page.value + 1)*100));

const route = useRoute();
const selectedSubjectCode = computed(() => route.params?.subject || null);
const selectedSubjectName = computed(() => "Все предметы")

const router = useRouter();
const selectSubject = subject => {
  console.log(subject.code)
  if (selectedSubjectCode.value) {}
  else {router.push("/")}
}
</script>

<style lang="scss" scoped>
.search-select-subject {

  &__select {
    width: 100%;
    text-align: left;
    display: grid;
    grid-template-columns: 1fr 20px;
    align-items: center;
    padding: 12px $side-space-mobile;
    border-top: 1px solid $color--gray-light;
    color: $color--black;
    font-size: $fs--default;
    font-weight: bold;
    background-color: white;
  }

  &__title {
    display: block;
    color: $color--gray-dark;
    font-size: $fs--mini;
    font-weight: normal;
  }

  &__value {
    display: table-cell;
    vertical-align: bottom;
    font-weight: normal;
    height: 20px;
  }

  &__modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    z-index: 1;
  }

  &__modal-subject {
    width: 100%;
    text-align: left;
    border-top: 1px solid $color--gray-light;
    display: block;
    padding: 12px $side-space-mobile;
    font-size: $fs--default;
  }

}
</style>