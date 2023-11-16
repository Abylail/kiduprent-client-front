<template>
  <div class="lesson-contacts" v-for="(contact, index) in contacts" :key="index">
    <h4 class="lesson-contacts__item-address" v-if="!isSameBranches">Филиал: {{ contact?.address }}</h4>

    <p class="lesson-contacts__item" v-if="contact?.call_phone">
      <base-icon name="mdi-cellphone"/>
      <span>Сотовый номер:</span>
      <a class="lesson-contacts__link" :href="getPhoneLink(contact?.call_phone)">{{ contact?.call_phone }}</a>
    </p>

    <p class="lesson-contacts__item" v-if="contact.whatsapp_phone">
      <base-icon name="mdi-whatsapp" color="green"/>
      <span>WhatsApp:</span>
      <a class="lesson-contacts__link" :href="getWhatsappLink(contact.whatsapp_phone)">Написать</a>
    </p>

    <p class="lesson-contacts__item" v-if="contact.email">
      <base-icon name="mdi-email-outline"/>
      <span>Email:</span>
      <span class="lesson-contacts__link">{{ contact.email }}</span>
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

const getBranchContacts = (_contacts) => ({
  address: _contacts?.address,
  call_phone: _contacts?.call_phone,
  whatsapp_phone: _contacts?.whatsapp_phone,
  email: _contacts?.email,
  instagram_url: _contacts?.instagram_url,
  two_gis_url: _contacts?.two_gis_url
})
const contacts = computed(() => isSameBranches
    ? [getBranchContacts(props.groups?.[0]?.institutionBranch)]
    : props.groups?.map(g => getBranchContacts(g?.institutionBranch || {}))
);

// Получить ссылку whatsapp
const getPhoneLink = (phone) => {
  return `tel:${phone}`
}

// Получить ссылку whatsapp
const getWhatsappLink = (phone) => {
  return `https://wa.me/${phone}?text=%D0%97%D0%B4%D1%80%D0%B0%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%9F%D0%B8%D1%88%D1%83%20%D0%B2%D0%B0%D0%BC%20%D0%B8%D0%B7%20%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F%20kidup.kz%20%D0%BF%D0%BE%20%D0%BF%D0%BE%D0%B2%D0%BE%D0%B4%D1%83%20%D0%B7%D0%B0%D0%BD%D1%8F%D1%82%D0%B8%D0%B9%20...`;
}
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