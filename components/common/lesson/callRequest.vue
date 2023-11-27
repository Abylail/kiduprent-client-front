<template>
  <div class="call-request">
    <base-button :loading="isLoading" full-width @click="requestHandle()">Связаться с центром</base-button>
  </div>
  <auth-modal
      v-model:open="showAuth"
      @final="authEnd($event)"
  />

  <base-backdrop v-model:active="showSuccessRequest">
    <div class="call-request__success container">
      <base-icon class="call-request__success-icon" name="mdi-check-circle" color="green" size="100"/>
      <div class="call-request__success-text">Спасибо за ваше обращение!</div>
      <div class="call-request__success-subtext">Администратор свяжется с вами по номеру {{ connectPhone }}</div>
      <base-button type="outline" full-width @click="closeSuccess()">Хорошо</base-button>
    </div>
  </base-backdrop>
</template>

<script setup>
import BaseButton from "../../base/BaseButton";
import AuthModal from "../auth/authModal";
import {useAuthStore} from "../../../store/client/parent/auth";
import BaseBackdrop from "../../base/BaseBackdrop";
import {useParentRegistration} from "../../../store/client/parent/registration";
import BaseIcon from "../../base/BaseIcon";
import {computed} from "vue";

const props = defineProps({
  center: {
    type: Object,
    default: () => ({})
  }
})

const authStore = useAuthStore();
const registrationStore = useParentRegistration()

const connectPhone = computed(() => authStore.getClientData?.phone)

const showAuth = ref(false);
const showSuccessRequest = ref(false);
const isLoading = ref(false);

// Конец авторизации
const authEnd = (success = false) => {
  if (success) sendRequest()
}

const requestHandle = () => {
  if (authStore.isAuth) sendRequest()
  else showAuth.value = true;
}

const sendRequest = async () => {
  isLoading.value = true;
  await registrationStore.callRequest(props.center.id)
  isLoading.value = false;
  showSuccessRequest.value = true;
}

const closeSuccess = () => {
  showSuccessRequest.value = false;
}
</script>

<style lang="scss" scoped>
.call-request {

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