<template>
  <div class="otp-input">
    <input
      class="otp-input__real-input"
      type="text"
      :value="props.modelValue"
      autocomplete="one-time-code"
      inputmode="numeric"
      autofocus
      placeholder="____"
      :maxlength="props.digitCount"
      :pattern="`\d{${props.digitCount}}`"
      @input="inputHandle($event)"
    />
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
const emit = defineEmits(["update:modelValue", "submit"]);
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

const realInput = ref(null);
const clickHandle = () => {
  setTimeout(() => {
    realInput.value?.click();
    // realInput.value?.focus();
  }, 0);
}

const digits = computed(() => props.modelValue?.split("") || []);
const inputHandle = (event) => {
  if (event.target.value && isNaN(event.target.value)) {
    realInput.value.value = parseInt(event.target.value);
    return;
  }
  emit("update:modelValue", event.target.value)
  if (event.target.value?.length === props.digitCount) emit("submit");
}

onMounted(() => {
  navigator.credentials.get({
    otp: {transport:['sms']}
  })
      .then(otp => realInput.value.value = otp.code);
})
</script>

<style lang="scss" scoped>
.otp-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px auto;
  width: 200px;

  &__real-input {
    vertical-align: center;
    border: 2px solid $color--gray-dark;
    padding: 16px 20px;
    height: 24px;
    font-size: 24px;
    line-height: 24px;
    border-radius: 5px;
    width: 100%;
    letter-spacing: 35px;
  }



}
</style>