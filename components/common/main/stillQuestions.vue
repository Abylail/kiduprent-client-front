<template>
  <div class="still-questions container main-page__block">
    <h3 class="still-questions__title title">Остались вопросы?</h3>
    <p class="still-questions__text">Оставьте заявку и ваш вопрос обязательно рассмотрят</p>
    <base-button @click="writeUsHandle()">Напишите нам</base-button>
  </div>

  <!-- Авторизация -->
  <auth-modal v-model:open="openAuthModal" @final="authFinal($event)"/>

  <!-- Форма -->
  <base-backdrop v-model:active="showFormModal" title="Оставьте ваш запрос">
    <div class="still-questions__form container">
      <base-options
          class="still-questions__reason"
          title="Причина вашего обращения"
          v-model="form.reason"
          :options="reasons"
      />

      <textarea
          class="still-questions__input-text"
          v-model="form.text"
          placeholder="Ваш вопрос"
          rows="5"
      />

      <base-button
          class="still-questions__send"
          full-width
          :disabled="!canSendForm"
          @click="sendForm()"
      >Отправить</base-button>
    </div>
  </base-backdrop>

  <!-- Успешно отправлено -->
  <base-backdrop v-model:active="successSendModal">
    <div class="still-questions__success container">
      <base-icon class="still-questions__success-icon" name="mdi-check-circle" color="green" size="100"/>
      <div class="still-questions__success-text">Спасибо за ваше обращение!</div>
      <div class="still-questions__success-subtext">Мы свяжемся с вами по номеру {{ connectPhone }}</div>
    </div>
  </base-backdrop>
</template>

<script setup>
import BaseButton from "../../base/BaseButton";
import BaseBackdrop from "../../base/BaseBackdrop";
import BaseOptions from "../../base/BaseOptions";
import AuthModal from "../auth/authModal";
import {useAuthStore} from "../../../store/client/parent/auth";
import BaseIcon from "../../base/BaseIcon";
import {computed} from "vue";

const openAuthModal = ref(false);
const showFormModal = ref(false);
const successSendModal = ref(false);

const authStore = useAuthStore();

// Напишите нам, кнопка
const writeUsHandle = () => {
  if (authStore.isAuth) showFormModal.value = true;
  else openAuthModal.value = true;
}

const authFinal = (successAuth) => {
  if (successAuth) showFormModal.value = true;
}

const reasons = [
  { key: "Нашел ошибку", name: "Нашел ошибку" },
  { key: "У меня вопрос", name: "У меня вопрос" },
  { key: "Хочу добавить центр", name: "Хочу добавить центр" },
  { key: "Другое", name: "Другое" },
]

const form = ref({text: "", reason: null});
const clearForm = () => {
  form.value.text = "";
  form.value.reason = null;
}
const sendForm = () => {
  showFormModal.value = false;
  successSendModal.value = true;
  clearForm();
}

const canSendForm = computed(() => form.value.text && form.value.reason)
const connectPhone = computed(() => authStore.getClientData?.phone)
</script>

<style lang="scss" scoped>
.still-questions {
  border-radius: 10px;
  background-color: white;
  padding: 20px;
  text-align: center;
  width: calc(100% - 4*#{$side-space-mobile});
  margin-left: auto;
  margin-right: auto;

  &__title {
    margin-bottom: 5px;
  }

  &__text {
    margin: 5px 0 20px;
    color: $color--gray-dark;
  }

  &__reason {
    margin-bottom: 40px;
  }

  &__input-text {
    width: calc(100% - 16px);
    border: 1px solid $color--gray;
    border-radius: 10px;
    font-size: 16px;
    padding: 8px;
    resize: none;
    margin-bottom: 40px;
  }

  &__send {
    margin-top: 20px;
  }

  &__success {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  &__success-icon {
    margin: 32px 0;
  }

  &__success-text {
    margin: 8px 0;
    font-weight: bolder;
  }

  &__success-subtext {
    margin-bottom: 32px;
  }
}
</style>