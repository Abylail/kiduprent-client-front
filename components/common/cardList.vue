<template>
  <div class="lesson-card-list">
    <div class="lesson-card-list__head">
      <span class="title">{{ props.title }}</span>
      <nuxt-link class="lesson-card-list__go-all" v-if="props.to" :to="props.to">Смотреть все</nuxt-link>
    </div>

    <div class="lesson-card-list__content">
      <slot/>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  list: {
    type: Array,
    default: () => ([
        { title: "Программирование для детей", rating: 4.9, address: "Макатаева 189", lang: "ru" }
    ])
  },
  to: {
    type: String,
    default: null
  }
})
</script>

<style lang="scss" scoped>
.lesson-card-list {
  margin-top: 20px;

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__go-all {
    color: $color--blue;
    font-weight: bold;
    font-size: $fs--mini;
  }

  &__content {
    width: auto;
    white-space:nowrap;
    overflow-x: auto;
    padding: 15px 0;

    // Для элементов внутри контента
    ::v-deep {
      & > * {
        margin-right: 10px;
      }
    }
  }

}
</style>