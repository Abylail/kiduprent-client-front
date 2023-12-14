<template>
  <nuxt-link class="lessons-collection-card" :to="props.path">
    <video class="lessons-collection-card__video" autoplay muted loop>
      <source :src="imagePath" type="video/mp4">
    </video>
    <div class="lessons-collection-card__info">
      <h4>{{ props.title }}</h4>
    </div>
  </nuxt-link>
</template>

<script setup>
const emits = defineEmits(["click"])
const props = defineProps({
  imagePath: {
    type: String,
  },
  title: {
    type: String,
  },
  path: {
    type: String
  }
})
</script>

<style lang="scss" scoped>
.lessons-collection-card {
  position: relative;
  width: 240px;
  min-width: 240px;
  height: 180px;
  background-color: gray;
  border-radius: 8px;
  overflow: hidden;

  &__video {
    width: 100%;
    height: 100%;
  }

  &__info {
    display: flex;
    align-items: flex-end;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0px -68px 64px 25px rgba(0, 0, 0, 0.5) inset;
    z-index: 1;
    padding: 20px 10px;
    color: white;
  }
}
</style>