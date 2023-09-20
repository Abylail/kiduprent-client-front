<template>
  <div class="lesson-group">
    <h4 class="lesson-group__title">{{ title }}</h4>
    <div class="lesson-group__content">
      <p class="lesson-group__content-item">
        Время: <span class="lesson-group__content-value chip--outlined" v-for="time in times">{{ time }}</span>
      </p>
      <p class="lesson-group__content-item">
        Возраст: <span class="lesson-group__content-value">{{ age }}</span>
      </p>
    </div>
    <div class="lesson-group__action">
      <base-button size="mini">Выбрать группу</base-button>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import {weekdayList} from "../../../config/weekdays";
import BaseButton from "../../base/BaseButton";

const props = defineProps({
  info: Object
})

const title = computed(() => weekdayList
    .filter(weekday => props.info[`${weekday.code}_start`])
    .map(weekday => weekday.name)
    .join(" - ")
)

const times = computed(() => {
  return ["10:00 - 12:00"]
})

const age = computed(() => {
  const max = props.info.max_age;
  const min = props.info.min_age;
  return `${min || ""} - ${max || ""} лет`
})
</script>

<style lang="scss" scoped>
.lesson-group {
  padding-top: 16px;
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

  &__action {
    margin-top: 8px;
    text-align: right;
  }

}
</style>