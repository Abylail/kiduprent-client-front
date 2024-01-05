<template>
  <div :class="{'lesson-group--desktop': $device.isDesktop, 'lesson-group--mobile container--white': !$device.isDesktop}">

    <h4 class="lesson-group-title" v-if="showIndex">Группа {{props.index + 1}}</h4>

    <div class="lesson-group-times">
      <div class="lesson-group-time" v-for="(time, index) in times" :key="index">
        <div class="lesson-group-time-name">{{ time.shortName }}</div>
        <div class="lesson-group-time-start">{{ time.timeStart }}</div>
        <div class="lesson-group-time-end">{{ time.timeEnd }}</div>
      </div>
    </div>

    <div class="lesson-group-content-info">
      <div>{{ props.info.price }} тг/мес</div>
      <div class="dot-divider"/>
      <div>{{ age }}</div>
      <div class="dot-divider" v-if="languages"/>
      <div>{{ languages }}</div>
    </div>

    <div class="lesson-group-content-info">
      <div>
        <base-icon name="mdi-map-marker" size="20"/>
        <span>{{ address }}</span>
      </div>
    </div>

    <div class="lesson-group-action" v-if="props.selectable">
      <base-button full-width @click="selectHandle()">Записаться на пробный {{ priceTrial }}</base-button>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import {weekdayList} from "../../../config/weekdays";
import BaseButton from "../../base/BaseButton";
import {selectGroupLesson} from "../../../utlis/analitics";
import {useRuntimeConfig} from "nuxt/app";
import BaseIcon from "../../base/BaseIcon";

const emit = defineEmits(["select"]);
const props = defineProps({
  info: Object,
  index: {
    type: Number,
    default: null
  },
  selectable: {
    type: Boolean,
    default: false
  }
})

// Показать индекс группы?
const showIndex = computed(() => typeof props.index === "number");

const config = useRuntimeConfig();
const { $device } = useNuxtApp();

const title = computed(() => weekdayList
    .filter(weekday => props.info?.[`${weekday.code}_start`])
    .map(weekday => weekday.name)
    .join(" - ")
)

const times = computed(() => {
  return weekdayList
      .filter(weekday => props.info?.[`${weekday.code}_start`])
      .map(weekday => ({shortName: weekday.shortName, name: weekday.name, timeStart: `${props.info?.[`${weekday.code}_start`]}`, timeEnd: `${props.info?.[`${weekday.code}_end`]}`}))
})

const address = computed(() => props.info?.institutionBranch?.address)

const age = computed(() => {
  const max = props.info?.max_age;
  const min = props.info?.min_age;
  if (!min && !max) return ""
  if (!max && min) return `от ${min}`
  if (max && !min) return `до ${max}`
  return `${min} - ${max} лет`
})

const languages = computed(() => {
  let langs = [];
  if (props.info?.language_ru) langs.push("Русский")
  if (props.info?.language_kz) langs.push("Казахский")
  return langs.join(", ")
})

const maxChildrenCount = computed(() => props.info?.max_children_count);

const priceTrial = computed(() => {
  if (props.info?.price_trial) return `( ${props.info?.price_trial}₸ )`
  return "(бесплатно)"
});

const teacherGenderText = computed(() => {
  if (props.info.institutionTeacher.gender === "M") return "Мужской"
  if (props.info.institutionTeacher.gender === "W") return "Женский"
  return ""
})

const getPhotoUrl = (url) => config.public.CDN_URL + url;

const selectHandle = () => {
  selectGroupLesson()
  emit("select");
}
</script>

<style lang="scss" scoped>
.lesson-group--mobile {
  background-color: white;
  margin: 16px 0;
  &:not(:first-child) {
    padding-top: 16px;
  }

  .lesson-group-times {
    display: flex;
    overflow-y: auto;
    padding: 8px 0;
    margin: 4px 0;
  }

  .lesson-group-time {
    text-align: center;
    margin-right: 8px;
    padding: 4px 12px;
    background-color: $color--gray-light;
    border-radius: 5px;
    font-size: $fs--mini;
  }

  .lesson-group-time-name {
    font-weight: bolder;
  }

  .lesson-group-time-end {
    font-size: $fs--nano;
    color: $color--gray-dark;
  }

  .lesson-group-title {
    font-weight: bold;
    font-size: $fs--mini;
  }

  .lesson-group-content-info {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: $fs--mini;

    & > * {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
    }
  }

  .lesson-group-content {
    margin-top: 12px;
  }

  .lesson-group-content-loading {
    height: 160px;
  }

  .lesson-group-content-item {
    display: flex;
    //flex-wrap: wrap;
    align-items: center;
    margin: 12px 0;
    line-height: 20px;
    font-size: $fs--mini;
  }

  .lesson-group-content-item-teacher {
    display: flex;
    flex-direction: row;
    margin: 12px 0;

    img {
      border-radius: 100px;
      object-fit: cover;
      margin-right: 8px;
    }

    .lesson-group-content-item {
      display: block;
      line-height: $fs--default;
      margin: 2px 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

  }

  .lesson-group-content-value {
    font-weight: bolder;
    margin-left: 4px;
  }

  .lesson-group-action {
    margin-top: 16px;
    text-align: right;
  }

}

.lesson-group--desktop {
  display: grid;
  grid-template-rows: 20px 1fr 55px;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 0 8px 3px rgba(34, 60, 80, 0.2);

  .lesson-group-content-info {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-size: $fs--mini;
    line-height: $fs--mini;

    & > * {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
    }
  }

  .lesson-group-times {
    display: flex;
    overflow-y: auto;
    padding: 8px 0;
  }

  .lesson-group-time {
    text-align: center;
    margin-right: 8px;
    padding: 4px 12px;
    background-color: $color--gray-light;
    border-radius: 5px;
    font-size: $fs--mini;
  }

  .lesson-group-time-name {
    font-weight: bolder;
  }

  .lesson-group-time-end {
    font-size: $fs--nano;
    color: $color--gray-dark;
  }

  .lesson-group-title {
    font-weight: bold;
    font-size: $fs--mini;
  }

  .lesson-group-content {
    margin-top: 12px;
  }

  .lesson-group-content-loading {
    height: 160px;
  }

  .lesson-group-content-item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 12px 0;
    line-height: 20px;
    font-size: $fs--mini;
  }

  .lesson-group-content-value {
    font-weight: bolder;
    margin-left: 4px;
  }

  .lesson-group-action {
    margin-top: 16px;
    text-align: right;
  }

}
</style>