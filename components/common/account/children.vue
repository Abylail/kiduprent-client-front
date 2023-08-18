<template>
  <div class="children">
    <base-go-button
        class="children__child"
        v-for="(child, index) in children" :key="index"
        :title="`${child.name} (${child.age} лет)`"
        icon="mdi-human"
        @click="openEditorHandle(child)"
    />
    <button class="children__add" @click="openEditorHandle({})">Добавить ребенка +</button>

    <!-- Редактор -->
    <base-backdrop v-model:active="openEditor" title="Редактирование">
      <div class="children__editor">
        <base-input title="Имя" v-model="editChildData.name"/>
        <base-input title="Возраст" v-model="editChildData.age" number/>
        <base-switch title="Пол" v-model="editChildData.gender" :options="[{name: 'Мужской', key: 'm'},{name: 'Женский', key: 'w'}]"/>
        <div class="children__editor-actions">
<!--          <base-button type="danger-outline" full-width>Удалить</base-button>-->
          <base-button type="outline" full-width @click="cancelHandle()">Отмена</base-button>
          <base-button full-width @click="saveHandle()">Сохранить</base-button>
        </div>
      </div>
    </base-backdrop>
  </div>
</template>

<script setup>
import {ref} from "vue";
import BaseGoButton from "../../base/BaseGoButton";
import BaseBackdrop from "../../base/BaseBackdrop";
import BaseInput from "../../base/BaseInput";
import BaseButton from "../../base/BaseButton";
import BaseSwitch from "../../base/BaseSwitch";

const children = ref([{id: 1, name: "Ансар", age: 10, gender: "m"}, {id: 2, name: "Арина", age: 8, gender: "w"}]);

const editChildData = ref({});
const openEditor = ref(false);
const openEditorHandle = child => {
  editChildData.value = JSON.parse(JSON.stringify(child));
  openEditor.value = true;
}

const saveHandle = () => {
  const childIndex = editChildData.value.id ? children.value.findIndex(c => c.id === editChildData.value.id) : -1;
  if (childIndex < 0) children.value = [...children.value, editChildData.value]
  else children.value[childIndex] = editChildData.value;
  openEditor.value = false;
  console.log(children.value);
}

const cancelHandle = () => {
  editChildData.value = {};
  openEditor.value = false;
}

</script>

<style lang="scss" scoped>
.children {

  &__child {
    margin: 8px 0;
  }

  &__add {
    font-size: $fs--default;
    text-align: center;
    width: 100%;
    background-color: $color--gray-light;
    padding: 12px;
    font-weight: bold;
    border-radius: 14px;
    color: $color--blue;
  }

  &__editor {
    padding: 10px $side-space-mobile;
  }

  &__editor-actions {
    margin-top: 50px;
    & > *:not(:last-child) {
      margin-bottom: 8px;
    }
  }

}
</style>