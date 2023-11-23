<template>
  <div class="base-yandex-map" :class="{'base-yandex-map--full-screen': fullScreen}">

    <mobile-header
        v-if="fullScreen"
        title="Местоположение"
        :goBack="() => setFullScreen(false)"
    />

    <div
        class="base-yandex-map__map"
        :class="{'base-yandex-map__map--full-screen': fullScreen}"
        id="base-yandex-map"
        :style="{height: mapHeight}"
    />

    <button v-if="!fullScreen" class="base-yandex-map__show-full" @click="setFullScreen(true)">
      <base-icon size="30" color="white" name="mdi-fullscreen"/>
    </button>

    <button v-else class="base-yandex-map__show-full" @click="setFullScreen(false)">
      <base-icon size="30" color="white" name="mdi-fullscreen-exit"/>
    </button>
  </div>
</template>

<script setup>
import {computed, onMounted} from "vue";
import BaseIcon from "./BaseIcon";
import MobileHeader from "../common/layoutComponents/mobileHeader";
import {AlmatyCenterCoords} from "../../config/map";

const props = defineProps({
  height: {
    type: String,
    default: null
  },
  controls: {
    type: Array,
    default: () => ["zoomControl"]
  },
  branches: {
    type: Array,
    default: () => []
  }
});

// Стартовые координаты
const startCoords = computed(() => props.branches[0]?.coordinates || AlmatyCenterCoords);
const markers = computed(() => props.branches.map(({coordinates}) => ({coordinates})));

const MarkerOptions = {preset: 'islands#circleIcon', iconColor: '#004BFF'};

// Ожидает загрузки скрипта
const scriptLoader = (count = 0, maxCount = 10) => new Promise(resolve => {
  if (window.ymaps || count > maxCount) {
    ymaps.ready(resolve)
  }
  else setTimeout(async () => {
    await scriptLoader(count+1, maxCount);
    resolve()
  }, 100)
})

let Map = null;
const mapInit = async () => {
  if (!window.ymaps) {
    useHead({script: ['/yandex.js']})
  }

  await scriptLoader();

  Map = new window.ymaps.Map("base-yandex-map", {
    center: startCoords.value,
    zoom: 14,
    markers: [],
    controls: ["geolocationControl"],
  });

  // Добавляю маркеры
  markers.value.forEach(marker => {
    Map.geoObjects.add(new ymaps.Placemark([...marker.coordinates], {}, MarkerOptions))
  })

  return Map;
}

const fullScreen = ref(false);
const mapHeight = computed(() => fullScreen.value ? "100%" : props.height);
const setFullScreen = (full = false) => {
  fullScreen.value = full;
  setTimeout(() => {
    Map?.container?.fitToViewport()
    Map?.setCenter(startCoords.value)
  });
}

onMounted(() => {
  mapInit()
})
</script>

<style lang="scss" scoped>
.base-yandex-map {
  margin: 8px 0;
  position: relative;

  &--full-screen {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    z-index: 5;
    background: $color--gray-light;
    margin: 0;
    border-radius: 0;
  }

  &__map {
    height: 300px;
    width: 100%;
    background-color: gray;
    border-radius: 5px;
    overflow: hidden;
    pointer-events: none;

    &--full-screen {
      pointer-events: auto;
    }
  }

  &__show-full {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 5px;
    bottom: 5px;
    height: 35px;
    width: 35px;
    background: rgba(0, 0, 0, .4);
    border-radius: 5px;
  }
}

::v-deep {
  .ymaps-2-1-79-map-copyrights-promo, .ymaps-2-1-79-copyright {
    display: none;
  }
}
</style>