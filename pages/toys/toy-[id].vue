<template>
  <mobile-header
      :title="$t('description')"
      go-back="/toys"
      lang-switch
  />

  <div :class="{'toy-details--mobile': !nuxtApp.$device.isDesktop, 'toy-details--desktop': nuxtApp.$device.isDesktop}">
    <base-mini-photos
        class="toy-details-photos"
        v-if="toysStore.getSingle?.photos"
        :list="toysStore.getSingle?.photos"
        :rounded="false"
        object-fit="contain"
        full-on-click
    />

    <div class="toy-details-info container--white">
      <h1 class="toy-details-title">{{ $getProp(toysStore.getSingle, 'name') }}</h1>
      <div class="toy-details-description">
        {{ age }}
      </div>
      <div class="toy-details-tokens">
        <base-icon class="toy-details-tokens__icon" name="mdi-currency-usd" size="14" color="white"/>
        {{ toysStore.getSingle.token }} токен
      </div>

      <div class="toy-details-basket">
        <base-button
            v-if="!isIncluded"
            class="toy-card__add"
            type="yellow"
            full-width
            @click.stop.prevent="addHandle()"
        >{{ $t('add_button') }}</base-button>
        <div class="toy-details-basket-added" v-else>
          <base-button
              class="toy-card__add"
              type="outline-gray"
              @click.stop.prevent="removeHandle()"
          >
            <base-icon name="mdi-delete"/>
          </base-button>
          <base-button
              class="toy-card__add"
              type="naked-blue"
              full-width
              @click.stop.prevent="goCart()"
          >{{ $t('add_to_cart') }}</base-button>
        </div>
      </div>
    </div>

    <div class="toy-details-info container--white">
      <div v-if="$getProp(toysStore.getSingle, 'purpose')">
        <div class="toy-details-subtitle">{{ $t('purpose') }}</div>
        <div class="toy-details-description">
          <base-cut-text :text="$getProp(toysStore.getSingle, 'purpose')" :max-symbols="200"/>
        </div>
      </div>

      <div>
        <div class="toy-details-subtitle">{{ $t('description') }}</div>
        <div class="toy-details-description">
          <base-cut-text :text="$getProp(toysStore.getSingle, 'description')" :max-symbols="200"/>
        </div>
      </div>

      <div v-if="$getProp(toysStore.getSingle, 'size')">
        <div class="toy-details-subtitle">{{ $t('size') }}</div>
        <div class="toy-details-description">
          <base-cut-text :text="$getProp(toysStore.getSingle, 'size')" :max-symbols="200"/>
        </div>
      </div>

      <div v-if="$getProp(toysStore.getSingle, 'material')">
        <div class="toy-details-subtitle">{{ $t('material') }}</div>
        <div class="toy-details-description">
          <base-cut-text :text="$getProp(toysStore.getSingle, 'material')" :max-symbols="200"/>
        </div>
      </div>
    </div>

    <banner-toys title/>

    <a class="toy-details-help" href="https://wa.me/77753862246" target="_blank">{{ $t('manager_help') }}</a>

  </div>

</template>

<script setup>
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
import {useToysStore} from "../../store/toys";
import {computed} from "vue";
import {useRoute, useRouter} from "nuxt/app";
import BaseMiniPhotos from "../../components/base/BaseMiniPhotos";
import BaseIcon from "../../components/base/BaseIcon";
import BaseButton from "../../components/base/BaseButton";
import {useToysCartStore} from "../../store/toys/basket";
import BaseCutText from "../../components/base/BaseCutText";
import BannerToys from "../../components/common/main/bannerToys";

const nuxtApp = useNuxtApp();

const toysStore = useToysStore();

const router = useRouter();
const route = useRoute();
const toyId = computed(() => +route.params.id);

await toysStore.fetchOne(toyId.value);


const toysCartStore = useToysCartStore();

const isIncluded = computed(() => process.client && toysCartStore.getIdList.includes(toysStore.getSingle.id));

// Перейти в корзину
const goCart = () => {
  router.push("/basket");
}

// Добавить игрушку в корзину
const addHandle = () => {
  if (process.server) return;
  toysCartStore.addToy(toysStore.getSingle);
}

// Добавить игрушку в корзину
const removeHandle = () => {
  if (process.server) return;
  toysCartStore.removeToy(toysStore.getSingle);
}

// Получить возраст
const age = computed(() => {
  let minAge = "";
  if (!toysStore.getSingle.min_age) minAge = "";
  else if (toysStore.getSingle.min_age % 12 === 0) minAge = nuxtApp.$t("from_age_year", {age: toysStore.getSingle.min_age/12});
  else minAge = nuxtApp.$t("from_age_month", {age: toysStore.getSingle.min_age});

  const maxAge = toysStore.getSingle.max_age % 12 === 0
      ? nuxtApp.$t("until_age_year", {age: toysStore.getSingle.max_age/12})
      : nuxtApp.$t("until_age_month", {age: toysStore.getSingle.max_age})
  return `${minAge} ${maxAge}`
})
</script>

<style lang="scss" scoped>
.toy-details--mobile {

  .toy-details-photos {
    height: 70vw;
    max-height: 400px;
    background-color: white;
  }

  .toy-details-title {
    font-size: $fs--title;
    font-weight: bold;
    margin: 12px 0 8px;
  }

  .toy-details-subtitle {
    font-size: $fs--default;
    font-weight: bold;
    margin: 8px 0 4px;
  }

  .toy-details-info {
    margin-bottom: 16px;
    font-weight: normal;
  }

  .toy-details-tokens {
    color: $color--blue-dark;

    &__icon {
      border: 1px solid black;
      border-radius: 100%;
      padding: 1px;
      background-color: $color--blue-dark;
    }
  }

  .toy-details-basket {
    margin-top: 16px;
  }

  .toy-details-basket-added {
    display: flex;
    gap: 8px;
  }

  .toy-details-description {
    color: $color--gray-dark;
    white-space: pre-wrap;
    text-align: left;
  }

  .toy-details-help {
    display: block;
    text-align: center;
    margin: 24px auto;
    color: $color--blue;
  }
}
</style>