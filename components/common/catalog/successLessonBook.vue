<template>
  <base-backdrop :active="props.open" @update:active="emit('update:open', $event)" @onClose="emit('onClose')">
    <div class="success-lesson-book container">
      <base-icon class="success-lesson-book__icon" name="mdi-check-circle" color="green" size="100"/>
      <div class="success-lesson-book__info">
        Вы успешно записались на урок <strong>"{{ props.lesson?.name }}"</strong>!
      </div>
      <br/>
      <div class="success-lesson-book__info">
        Мы ждем вас по адресу <strong>{{props.group?.institutionBranch?.address}}</strong>
      </div>
      <div class="success-lesson-book__info">
        <strong>{{ day }}</strong>
      </div>
      <base-button
          class="success-lesson-book__my-registrations"
          type="outline"
          full-width
          @click="goMyRegistrations()"
      >Мои записи</base-button>
    </div>
  </base-backdrop>
</template>

<script setup>
import BaseBackdrop from "../../base/BaseBackdrop";
import BaseIcon from "../../base/BaseIcon";
import BaseButton from "../../base/BaseButton";
import {computed} from "vue";
import {useRouter} from "nuxt/app";

const emit = defineEmits(["update:open", "onClose"])
const props = defineProps({
  open: Boolean,
  group: Object,
  lesson: Object,
  day: Object
})

const day = computed(() => `${props.day?.info.name} ${props.day?.time} (${props.day?.date.toLocaleString('ru', { day: 'numeric', month: 'long' })})`);

// Перейти в мои записи
const router = useRouter();
const goMyRegistrations = () => {
  router.push("/account")
}
</script>

<style lang="scss" scoped>
.success-lesson-book {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  &__icon {
    margin: 32px 0;
  }

  &__info {
    margin: 8px 0;
  }

  &__my-registrations {
    margin-top: 64px;
    margin-bottom: 16px;
  }
}
</style>