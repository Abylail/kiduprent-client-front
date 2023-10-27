<template>
  <div class="base-yandex-map">
    <div
        class="base-yandex-map__map"
        id="base-yandex-map"
        :style="{height: props.height}"
    />
  </div>
</template>

<script setup>
import {computed, onMounted, onBeforeMount} from "vue";

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

const AlmatyCenterCoords = [43.23974123877094, 76.90200964930152];

// Стартовые координаты
const startCoords = computed(() => props.branches[0]?.coordinates || AlmatyCenterCoords);
const markers = computed(() => props.branches.map(({coordinates}) => ({coordinates})));

const MarkerOptions = {preset: 'islands#circleIcon', iconColor: '#004BFF'};

// Ожидает загрузки скрипта
const scriptLoader = async (callback = null, count = 0, maxCount = 10) => new Promise(resolve => {
  if (window.ymaps || count > maxCount) {
    ymaps?.ready(resolve)
    if (callback) callback()
  }
  else setTimeout(() => {
    scriptLoader(resolve, count+1, maxCount);
  }, 100)
})

const Map = ref(null);
const mapInit = async () => {
  if (!window.ymaps) {
    useHead({script: ['/yandex.js']})
  }

  await scriptLoader();

  let _map = new ymaps.Map("base-yandex-map", {
    center: startCoords.value,
    zoom: 15,
    markers: [],
    controls: [],
  });

  // Добавляю маркеры
  markers.value.forEach(marker => {
    _map.geoObjects.add(new ymaps.Placemark([...marker.coordinates], {
      balloonContent: "test"
    }, MarkerOptions))
  })

  return _map;
}

onMounted(() => {
  mapInit()
})
</script>

<style lang="scss" scoped>
.base-yandex-map {
  margin: 8px 0;

  &__map {
    height: 300px;
    width: 100%;
    background-color: gray;
    border-radius: 5px;
    pointer-events: none;
  }
}

::v-deep {
  .ymaps-2-1-79-map-copyrights-promo, .ymaps-2-1-79-copyright {
    display: none;
  }
}
</style>