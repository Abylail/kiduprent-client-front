<template>

  <!-- Desktop -->
  <div v-if="$device.isDesktop">
    <desktop-header/>
    <main class="main-desktop"><slot/></main>
  </div>

  <!-- Mobile -->
  <div v-else>
    <main class="main-mobile"><slot/></main>
    <mobile-footer/>
  </div>

</template>

<script setup>
import MobileFooter from "../components/common/layoutComponents/mobileFooter";
import DesktopHeader from "../components/common/layoutComponents/desktopHeader";
const { $device } = useNuxtApp();

useSeoMeta({
  title: "Kidup - развитие ребенка",
  ogTitle: "Kidup - развитие ребенка",
  description: "Центры, курсы и уроки для детей",
  ogDescription: "Центры, курсы и уроки для детей",
})
</script>

<style lang="scss" scoped>
.main-desktop {
  width: $max-width;
  margin: 0 auto;
  padding: $header-height $side-space-desktop 0;
}

.main-mobile {
  padding-bottom: 70px;
  background-color: $color--gray-light;
  min-height: calc(#{100vh} - 70px);
}
</style>