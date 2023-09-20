<template>
  <div class="lesson-group">
    <div class="lesson-group__title">{{ title }}</div>
    <div class="lesson-group__action">
      <base-button type="outline" size="mini">Записаться на пробный</base-button>
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
</script>

<style lang="scss" scoped>
.lesson-group {
  padding-top: 16px;
  &:not(:last-child) {
    border-bottom: 1px solid $color--gray;
    padding-bottom: 16px;
  }

  &__title {
    font-size: $fs--mini;
    font-weight: bold;
  }

  &__action {
    margin-top: 8px;
    text-align: right;
  }

}
</style>