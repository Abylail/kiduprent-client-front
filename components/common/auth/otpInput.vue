<template>
  <div class="otp-input" :ref="el => otpContainer = el">
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
import {ref} from "vue";
const props = defineProps({
  modelValue: String,
  digitCount: {
    type: Number,
    default: 4
  }
})


const otpContainer = ref(null);
const digits = ref([]);
const digitRegex = new RegExp('^([0-9]$)')
const keyDownHandle = (event, index) => {
  // Если удаление
  if (event.key === "Backspace") {
    digits.value[index] = null;
    if (index !== 0) {
      setTimeout(() => otpContainer.value.children[index - 1].focus());
    }
    // Если удаляют какой то среднюю цифру
    if (index !== props.digitCount - 1 &&  digits.value[index + 1]) {
      digits.value = [];
    }
  }

  // Если ввод числа
  else if (digitRegex.test(event.key)) {
    digits.value[index] = event.key;
    if (index !== props.digitCount - 1) {
      setTimeout(() => otpContainer.value.children[index + 1].focus());
    }
  }
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

}
</style>