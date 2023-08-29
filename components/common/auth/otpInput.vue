<template>
  <div class="otp-input" :class="{'otp-input--error': error}" :ref="el => otpContainer = el">
    <input
        class="otp-input__digit"
        v-for="(_, index) in props.digitCount" :key="index"
        :value="digits[index]"
        type="text"
        inputmode="numeric"
        maxlength="1"
        @keydown="keyDownHandle($event, index)"
        @focus="onFocusHandle(index)"
    />
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
const emit = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: String,
  error: {
    type: Boolean,
    default: false
  },
  digitCount: {
    type: Number,
    default: 4
  }
})

const digits = computed(() => props.modelValue?.split("") || [])

const otpContainer = ref(null);
const digitRegex = new RegExp('^([0-9]$)')
const keyDownHandle = (event, index) => {
  let newDigits = digits.value.slice();

  // Если удаление
  if (event.key === "Backspace") {
    newDigits[index] = null;
    if (index !== 0) {
      setTimeout(() => otpContainer.value.children[index - 1].focus());
    }
    // Если удаляют какой то среднюю цифру
    if (index !== props.digitCount - 1 &&  newDigits[index + 1]) {
      newDigits = [];
    }
  }

  // Если ввод числа
  else if (digitRegex.test(event.key)) {
    newDigits[index] = event.key;
    if (index !== props.digitCount - 1) {
      setTimeout(() => otpContainer.value.children[index + 1].focus());
    }
  }

  emit("update:modelValue", newDigits.join(""))
}

const onFocusHandle = index => {
  // Фокус на пустой ячейке
  if (!digits.value[index]) {
    if (index !== 0 && !digits.value[index - 1]) {
      for (let i = index; i >= 0; i--) {
        if (i === 0) return otpContainer.value.children[0].focus()
        else if (digits.value[i - 1]) return otpContainer.value.children[i].focus()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.otp-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;

  &__digit {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid $color--gray-dark;
    padding: 8px 20px;
    height: 40px;
    width: 16px;
    font-size: $fs--big-title;
    border-radius: 5px;

    &:focus {
      border: 2px solid $color--black;
    }
  }

  &--error &__digit{
    border-color: $color--red;
  }

}
</style>