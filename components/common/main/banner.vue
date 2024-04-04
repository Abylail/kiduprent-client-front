<template>
  <div :class="[{'banner--mobile': !$device.isDesktop}, {'banner--desktop': $device.isDesktop}]">
    <h1 class="banner-title">
      <span class="banner-hidden">Kidup rent - </span>
      Подписка <br/>на детские товары
    </h1>
    <h2 class="banner-subtitle">
      Берите любые детские товары по подписке.
    </h2>
    <p class="banner-subtitle">
      Коляски, манежи, товары для развития ребенка и многое другое
    </p>
    <button
        class="banner-action"
        @click="goLessons()"
    >В каталог</button>
  </div>
</template>

<script setup>
import {useRouter} from "nuxt/app";
const { $device } = useNuxtApp();

const router = useRouter();
const goLessons = () => {
  router.push("/toys")
}
</script>

<style lang="scss" scoped>
.banner--mobile {
  background-image: url("/banner.jpg");
  width: calc(100% - 35% - #{$side-space-mobile});
  min-height: 55vw;
  background-size: cover;
  color: white;
  padding-right: 35%;
  padding-left: $side-space-mobile;
  padding-top: $side-space-mobile;
  padding-bottom: $side-space-mobile;
  background-position: 50% 75%;

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
  min-height: 250px;
  background-size: cover;
  color: white;
  padding-right: 200px;
  padding-left: $side-space-mobile;
  padding-top: $side-space-mobile;
  padding-bottom: $side-space-mobile;

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