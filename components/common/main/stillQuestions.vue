<template>
  <div class="still-questions container main-page__block">
    <h3 class="still-questions__title title">Остались вопросы?</h3>
    <p class="still-questions__text">Оставьте заявку и ваш вопрос обязательно рассмотрят</p>
    <base-button @click="showModal = true">Напишите нам</base-button>
  </div>

  <auth-modal v-model:open="openAuth" @final="authFinal($event)"/>

  <base-backdrop v-model:active="showModal" title="Оставьте ваш запрос">
    <div class="still-questions__form container">
      <base-options
          title="Причина вашего обращения"
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
          @click="sendForm()"
      >Отправить</base-button>
    </div>
  </base-backdrop>
</template>

<script setup>
import BaseButton from "../../base/BaseButton";
import BaseBackdrop from "../../base/BaseBackdrop";
import BaseOptions from "../../base/BaseOptions";
import AuthModal from "../auth/authModal";

const openAuth = ref(false);
const showModal = ref(false);

const authFinal = () => {}

const reasons = [
  { key: "error", name: "Нашел ошибку" },
  { key: "Кое что не понял", name: "Нашел ошибку" },
]

const form = ref({text: ""});
const sendForm = () => {
  console.log(form.value);
}

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

  &__input-text {
    width: calc(100% - 16px);
    border: 1px solid $color--gray;
    border-radius: 10px;
    font-size: 16px;
    padding: 8px;
    resize: none;
  }

  &__send {
    margin-top: 20px;
  }
}
</style>