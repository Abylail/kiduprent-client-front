<template>
  <div class="card-list">
    <div class="card-list__head container">
      <h2 class="card-list__title title">{{ props.title }}</h2>
      <nuxt-link class="card-list__go-all" v-if="props.to" :to="props.to">Смотреть все</nuxt-link>
    </div>

    <div class="card-list__content container--white">
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
.card-list {

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
    white-space:nowrap;
    overflow-x: auto;
    padding-top: 15px;
    padding-bottom: 15px;
    scroll-snap-type: x mandatory;

    // Для элементов внутри контента
    ::v-deep {
      & > * {
        margin-right: 10px;
        scroll-snap-align: center;
      }
    }
  }

}
</style>