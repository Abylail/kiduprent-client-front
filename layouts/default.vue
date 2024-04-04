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
  title: "Kidup - подписка на детские товары",
  ogTitle: "Kidup - подписка на детские товары",
  description: "Берите любые детские товары по подписке. Коляски, манежи, товары для развития ребенка, эрго рюкзаки, пеленальный стол и многое другое.",
  ogDescription: "Берите любые детские товары по подписке. Коляски, манежи, товары для развития ребенка, эрго рюкзаки, пеленальный стол и многое другое.",
})
</script>

<style lang="scss" scoped>
.main-desktop {
  max-width: $max-width;
  margin: 0 auto;
  padding: $header-height $side-space-desktop 0;
}

.main-mobile {
  padding-bottom: 100px;
  background-color: $color--gray-light;
  min-height: calc(#{100vh} - 100px);
}
</style>