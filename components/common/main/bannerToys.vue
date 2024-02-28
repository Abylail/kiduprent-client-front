<template>
  <div :class="[{'banner-toys--mobile': !nuxtApp.$device.isDesktop}, {'banner-toys--desktop': nuxtApp.$device.isDesktop}]">
    <h2 class="banner-toys__title" v-if="props.title">{{ $t('toy_subscription') }}</h2>
    <h3 class="banner-toys__subtitle" v-if="props.title">{{ $t('take_any_toys_any_time') }} <br/><span class="banner-toys__price">{{ $t('just_for_monthly', {price: '18 700'}) }}</span></h3>

    <div class="banner-toys__content">
    <div class="banner-toys__block">
      <video class="banner-toys__video" autoplay muted loop playsinline>
        <source :src="'/bannertoys1.MOV'" type="video/mp4">
      </video>
      <div class="banner-toys__block-into">
        <div class="banner-toys__block-title">{{ $t('select_toys') }}</div>
        <div class="banner-toys__block-description">{{ $t('select_from_catalog_many_toys', {count: '100'}) }}</div>
      </div>
    </div>

    <div class="banner-toys__block reverse">
      <video class="banner-toys__video" autoplay muted loop playsinline>
        <source :src="'/bannertoys2.MOV'" type="video/mp4">
      </video>
      <div class="banner-toys__block-into">
        <div class="banner-toys__block-title">{{ $t('get_and_play') }}</div>
        <div class="banner-toys__block-description">{{ $t('keep_toys_until_boring') }}</div>
      </div>
    </div>

    <div class="banner-toys__block">
      <video class="banner-toys__video" autoplay muted loop playsinline>
        <source :src="'/bannertoys3.MOV'" type="video/mp4">
      </video>
      <div class="banner-toys__block-into">
        <div class="banner-toys__block-title">{{ $t('change_when_you_want') }}</div>
        <div class="banner-toys__block-description">{{ $t('you_can_change_old') }}</div>
      </div>
    </div>
    </div>

    <div>
      <h3 class="banner-toys__price">{{ $t('rates') }}</h3>
      <div class="banner-toys__rates">
        <div class="banner-toys__rate" v-for="(rate, index) in rates" :key="index">
          <div class="banner-toys__rate-title">{{ rate.price_monthly.toLocaleString() }} тг/{{ getDurationUnit(rate.duration) }}</div>
          <div>{{ rate.name_ru }} ({{ rate.price.toLocaleString() }})</div>
        </div>
      </div>
    </div>

    <base-button v-if="props.goCatalog" full-width size="big" @click="router.push('/toys')">{{ $t('look_catalog') }}</base-button>
  </div>
</template>

<script setup>
import {rates} from "../../../config/toysRates";
import BaseButton from "../../base/BaseButton";
import {useRouter} from "nuxt/app";

const nuxtApp = useNuxtApp();
const router = useRouter();

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  goCatalog: {
    type: Boolean,
    default: false
  },
})

const getDurationUnit = (duration) => duration < 1 ? nuxtApp.$t('week_short') : nuxtApp.$t('month_short');
</script>

<style lang="scss" scoped>
.banner-toys--mobile {
  width: calc(100% - 2*#{$side-space-mobile});
  background-size: cover;
  color: $color--blue-dark;
  padding: 24px $side-space-mobile;
  background-color: $color--yellow;
  //border-radius: 10px;

  .banner-toys__title {
    font-weight: bold;
  }

  .banner-toys__subtitle {
    font-weight: normal;
    font-size: $fs--default;
    padding-top: 12px;
  }

  .banner-toys__price {
    color: $color--blue;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .banner-toys__block {
    display: flex;
    flex-direction: row;
    column-gap: 16px;
    margin: 48px 0;

    &.reverse {
      flex-direction: row-reverse;
    }
  }

  .banner-toys__video {
    height: 35vw;
    width: 50vw;
    min-width: 50vw;
    border-radius: 5px;
    overflow: hidden;
    object-fit: cover;
  }

  .banner-toys__block-title {
    font-size: $fs--title;
    font-weight: bold;
  }

  .banner-toys__block-description {
    font-size: $fs--mini;
    padding: 8px 0;
    color: $color--gray-dark;
  }

  .banner-toys__rates {
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
    padding-bottom: 8px;
    margin-bottom: 12px;
  }

  .banner-toys__rate {
    white-space: nowrap;
    padding: 8px 8px;
    border: 1px solid $color--blue;
    color: $color--blue-dark;
    border-radius: 5px;
    margin-right: 8px;
    font-size: $fs--mini;
    transition: .3s;
  }

  .banner-toys__rate-title {
    font-size: $fs--default;
    margin-bottom: 4px;
    font-weight: bold;
  }
}
.banner-toys--desktop {
  background-size: cover;
  color: $color--blue-dark;
  padding: 24px $side-space-mobile;
  background-color: $color--yellow;
  text-align: center;
  border-radius: 10px;


  .banner-toys__content {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .banner-toys__title {
    font-weight: bold;
  }

  .banner-toys__subtitle {
    font-weight: normal;
    font-size: $fs--default;
  }

  .banner-toys__block {
    display: flex;
    flex-direction: column;
    align-items: center;
    column-gap: 16px;
    margin: 24px 0;
    width: 300px;
  }

  .banner-toys__video {
    height: 200px;
    width: 300px;
    min-width: 180px;
    border-radius: 5px;
    overflow: hidden;
    object-fit: cover;
  }

  .banner-toys__price {
    color: $color--blue;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .banner-toys__block-title {
    font-size: $fs--title;
    font-weight: bold;
    margin-top: 24px;
  }

  .banner-toys__block-description {
    font-size: $fs--mini;
    padding: 8px 0;
    color: $color--gray-dark;
  }

  .banner-toys__rates {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    overflow: auto;
    padding-bottom: 8px;
    margin-bottom: 12px;
  }

  .banner-toys__rate {
    white-space: nowrap;
    padding: 8px 8px;
    border: 1px solid $color--blue;
    color: $color--blue-dark;
    border-radius: 5px;
    margin-right: 8px;
    font-size: $fs--mini;
    transition: .3s;
  }

  .banner-toys__rate-title {
    font-size: $fs--default;
    margin-bottom: 4px;
    font-weight: bold;
  }
}
</style>