<template>
  <base-go-button
      :title="`${personalData.last_name} ${personalData.first_name}`"
      :sub-title="personalData.phone"
      icon="mdi-account-box"
      @click="openEditorHandle()"
  />

  <base-backdrop v-model:active="openEditor" title="Личные данные">
    <div class="personal-data__editor">
      <base-input title="Фамилия" v-model="editorPersonalData.last_name"/>
      <base-input title="Имя" v-model="editorPersonalData.first_name"/>
      <base-input title="Номер" v-model="editorPersonalData.phone" phone/>
      <div class="personal-data__editor-actions">
        <base-button type="outline" full-width @click="cancelHandle()">Отмена</base-button>
        <base-button full-width @click="saveHandle()">Сохранить</base-button>
      </div>
    </div>
  </base-backdrop>
</template>

<script setup>
import {ref} from "vue";
import BaseButton from "../../base/BaseButton";
import BaseBackdrop from "../../base/BaseBackdrop";
import BaseInput from "../../base/BaseInput";
import BaseGoButton from "../../base/BaseGoButton";

const personalData = ref({first_name: "Абылай", last_name: "Базарбаев", phone: "+7 705 670 78 91"});
const editorPersonalData = ref({});

const openEditor = ref(false);
const openEditorHandle = () => {
  editorPersonalData.value = JSON.parse(JSON.stringify(personalData.value));
  openEditor.value = true;
}

const cancelHandle = () => {
  openEditor.value = false;
}
const saveHandle = () => {
  openEditor.value = false;
  personalData.value = editorPersonalData.value;
}
</script>

<style lang="scss" scoped>
.personal-data {

  &__editor {
    padding: 10px $side-space-mobile;
  }

  &__item {
    padding: 8px 0;
  }

  &__editor-actions {
    margin-top: 50px;
    & > *:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}
</style>