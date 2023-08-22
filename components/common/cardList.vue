<template>
  <div class="lesson-card-list">
    <div class="lesson-card-list__head">
      <h2 class="lesson-card-list__title title">{{ props.title }}</h2>
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
  margin: 16px 0;

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
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: auto;
    white-space:nowrap;
    overflow-x: auto;
    padding: 15px 0;

    // Для элементов внутри контента
    ::v-deep {
      & > * {
        margin-right: 10px;
        flex: 1;
      }
    }
  }

}
</style>