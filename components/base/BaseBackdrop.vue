<template>
  <div class="base-backdrop__background" :class="{active: props.active}" v-show="loaded" @click.self.stop="closeSelf">
    <div class="base-backdrop__window" :class="{active: props.active}" :ref="el => {dragWrapper = el}" :style="dragStyle" @touchmove="dragging" @touchstart="startDrag" @touchend="stopDrag">
      <button class="base-backdrop__holder" @touchstart.stop="startDrag($event, true)"/>
      <div class="base-backdrop__title" v-if="title">{{ title }}</div>
      <div class="base-backdrop__content" :class="{'base-backdrop__content--block-scroll': isDragging}" :ref="el => {contentElement = el}" @touchmove.stop="dragging($event, true)"><slot/></div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, watch, nextTick, onMounted} from "vue";
const emit = defineEmits(["update:active"])
const props = defineProps({
  title: {
    type: String,
    default: null
  },
  active: {
    type: Boolean,
    default: false
  }
})

const isDragging = ref(false);
const startYPosition = ref(null);
const activeYPosition = ref(null);
const prevActiveYPosition = ref(null);
const differenceY = ref(0);
const dragBlocked = ref(false);
const dragWrapper = ref(null);
const contentElement = ref(null);

const dragStyle = computed(() => !isDragging.value ? {} :  {
  transition: "0s",
  transform: `translateY(${activeYPosition.value - startYPosition.value}px)`
})


const loaded = ref(false);
onMounted(() => {
  setTimeout(() => {
    loaded.value = true;
  }, 300)
})

watch(() => props.active, (newVal) => {
  if (newVal) onOpen();
  else onClose();
})

const onOpen = () => {
  // Контроль скрола боди
  window.document.body.classList.add('no-scroll');
  // Контроль скрола контента
  contentElement.value.scrollTop = 0;
}

const onClose = () => {
  // Контроль скрола боди
  window.document.body.classList.remove('no-scroll');
}

// Закрыть сеюя
const closeSelf = () => emit("update:active", false);

const dragging = (event, isContent = false) => nextTick(() => {
  if (dragBlocked.value) return;

  // Мышка идет вверх?
  const isGoesTop = (event.changedTouches[0].clientY - differenceY.value) < startYPosition.value;

  // Отлавливаю скрол по контенту
  if (!isDragging.value && isContent && isGoesTop || (isContent && contentElement.value.scrollTop !== 0)) {
    dragBlocked.value = true;
    return;
  }

  isDragging.value = true;
  let touch = event.changedTouches[0];
  const userY = touch.clientY - differenceY.value;
  // Блочу если уходит вверх
  if (isGoesTop) {
    activeYPosition.value = startYPosition.value;
    return;
  }
  prevActiveYPosition.value = activeYPosition.value;
  activeYPosition.value = userY;
})

const startDrag = event =>  {
  let touch = event.touches[0];
  const elementYPosition = dragWrapper.value.getBoundingClientRect()?.y || touch.clientY;
  startYPosition.value = elementYPosition;
  activeYPosition.value = elementYPosition;
  differenceY.value = touch.clientY - elementYPosition;
  prevActiveYPosition.value = null;
}

const stopDrag = () => {
  clearDragState();
  if (prevActiveYPosition.value && prevActiveYPosition.value < activeYPosition.value) {
    closeSelf();
  }
}

const clearDragState = () => {
  isDragging.value = false;
  differenceY.value = 0;
  startYPosition.value = null;
  dragBlocked.value = false;
}
</script>

<style lang="scss" scoped>
.base-backdrop {

  &__background {
    opacity: 0;
    visibility: hidden;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(26,26,26,.4);
    transition-property: visibility, opacity;
    transition-duration: 0s, 0.4s;
    transition-delay: 0.5s, 0s;

    &.active {
      opacity: 1;
      visibility: visible;
      transition-property: visibility;
      transition-delay: 0s;
    }
  }

  &__title {
    font-size: $fs--big-title;
    font-weight: bold;
    padding: 10px $side-space-mobile;
  }

  &__window {
    height: auto;
    background: white;
    position: fixed;
    z-index: 11;
    opacity: 1;
    left: 0;
    transform: translateY(100%);
    right: 0;
    bottom: 0;
    transition: transform 200ms;
    border-radius: 16px 16px 0 0;

    &.active {
      transform: translateY(0);
      transition-delay: 0.15s;
    }
  }

  &__holder {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    width: 100%;
    outline: none;
    &:after {
      display: inline-block;
      content: "";
      height: 5px;
      width: 100px;
      background: $color--gray;
      border-radius: 10px;
    }
  }

  &__content {
    max-height: 75vh;
    overflow: auto;
    position: sticky;
    top: 0;
    padding-bottom: 20px;

    &--block-scroll {
      pointer-events: none;
    }
  }

}
</style>
