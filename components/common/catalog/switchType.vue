<template>
  <div class="switch-type--mobile">

    <button
        class="switch-button"
        :class="{'switch-button--active': isLessons}"
        @click="goLessons()"
    >Уроки</button>

    <button
        class="switch-button"
        :class="{'switch-button--active': isCenters}"
        @click="goCenters()"
    >Центры</button>
  </div>
</template>

<script setup>
import {useRouter} from "nuxt/app";
import {computed} from "vue";

const router = useRouter();

const isLessons = computed(() => router.currentRoute.value.name.includes("lessons"))
const goLessons = () => {
  if (isLessons.value) return;
  router.replace(`/catalog/${router.currentRoute.value.params.city}/lessons`)
}


const isCenters = computed(() => router.currentRoute.value.name.includes("centers"))
const goCenters = () => {
  if (isCenters.value) return;
  router.replace(`/catalog/${router.currentRoute.value.params.city}/centers`)
}
</script>

<style lang="scss" scoped>
.switch-type--mobile {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: calc(100% - 2*#{$side-space-mobile});
  padding: 6px $side-space-mobile;
  background-color: white;
  border-top: 1px solid $color--gray-light;

  .switch-button {
    font-size: $fs--mini;
    padding: 6px 0;
    border-radius: 5px;

    &--active {
      background-color: $color--gray;
    }
  }
}
</style>