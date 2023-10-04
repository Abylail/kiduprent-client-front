<template>
  <div class="children-editor">
    <base-input title="Имя" v-model="props.modelValue.name"/>
    <base-input title="Возраст" v-model="props.modelValue.age" number/>
    <base-switch title="Пол" v-model="props.modelValue.gender" :options="[{name: 'Мужской', key: 'M'},{name: 'Женский', key: 'W'}]"/>
    <div class="children-editor__actions">
      <div class="children-editor__actions-columns">
        <base-button v-if="props.modelValue.id" :loading="props.loading" type="danger-outline" full-width @click="deleteHandle()">Удалить</base-button>
        <base-button v-if="props.cancelable" type="outline" full-width @click="cancelHandle()">{{ props.cancelText }}</base-button>
      </div>
      <base-button :loading="props.loading" full-width @click="saveHandle()">Сохранить</base-button>
    </div>
  </div>
</template>

<script setup>
import BaseButton from "../../base/BaseButton";
import BaseSwitch from "../../base/BaseSwitch";
import BaseInput from "../../base/BaseInput";

const emit = defineEmits(["update:modelValue", "save", "delete", "cancel"])
const props = defineProps({
  modelValue: Object,
  loading: Boolean,
  cancelText: {
    type: String,
    default: "Отмена"
  },
  cancelable: {
    type: Boolean,
    default: true
  }
})

const deleteHandle = () => {
  emit("delete");
}

const cancelHandle = () => {
  emit("cancel");
}

const saveHandle = () => {
  emit("save");
}
</script>

<style lang="scss" scoped>
.children-editor {

  &__actions {
    margin-top: 50px;
    & > *:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  &__actions-columns {
    display: flex;
    gap: 8px;
    & > * {
      flex: 1;
    }
  }

}
</style>