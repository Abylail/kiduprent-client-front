<template>
  <base-button @click="openBackdrop = true">Вход / Регистрация</base-button>

  <!-- Авторизация -->
  <base-backdrop v-model:active="openBackdrop" :title="title">

    <div class="auth__content" v-if="step === 1">
      <base-input
          v-model="phone"
          title="Сотовый номер"
          type="naked-gray"
          prev-icon="mdi-phone-outline"
          phone
      />
      <base-button
          class="auth__submit"
          :class="{disabled: !phoneValid}"
          :loading="isLoading"
          full-width
          @click="sendSmsHandle()"
      >Отправить смс</base-button>
    </div>

    <div class="auth__content" v-if="step === 2">
      <otp-input v-model="otp" :error="!!error"/>
      <div class="auth__hint">Введите полученный смс код</div>
      <div class="auth__error" v-if="error">{{ error }}</div>
      <base-button
          class="auth__submit"
          :class="{disabled: !otpValid}"
          :loading="isLoading"
          full-width
          @click="submitOtp()"
      >Войти</base-button>
    </div>
  </base-backdrop>
</template>

<script setup>
import BaseBackdrop from "../../base/BaseBackdrop";
import BaseButton from "../../base/BaseButton";
import {useAuthStore} from "../../../store/client/parent/auth";
import {computed, watch} from "vue";
import BaseInput from "../../base/BaseInput";
import OtpInput from "./otpInput";
import {phonePreparing} from "../../../helpers/phone";

// Открыто ?
const openBackdrop = ref(false);
watch(openBackdrop, (val) => {
  // Очищаю данные после закрытия
  if (!val) setTimeout(() => resetData(), 300);
})

// Сбросить все данные
const resetData = () => {
  otp.value = null;
  phone.value = null;
  error.value = null;
  step.value = 1;
}

// На успешный логин
const successLogin = () => {
  openBackdrop.value = false;
}

const authStore = useAuthStore();

const isLoading = ref(false);

const error = ref(null);

// Телефон пользователя
const phone = ref(null);
const phoneValid = computed(() => !!phone.value)
const sendSmsHandle = async () => {
  isLoading.value = true;
  const isSuccess = await authStore.sendOtp(phonePreparing(phone.value));
  isLoading.value = false;

  if (isSuccess) step.value = 2;
}

// Одноразовый пароль
const otp = ref(null);
const otpValid = computed(() => otp.value?.length === 4)
const submitOtp = async () => {
  isLoading.value = true;
  const isSuccess = await authStore.login(phonePreparing(phone.value), otp.value);
  isLoading.value = false;

  if (isSuccess) successLogin();
  else {
    otp.value = "";
    error.value = "Неправильный пароль";
  }
}

const step = ref(1);

const title = computed(() => {
  if (step.value === 1) return "Введите номер";
  if (step.value === 2) return "Введите смс";
  return null;
})

</script>

<style lang="scss" scoped>
.auth {

  &__content {
    padding: 0 $side-space-mobile;
  }

  &__submit {
    margin-top: 24px;
  }

  &__hint {
    color: $color--gray-dark;
    font-size: $fs--mini;
  }

  &__error {
    color: $color--red;
    font-size: $fs--mini;
  }

}
</style>