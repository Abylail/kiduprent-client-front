<template>
  <base-backdrop :title="selectChildTitle" :active="openSelect" @update:active="updateOpenSelect($event)">

    <div class="select-child-modal" v-if="isCreatingChild">
      create child
    </div>

    <!-- Выбор ребенка -->
    <div class="select-child-modal" v-else>
      <div
          class="select-child-modal__child-item"
          :class="{'active': selectedChild?.id === child.id}"
          v-for="child in children" :key="child.id"
          @click="selectedChild = child"
      >
        <span>{{ child.name }}</span>
        <span class="select-child-modal__child-tick" :class="{'active': selectedChild?.id === child.id}"/>
      </div>
      <base-button class="children__add" type="naked" full-width @click="addChild()">Добавить ребенка +</base-button>

      <div class="select-child-modal__action">
        <base-button :disabled="!selectedChild" full-width>Записаться</base-button>
      </div>
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
import BaseButton from "../../base/BaseButton";

const emit = defineEmits(["update:open"])
const props = defineProps({
  open: Boolean
})

const isCreatingChild = ref(false);
const selectChildTitle = computed(() => isCreatingChild.value ? "Создание" : "Выберите ребенка")

const parentChildrenStore = useParentChildrenStore();
const children = computed(() => parentChildrenStore.getChildren);
const selectedChild = ref(null);

const addChild = () => {
  isCreatingChild.value = true;
}

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

  &__child-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: $color--gray-light;
    border-radius: 10px;
    margin: 12px 0;
    border: 1px solid transparent;

    &.active {
      border-color: $color--blue;
    }
  }

  &__child-tick {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 16px;
    width: 16px;
    border: 2px solid $color--gray-dark;
    border-radius: 100%;

    &.active::after {
      display: block;
      content: "";
      height: 12px;
      width: 12px;
      background-color: $color--blue;
      border-radius: 100%;
    }
  }

  &__action {
    margin-top: 50px;
  }
}
</style>