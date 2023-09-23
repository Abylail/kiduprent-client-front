<template>
  <div class="lesson-group">
    <h4 class="lesson-group__title">{{ title }}</h4>
    <div class="lesson-group__content">
      <p class="lesson-group__content-item">
        Время: <span class="lesson-group__content-value chip--outlined" v-for="time in times">{{ time }}</span>
      </p>
      <p class="lesson-group__content-item">
        Адрес: <span class="lesson-group__content-value">{{ address }}</span>
      </p>
      <p class="lesson-group__content-item">
        Возраст: <span class="lesson-group__content-value">{{ age }}</span>
      </p>
      <p class="lesson-group__content-item">
        Язык: <span class="lesson-group__content-value">{{ languages }}</span>
      </p>
      <p class="lesson-group__content-item" v-if="maxChildrenCount">
        Детей в группе: <span class="lesson-group__content-value">{{ maxChildrenCount }}</span>
      </p>
    </div>
    <div class="lesson-group__action" v-if="props.selectable">
      <base-button size="mini" @click="selectHandle()">Выбрать группу</base-button>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import {weekdayList} from "../../../config/weekdays";
import BaseButton from "../../base/BaseButton";

const emit = defineEmits(["select"]);
const props = defineProps({
  info: Object,
  selectable: {
    type: Boolean,
    default: false
  }
})

const title = computed(() => weekdayList
    .filter(weekday => props.info[`${weekday.code}_start`])
    .map(weekday => weekday.name)
    .join(" - ")
)

const times = computed(() => {
  const list = weekdayList
      .filter(weekday => props.info[`${weekday.code}_start`])
      .map(weekday => ({name: weekday.shortName, time: `${props.info[`${weekday.code}_start`]} - ${props.info[`${weekday.code}_end`]}`}))
  const isTimesSame = list.every(t => t.time === list[0].time);
  return isTimesSame ? [list[0].time] : list.map(t => `${t.name}(${t.time})`)
})

const address = computed(() => props.info?.institutionBranch?.address)

const age = computed(() => {
  const max = props.info.max_age;
  const min = props.info.min_age;
  return `${min || ""} - ${max || ""} лет`
})

const languages = computed(() => {
  let langs = [];
  if (props.info.language_ru) langs.push("Русский")
  if (props.info.language_kz) langs.push("Казахский")
  return langs.join(", ")
})

const maxChildrenCount = computed(() => props.info.max_children_count);

const selectHandle = () => emit("select");
</script>

<style lang="scss" scoped>
.lesson-group {
  &:not(:first-child) {
    padding-top: 16px;
  }
  &:not(:last-child) {
    border-bottom: 1px solid $color--gray;
    padding-bottom: 16px;
  }

  &__title {
    font-weight: bold;
    font-size: $fs--mini;
  }

  &__content {
    margin-top: 12px;
  }

  &__content-item {
    margin: 8px 0;
    line-height: 20px;
    font-size: $fs--mini;
  }

  &__content-value {
    font-weight: bolder;
  }

  &__action {
    margin-top: 8px;
    text-align: right;
  }

}
</style>