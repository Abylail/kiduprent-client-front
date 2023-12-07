<template>
  <div :class="{'lesson-group--desktop': $device.isDesktop, 'lesson-group--mobile': !$device.isDesktop}">
    <h4 class="lesson-group-title">{{ title }}</h4>
    <div v-show="!props.info" class="lesson-group-content-loading skeleton-loading"/>
    <div class="lesson-group-content" v-show="props.info">
      <p class="lesson-group-content-item" @click="selectHandle()">
        Время: <span class="lesson-group-content-value chip--outlined" v-for="time in times">{{ time }}</span>
      </p>
      <p class="lesson-group-content-item">
        Адрес: <span class="lesson-group-content-value">{{ address }}</span>
      </p>
      <p class="lesson-group-content-item" v-if="props.info.price">
        Цена: <span class="lesson-group-content-value">{{ props.info.price }} тг</span>
      </p>
      <p class="lesson-group-content-item" v-if="age">
        Возраст: <span class="lesson-group-content-value">{{ age }}</span>
      </p>
      <p class="lesson-group-content-item">
        Язык: <span class="lesson-group-content-value">{{ languages }}</span>
      </p>
      <p class="lesson-group-content-item" v-if="maxChildrenCount">
        Детей в группе: <span class="lesson-group-content-value">{{ maxChildrenCount }}</span>
      </p>
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

const emit = defineEmits(["select"]);
const props = defineProps({
  info: Object,
  selectable: {
    type: Boolean,
    default: false
  }
})

const { $device } = useNuxtApp();

const title = computed(() => weekdayList
    .filter(weekday => props.info?.[`${weekday.code}_start`])
    .map(weekday => weekday.name)
    .join(" - ")
)

const times = computed(() => {
  const list = weekdayList
      .filter(weekday => props.info?.[`${weekday.code}_start`])
      .map(weekday => ({name: weekday.shortName, time: `${props.info?.[`${weekday.code}_start`]} - ${props.info?.[`${weekday.code}_end`]}`}))
  const isTimesSame = list.every(t => t.time === list[0]?.time);
  return isTimesSame ? [list[0]?.time] : list.map(t => `${t.name}(${t.time})`)
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

const selectHandle = () => {
  selectGroupLesson()
  emit("select");
}
</script>

<style lang="scss" scoped>
.lesson-group--mobile {
  &:not(:first-child) {
    padding-top: 16px;
  }
  &:not(:last-child) {
    border-bottom: 1px solid $color--gray;
    padding-bottom: 16px;
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

.lesson-group--desktop {
  display: grid;
  grid-template-rows: 20px 1fr 55px;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 0 8px 3px rgba(34, 60, 80, 0.2);

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