<template>
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
</template>

<script setup>
import BaseBackdrop from "../base/BaseBackdrop";
import BaseButton from "../base/BaseButton";
import BaseSwitch from "../base/BaseSwitch";
import BaseInput from "../base/BaseInput";
</script>

<style scoped>

</style>