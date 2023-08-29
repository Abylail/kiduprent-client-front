<template>
  <div :class="['base-input', `base-input--${type}`]">

    <div class="base-input__hit-box" @click.stop="hitBoxHandle()">

      <div class="base-input__title" :class="[{'base-input__title--with-icon': prevIcon}, {'base-input__title--top': titleTop}]">{{ title }}</div>

      <!-- Иконка -->
      <base-icon class="base-input__prev-icon" v-if="prevIcon" :name="prevIcon"/>

      <input
          class="base-input__input"
          :ref="el => inputElement = el"
          :value="valueLabel"
          :inputmode="inputmode"
          :autofocus="autofocus"
          @focus="onFocus()"
          @blur="onBlur()"
          @input="inputHandle($event.target?.value)"
      />

    </div>

  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
// import {default as InputMask} from "vue-inputmask"
import BaseIcon from "./BaseIcon";

const emit = defineEmits(["update:modelValue"])
const props = defineProps({
  title: String,
  modelValue: [String, Number],
  prevIcon: {
    type: String,
    default: null
  },
  phone: {
    type: Boolean,
    default: false
  },
  number: {
    type: Boolean,
    default: false
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: "default",
    validator: value => ["default", "naked-gray"].includes(value),
  }
})

const valueLabel = computed(() => props.modelValue);
const inputmode = computed(() => {
  if (props.phone) return "tel";
  if (props.number) return "numeric";
  return "text"
})

// Поднять тайтл
const titleTop = computed(() => active.value || props.modelValue)

// Активен ли инпун
const active = ref(false);

// Елемент инпута
const inputElement = ref(null);
// Клик по коробке
const hitBoxHandle = () => {
  inputElement.value?.focus()
}

// На фокус
const onFocus = () => {
  active.value = true;
}

// На выход из инпута
const onBlur = () => {
  active.value = false;
}

// Ввод данных
const inputHandle = value => {
  emit("update:modelValue", value);
}

const needInputMask = computed(() => props.phone);
const initMask = async () => {
  const {default: InputMask} = await import("vue-inputmask")
  console.log(InputMask)
  let im = null;
  if (props.phone) im = new InputMask("+7 (999) 999-99-99", {showMaskOnHover: false});
  if (im) im.mask(inputElement.value);
}

onMounted(() => {
  // if (needInputMask) initMask();
})
</script>

<style lang="scss" scoped>
$input-height: 32px;
.base-input {
  margin: 8px 0;

  &__hit-box {
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 10px;
    padding: 4px 8px;
  }

  &--default &__hit-box {
    border: 1px solid $color--black;
  }

  &--naked-gray &__hit-box {
    border: 1px solid $color--gray-light;
    background-color: $color--gray-light;
  }

  &__title {
    position: absolute;
    font-size: $fs--default;
    line-height: $input-height;
    top: 4px;
    transition: $transition;

    &--top {
      font-size: $fs--nano;
      line-height: $fs--nano + 2px;
      top: 3px;
    }

    &--with-icon {
      left: 40px;
    }
  }

  &__prev-icon {
    height: $input-height;
    margin-right: 8px;
  }

  &__input {
    flex: 1;
    height: $input-height - 14px;
    padding-top: 14px;
    font-size: 18px;
  }

}
</style>