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

      <!-- Для подключения центра -->
      <div v-if="form.reason === 'Хочу добавить центр'">
        <base-input
            title="Название центра"
            v-model="centerForm.centerName"
        />
        <base-input
            title="Ваше имя"
            v-model="centerForm.directorName"
        />
        <base-input
            title="Город"
            v-model="centerForm.city"
        />
      </div>

      <textarea
          v-else
          class="still-questions__input-text"
          v-model="form.text"
          placeholder="Ваш вопрос"
          rows="5"
      />

      <base-button
          class="still-questions__send"
          full-width
          :loading="formLoading"
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
import {useParentRequest} from "../../../store/client/parent/request";
import BaseInput from "../../base/BaseInput";

const openAuthModal = ref(false);
const showFormModal = ref(false);
const successSendModal = ref(false);

// Форма для подключения центра
const centerForm = ref({
  centerName: "",
  directorName: "",
  city: "Алматы",
})
const centerFormText = computed(() => {
  return `Название центра: ${centerForm.value.centerName} \n Имя директора: ${centerForm.value.directorName} \n Город: ${centerForm.value.city}`
})

// Можно ли отправить форму центра
const centerFormCanSubmit = computed(() => centerForm.value.centerName && centerForm.value.directorName && centerForm.value.city)

const authStore = useAuthStore();
const parentRequest = useParentRequest();

// Напишите нам, кнопка
const writeUsHandle = () => {
  if (authStore.isAuth) showFormModal.value = true;
  else openAuthModal.value = true;
}

const authFinal = (successAuth) => {
  if (successAuth) showFormModal.value = true;
}

const reasons = [
  { key: "Хочу добавить центр", name: "Хочу добавить центр" },
  { key: "У меня вопрос", name: "У меня вопрос" },
  { key: "Другое", name: "Другое" },
]

const formLoading = ref(false);
const form = ref({text: "", reason: null});
const clearForm = () => {
  form.value.text = "";
  form.value.reason = null;
  centerForm.value = {
    centerName: "",
    directorName: "",
    city: "Алматы",
  }
}
const sendForm = async () => {
  formLoading.value = true;
  const successSend = await parentRequest.sendRequest({
    reason: form.value.reason,
    text: form.value.reason === "Хочу добавить центр" ? centerFormText.value : form.value.text,
  })
  if (successSend) {
    showFormModal.value = false;
    successSendModal.value = true;
    clearForm();
  }
  formLoading.value = false;
}

// Можно ли отправить форму
const canSendForm = computed(() => {
  if (form.value.reason === 'Хочу добавить центр') return centerFormCanSubmit.value;
  return form.value.text && form.value.reason
})
const connectPhone = computed(() => authStore.getClientData?.phone)
</script>

<style lang="scss" scoped>
.still-questions {
  border-radius: 10px;
  background-color: white;
  padding: 20px;
  text-align: center;
  width: calc(100% - 4*#{$side-space-mobile});
  margin: 16px auto;

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