<template>
  <div class="children" v-if="!isLoading || children.length">
    <base-go-button
        class="children__child"
        v-for="(child, index) in children" :key="index"
        :title="`${child.name} (${child.age} лет)`"
        icon="mdi-human"
        @click="openEditorHandle(child)"
    />
    <div class="children__empty" v-if="!children.length">Добавьте ребенка что бы вы могли его записать</div>
    <base-button v-if="!children.length" class="children__add" type="naked-blue" full-width @click="openEditorHandle({})">Добавить ребенка +</base-button>
    <base-button v-else class="children__add" type="naked" full-width @click="openEditorHandle({})">Добавить ребенка +</base-button>

    <!-- Редактор -->
    <base-backdrop v-model:active="openEditor" title="Редактирование">
      <div class="children__editor">
        <base-input title="Имя" v-model="editChildData.name"/>
        <base-input title="Возраст" v-model="editChildData.age" number/>
        <base-switch title="Пол" v-model="editChildData.gender" :options="[{name: 'Мужской', key: 'M'},{name: 'Женский', key: 'W'}]"/>
        <div class="children__editor-actions">
          <div class="children__editor-actions-columns">
            <base-button v-if="editChildData.id" :loading="isLoading" type="danger-outline" full-width @click="deleteHandle()">Удалить</base-button>
            <base-button type="outline" full-width @click="cancelHandle()">Отмена</base-button>
          </div>
          <base-button :loading="isLoading" full-width @click="saveHandle()">Сохранить</base-button>
        </div>
      </div>
    </base-backdrop>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import BaseGoButton from "../../base/BaseGoButton";
import BaseBackdrop from "../../base/BaseBackdrop";
import BaseInput from "../../base/BaseInput";
import BaseButton from "../../base/BaseButton";
import BaseSwitch from "../../base/BaseSwitch";
import {useParentChildrenStore} from "../../../store/client/parent/children";

const isLoading = ref(true);

const parentChildrenStore = useParentChildrenStore();
await parentChildrenStore.fetchChildren();
isLoading.value = false;

const children = computed(() => parentChildrenStore.getChildren);

const editChildData = ref({});
const openEditor = ref(false);
const openEditorHandle = child => {
  editChildData.value = JSON.parse(JSON.stringify(child));
  openEditor.value = true;
}

const saveHandle = async () => {
  isLoading.value = true;
  if (!editChildData.value?.id) await parentChildrenStore.addChild(editChildData.value);
  else await parentChildrenStore.updateChild(editChildData.value);
  openEditor.value = false;
  isLoading.value = false;
}

const cancelHandle = () => {
  editChildData.value = {};
  openEditor.value = false;
}

const deleteHandle = async () => {
  isLoading.value = true;
  if (editChildData.value?.id) await parentChildrenStore.deleteChild(editChildData.value);
  openEditor.value = false;
  isLoading.value = false;
}

</script>

<style lang="scss" scoped>
.children {

  &__child {
    margin: 8px 0;
  }

  &__add {
    margin-top: 8px;
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

  &__editor-actions-columns {
    display: flex;
    gap: 8px;
    & > * {
      flex: 1;
    }
  }

  &__empty {

  }

}
</style>