<template>
  <div class="lesson-timetable">

    <div class="lesson-timetable__item" v-for="(item, index) in list" :key="index">
      <div class="lesson-timetable__item-days">Понедельник - среда - пятница</div>
      <div class="lesson-timetable__item-info">
        <div class="lesson-timetable__times">
          <div class="chip">13:00</div>
          <div class="chip">13:00</div>
          <div class="chip">13:00</div>
        </div>
        <base-button size="mini" type="default" @click="selectTime(item)">Выбрать</base-button>
      </div>
    </div>

  </div>
</template>

<script setup>
const emit = defineEmits(["select"])
import BaseButton from "../../base/BaseButton";
const list = [{}, {}, {}];

// Выбрать время
const selectTime = time => {
  emit("select", time);
}
</script>

<style lang="scss" scoped>
.lesson-timetable {
  margin: 20px 0;

  &__item {
    margin: 10px 0;
  }

  &__item-days {
    font-weight: bold;
  }

  &__item-info {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }

  &__times {
    display: flex;
    flex-direction: row;
  }

}
</style>