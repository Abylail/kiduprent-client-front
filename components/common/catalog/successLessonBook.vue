<template>
  <base-backdrop :active="props.open" @update:active="emit('update:open', $event)">
    <div class="success-lesson-book">
      <base-icon class="success-lesson-book__icon" name="mdi-check-circle" color="green" size="100"/>
      <div>
        Вы успешно записались!
      </div>
    </div>
  </base-backdrop>
</template>

<script setup>
import BaseBackdrop from "../../base/BaseBackdrop";
import BaseIcon from "../../base/BaseIcon";

const emit = defineEmits(["update:open"])
const props = defineProps({
  open: Boolean
})
</script>

<style lang="scss" scoped>
.success-lesson-book {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
}
</style>