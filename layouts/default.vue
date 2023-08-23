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
</script>

<style lang="scss" scoped>
.main-desktop {
  width: $max-width;
  margin: 0 auto;
  padding: $header-height $side-space-desktop 0;
}

.main-mobile {
  padding-bottom: 70px;
}
</style>