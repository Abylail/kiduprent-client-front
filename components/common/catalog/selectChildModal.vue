<template>
  <base-backdrop :title="selectChildTitle" :active="openSelect" @update:active="updateOpenSelect($event)">

    <div class="select-child-modal" v-if="isCreatingChild">
      create child
    </div>

    <div class="select-child-modal" v-else>
      select child
    </div>

  </base-backdrop>

  <auth-modal v-model:open="openAuth" @final="authFinal($event)"/>
</template>

<script setup>
import BaseBackdrop from "../../base/BaseBackdrop";
import {computed, watch} from "vue";
import {useAuthStore} from "../../../store/client/parent/auth";
import AuthModal from "../auth/authModal";
import {useParentChildrenStore} from "../../../store/client/parent/children";

const emit = defineEmits(["update:open"])
const props = defineProps({
  open: Boolean
})

const parentChildrenStore = useParentChildrenStore();
const children = computed(() => parentChildrenStore.getChildren);

const isCreatingChild = ref(false);
const selectChildTitle = computed(() => isCreatingChild.value ? "Создание" : "Выберите ребенка")

const openAuth = ref(false);
const authFinal = async (successAuth) => {
  await parentChildrenStore.fetchChildren();
  if (!successAuth) emit("update:open", false);
  else {
    setTimeout(() => {
      showSelect();
    }, 300);
  }
}

const openSelect = ref(false);
const updateOpenSelect = val => {
  openSelect.value = val;
  if (!val) emit("update:open", false);
}
const showSelect = () => {
  isCreatingChild.value = !children.value.length;
  openSelect.value = true;
}

const authStore = useAuthStore();

const onOpen = async () => {
  if (authStore.isAuth) {
    await parentChildrenStore.fetchChildren();
    showSelect();
  }
  else openAuth.value = true;
}

const onClose = () => {
  isCreatingChild.value = false;
}

watch(() => props.open, (val) => {
  if (val) onOpen();
  else onClose();
})
</script>

<style lang="scss" scoped>
.select-child-modal {
  padding: 0 $side-space-mobile;
}
</style>