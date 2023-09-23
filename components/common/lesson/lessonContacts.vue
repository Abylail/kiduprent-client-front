<template>
  <div class="lesson-contacts" v-for="(contact, index) in contacts" :key="index">
    <h4 class="lesson-contacts__item-address" v-if="!isSameBranches">Филиал: {{ contact.address }}</h4>

    <p class="lesson-contacts__item" v-if="contact.call_phone">
      <base-icon name="mdi-cellphone"/>
      <span>Сотовый номер:</span>
      <a class="lesson-contacts__link">{{ contact.call_phone }}</a>
    </p>

    <p class="lesson-contacts__item" v-if="contact.whatsapp_phone">
      <base-icon name="mdi-whatsapp" color="green"/>
      <span>WhatsApp:</span>
      <a class="lesson-contacts__link">Написать</a>
    </p>

    <p class="lesson-contacts__item" v-if="contact.email">
      <base-icon name="mdi-email-outline"/>
      <span>Email:</span>
      <a class="lesson-contacts__link">{{ contact.email }}</a>
    </p>
  </div>
</template>

<script setup>
import BaseIcon from "../../base/BaseIcon";
import {computed} from "vue";

const props = defineProps({
  groups: Array
})

const isSameBranches = computed(() => props.groups?.every(g => g.institutionBranch?.id === props.groups?.[0]?.institutionBranch?.id))

const getBranchContacts = ({address, call_phone, whatsapp_phone, email,instagram_url, two_gis_url}) => ({address, call_phone, whatsapp_phone, email, instagram_url, two_gis_url})
const contacts = computed(() => isSameBranches
    ? [getBranchContacts(props.groups?.[0]?.institutionBranch)]
    : props.groups?.map(g => getBranchContacts(g?.institutionBranch))
);
</script>

<style lang="scss" scoped>
.lesson-contacts {
  padding-top: 16px;

  &__item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: $fs--mini;
    &:not(:last-child) {margin-bottom: 8px;}
  }

  &__item-address {
    margin-bottom: 8px;
  }

  &__link {
    color: $color--blue;
  }

}
</style>