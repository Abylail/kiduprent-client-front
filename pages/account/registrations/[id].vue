<template>
  <mobile-header title="Запись на пробный" go-back="/account"/>
  <div class="registration-details">
    registration-details
  </div>
</template>

<script setup>
import MobileHeader from "../../../components/common/layoutComponents/mobileHeader";
import {useParentRegistration} from "../../../store/client/parent/registration";
import {computed} from "vue";
import {useRoute} from "nuxt/app";

const route = useRoute();
const trialId = computed(() => route.params.id);

const parentRegistrationStore = useParentRegistration();
parentRegistrationStore.fetchDetailsRegistration(trialId.value);
</script>

<style scoped>

</style>