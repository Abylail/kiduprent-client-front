<template>
  <div :class="[{'banner--mobile': !$device.isDesktop}, {'banner--desktop': $device.isDesktop}]">
    <h1 class="banner-title">
      <span class="banner-hidden">Kidup.kz - </span>
      Центры и кружки <br/>в одном месте
    </h1>
    <h2 class="banner-subtitle">
      Лучшие места и занятия для развития ваших детей
    </h2>
    <button
        class="banner-action"
        @click="goLessons()"
    >Поиск уроков</button>
  </div>
</template>

<script setup>
import {useRouter} from "nuxt/app";
const { $device } = useNuxtApp();

const router = useRouter();
const goLessons = () => {
  router.push("/catalog/almaty/lessons")
}
</script>

<style lang="scss" scoped>
.banner--mobile {
  background-image: url("/banner.jpg");
  width: calc(100% - 35% - #{$side-space-mobile});
  height: 55vw;
  background-size: cover;
  color: white;
  padding-right: 35%;
  padding-left: $side-space-mobile;
  padding-top: $side-space-mobile;

  .banner-title {
    font-size: 5vw;
    line-height: 1.5;
    text-transform: uppercase;
  }

  .banner-subtitle {
    margin-top: 6vw;
    font-size: 3vw;
    line-height: 1.5;
    text-transform: uppercase;
  }

  .banner-action {
    display: inline-block;
    margin-top: 7vw;
    background-color: #F9705A;
    color: white;
    font-size: 4.5vw;
    padding: 8px 12px;
    border-radius: 10px;
    box-shadow: 0px 0px 8px 3px rgba(34, 60, 80, 0.25);
  }

  .banner-hidden {
    display: none;
  }
}
.banner--desktop {
  background-image: url("/banner.jpg");
  width: 320px;
  height: 250px;
  background-size: cover;
  color: white;
  padding-right: 200px;
  padding-left: $side-space-mobile;
  padding-top: $side-space-mobile;

  .banner-title {
    font-size: $fs--big-title;
    line-height: 1.5;
    text-transform: uppercase;
  }

  .banner-subtitle {
    margin-top: 20px;
    font-size: $fs--default;
    line-height: 1.5;
    text-transform: uppercase;
  }

  .banner-action {
    display: inline-block;
    margin-top: 20px;
    background-color: #F9705A;
    color: white;
    font-size: $fs--title;
    padding: 8px 12px;
    border-radius: 10px;
  }

  .banner-hidden {
    display: none;
  }
}
</style>