<template>
  <div :class="[{'banner-toys--mobile': !$device.isDesktop}, {'banner-toys--desktop': $device.isDesktop}]">
    <h2 class="banner-toys__title">Подписка на игрушки</h2>

    <div class="banner-toys__block">

    </div>
  </div>
</template>

<script setup>
const { $device } = useNuxtApp();
</script>

<style lang="scss" scoped>
.banner-toys--mobile {
  width: calc(100% - 4*#{$side-space-mobile});
  height: 55vw;
  background-size: cover;
  color: $color--blue-dark;
  margin-left: $side-space-mobile;
  margin-right: $side-space-mobile;
  padding-left: $side-space-mobile;
  padding-right: $side-space-mobile;
  padding-top: $side-space-mobile;
  background-color: $color--yellow;
  border-radius: 10px;

  .banner-toys__title {
    font-weight: normal;
  }
}
.banner-toys--desktop {
  width: 320px;
  height: 250px;
  background-size: cover;
  color: white;
  padding-right: 200px;
  padding-left: $side-space-mobile;
  padding-top: $side-space-mobile;
}
</style>