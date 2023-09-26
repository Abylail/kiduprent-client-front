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
import {onMounted} from "vue";

const props = defineProps({
  height: {
    type: String,
    default: null
  },
  controls: {
    type: Array,
    default: () => ["zoomControl", "geolocationControl"]
  }
});

const AlmatyCenterCoords = [43.23974123877094, 76.90200964930152];
const Map = ref(null);
const mapInit = () => {
  Map.value = new ymaps.Map("base-yandex-map", {
    center: AlmatyCenterCoords,
    zoom: 14,
    controls: props.controls,
  });
}

onMounted(() => {
  mapInit();
})
</script>

<style lang="scss" scoped>
.base-yandex-map {
  margin: 8px 0;

  &__map {
    height: 400px;
    width: 100%;
    background-color: gray;
  }
}

::v-deep {
  .ymaps-2-1-79-map-copyrights-promo, .ymaps-2-1-79-copyright {
    display: none;
  }
}
</style>