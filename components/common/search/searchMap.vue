<template>
  <div class="search-map" id="search-map"/>
  <base-backdrop :title="currentTitle" :active="!!currentBranch" @update:active="setActiveInfo($event)">
    <div v-if="!!currentBranch?.institution">
      <branch-lessons-info v-if="props.type === 'lessons'" :branch="currentBranch" :subject-id="props.subjectId"/>
      <center-card v-else :info="currentInstitution" full/>
    </div>
  </base-backdrop>
</template>

<script setup>
import {computed, onMounted, watch} from "vue";
import {AlmatyCenterCoords} from "../../../config/map";
import {mapPoint} from "../../../utlis/analitics";
import BaseBackdrop from "../../base/BaseBackdrop";
import BranchLessonsInfo from "./branchLessonsInfo";
import CenterCard from "../miniCards/centerCard";


const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  subjectId: {
    type: Number,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: "lessons",
    validator: t => ["lessons", "centers"].includes(t)
  },
})

// Выбранный филиал
const currentBranch = ref(null);
const setActiveInfo = (val) => {
  if (!val) currentBranch.value = null;
}

// Выбранный центр
const currentInstitution = computed(() => ({...currentBranch.value?.institution, institutionBranches: [currentBranch.value]}))

// Тайтл
const currentTitle = computed(() => {
  if (props.type === "lessons") return currentBranch.value?.institution?.name
  else if (props.type === "centers") return currentBranch.value?.address || currentBranch.value?.institution?.name
})

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

  Map = new window.ymaps.Map("search-map", {
    center: AlmatyCenterCoords,
    zoom: 12,
    markers: [],
    controls: ["zoomControl", "geolocationControl"],
  });

  initBranches()

  return Map;
}

const initBranches = () => {
  if (!Map || !props.list.length) return;
  Map.geoObjects.removeAll();
  props.list.forEach(branch => {
    Map.geoObjects.add(new ymaps.Placemark([...branch.coordinates], {
      branch_id: branch.id
    }, MarkerOptions))
  })
  Map.geoObjects.events.add('click', branchClick)
}

const branchClick = event => {
  event.stopPropagation();
  mapPoint();
  const target = event.get('target');
  const branchId = target?.properties?.get("branch_id");
  if (!branchId) return;
  currentBranch.value = props.list.find(b => b.id === branchId);
}

watch(() => props.list, () => {
  initBranches()
})

onMounted(() => {
  mapInit()
})
</script>

<style lang="scss" scoped>
.search-map {
  //height: 400px;
  position: fixed;
  top: 165px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>