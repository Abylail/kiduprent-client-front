<template>
  <div class="base-select">

    <div class="base-select__hit-box" @click="hitBoxHandle()">
      <!-- Иконка -->
      <base-icon class="base-select__prev-icon" size="28" v-if="prevIcon" :name="prevIcon"/>

      <div class="base-select__title" :class="[{'base-select__title--with-icon': prevIcon}, {'base-select__title--top': titleTop}]">{{ title }}</div>

      <div class="base-select__value-label">{{ valueLabel }}</div>
    </div>

    <!-- Список опций в бэкдропе -->
    <base-backdrop v-model:active="active" title="Выберите">
      <div class="base-select__options">
        <div
            class="base-select__option"
            :class="{'base-select__option--selected': option.key === modelValue}"
            v-for="option in options" :key="option"
            @click="selectHandle(option)"
        >{{ option.name }}</div>
      </div>
    </base-backdrop>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import BaseIcon from "./BaseIcon";
import BaseBackdrop from "./BaseBackdrop";

const emit = defineEmits(["update:modelValue"])
const props = defineProps({
  title: String,
  modelValue: [String, Number],
  options: { // name, key
    type: Array,
    default: () => []
  },
  prevIcon: {
    type: String,
    default: null
  }
})

const valueLabel = computed(() => props.modelValue && props.options.find(o => o.key === props.modelValue)?.name)

// Активен ли инпун
const active = ref(false);

// Поднять тайтл
const titleTop = computed(() => active.value || props.modelValue)

// Клик по коробке
const hitBoxHandle = () => {
  active.value = true;
}

// Выбрать
const selectHandle = option => {
  emit("update:modelValue", option?.key || null);
  active.value = false;
}
</script>

<style lang="scss" scoped>
$input-height: 28px;
.base-select {
  margin: 8px 0;

  &__hit-box {
    display: flex;
    position: relative;
    padding: 8px;
    border: 1px solid $color--black;
    border-radius: 5px;
  }

  &__title {
    position: absolute;
    font-size: $fs--title;
    font-weight: normal;
    line-height: $input-height;
    top: 8px;
    transition: $transition;

    &--top {
      font-size: $fs--mini;
      line-height: $fs--mini + 2px;
      top: 4px;
    }

    &--with-icon {
      left: 44px;
    }
  }

  &__prev-icon {
    height: $input-height;
    margin-right: 8px;
  }

  &__value-label {
    flex: 1;
    height: $input-height - 10px;
    padding-top: 10px;
    font-size: 16px;
  }

  &__option {
    padding: 20px $side-space-mobile;
    &:hover {background-color: $color--gray-light}

    &--selected {
      background: $color--gray;
    }

    &:not(:last-child) {
      border-bottom: 1px solid $color--gray;
    }
  }

}
</style>