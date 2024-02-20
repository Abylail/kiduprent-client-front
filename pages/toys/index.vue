<template>
  <mobile-header lang-switch>
    <div class="search-head">
      <nuxt-img class="search-head-logo"  src="/logo.svg" alt="logo"/>
      <span>Kidup.kz</span>
    </div>
  </mobile-header>

  <div class="toy-filter">
    <div class="toy-filter-right">{{ $t('age') }}</div>
    <base-select
        :model-value="activeAgeKey"
        :options="ages"
        view-type="mini"
        @update:modelValue="selectAge($event)"
    />
  </div>

  <div :class="[{'toy-page--mobile': !nuxtApp.$device.isDesktop}, {'toy-page--desktop': $device.isDesktop}]">
    <div class="container">
      <h1 class="toy-title">{{ $t('toy_subscription') }}</h1>
      <p class="toy-page__description">{{ $t('100_tokens_any_rate') }}</p>
    </div>
    <div class="toy-page__head">
      <button class="toy-page-help" @click="howItWorks = true">{{ $t('how_it_works') }}</button>
      <a class="toy-page-help" href="https://wa.me/77753862246" target="_blank">{{ $t('manager_help') }}</a>
    </div>
    <div class="toy-list">
      <toy-card
        v-for="toy in toysStore.getList" :key="toy.id"
        :toy="toy"
        basket
      />
    </div>
    <base-loader v-if="isLoading" center-horizontal/>
  </div>

  <cart-window/>

  <!-- Алерт о токенах -->
  <base-backdrop v-model:active="showTokensAlert">
    <div class="token-alert container">
      <base-icon class="token-alert__icon" name="mdi-information-outline" size="70"/>
      <div class="token-alert__title">{{ $t('you_collect_more_than_100') }}</div>
      <div class="token-alert__subtitle">{{ $t('extra_tokens') }}  <br/> 120тг = 1 токен</div>
      <base-button type="yellow" size="big" full-width @click="() => showTokensAlert = false">{{ $t('understand') }}</base-button>
    </div>
  </base-backdrop>

  <base-backdrop class="how-it-works" v-model:active="howItWorks">
    <banner-toys title/>
  </base-backdrop>
</template>

<script setup>
import MobileHeader from "../../components/common/layoutComponents/mobileHeader";
import {useToysStore} from "../../store/toys";
import ToyCard from "../../components/common/miniCards/toyCard";
import {computed, nextTick, onMounted, watch} from "vue";
import {useToysCartStore} from "../../store/toys/basket";
import CartWindow from "../../components/common/toys/cartWindow";
import BaseSelect from "../../components/base/BaseSelect";
import {useRoute, useRouter} from "nuxt/app";
import BaseLoader from "../../components/base/BaseLoader";
import BaseBackdrop from "../../components/base/BaseBackdrop";
import BaseIcon from "../../components/base/BaseIcon";
import BaseButton from "../../components/base/BaseButton";
import BannerToys from "../../components/common/main/bannerToys";
const nuxtApp = useNuxtApp();

const ages = computed(() => [
  {name: nuxtApp.$t("any_age"), key: "0", min: null, max: null},
  {name: `0 - 3 ${nuxtApp.$t('month_short')}`, key: "1", min: 0, max: 3},
  {name: `3 - 6 ${nuxtApp.$t('month_short')}`, key: "2", min: 3, max: 6},
  {name: `6 - 12 ${nuxtApp.$t('month_short')}`, key: "3", min: 6, max: 12},
  {name: `12 - 18 ${nuxtApp.$t('month_short')}`, key: "4", min: 12, max: 18},
  {name: `18 - 24 ${nuxtApp.$t('month_short')}`, key: "5", min: 18, max: 24},
  {name: `2 - 3 ${nuxtApp.$t('year_short')}`, key: "6", min: 24, max: 36},
  {name: `3 - 5 ${nuxtApp.$t('year_short')}`, key: "7", min: 36, max: 60},
  {name: `5+ ${nuxtApp.$t('year_short')}`, key: "8", min: 60, max: null},
])

const router = useRouter();
const route = useRoute();
const activeAgeKey = computed(() => route.query?.ageKey || "0");
const activeAge = computed(() => ages.value.find(a => a.key === activeAgeKey.value) || ages.value[0]);

const toysStore = useToysStore();
const toysCartStore = useToysCartStore();

const isLoading = ref(false);
const fetchList = async () => {
  isLoading.value = true;
  await toysStore.fetchList({maxAge: activeAge.value.max, minAge: activeAge.value.min});
  isLoading.value = false;
}
await fetchList();

const selectAge = async (age) => {
  if (age === activeAgeKey.value) return;
  await router.replace({
    path: '/toys',
    query: {...route.query, ageKey: age || undefined}
  })
  fetchList()
}

// Показать предупреждение по токенам
const showTokensAlert = ref(false);
const howItWorks = ref(false);

// Если пользователь превышает отметку 100, показываю алерт
watch(() => toysCartStore.getCount, (newCount, oldCount) => {
  if (oldCount !== 0 && oldCount <= 100 && newCount > 100) showTokensAlert.value = true;
}, {immediate: false})

onMounted(() => {
  toysCartStore.fetchCart();
})
</script>

<style lang="scss" scoped>
.search-head {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
}

.search-head-logo {
  height: 50px;
}

.toy-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  column-gap: 12px;
  padding: 0 $side-space-mobile 48px;
}

.toy-title {
  //margin-top: 16px;
  //color: $color--blue-dark;
  //font-size: $fs--default;
  //font-weight: normal;
  display: table-cell;
  vertical-align: bottom;
  font-size: 1rem;
  line-height: 1rem;
  font-weight: bold;
}

.toy-page--mobile {
  margin-top: 16px;
}

.toy-page__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 $side-space-mobile;
  font-size: $fs--mini;
  margin-bottom: 12px;
}

.toy-page__description {
  color: $color--gray-dark;
  font-size: $fs--mini;
  padding: 4px 0;
}

.toy-page-help {
  white-space: nowrap;
  height: 1rem;
  color: $color--blue;
  font-size: $fs--mini;
}

.toy-filter {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  box-sizing: content-box !important;
  width: calc(100% - 32px);
  padding: 12px 16px;
  border-bottom: 3px solid #efefef;
  position: sticky;
  top: 0;
  z-index: 10;
}

.token-alert {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__title {
    text-align: center;
    font-size: $fs--title;
    margin: 24px 0 12px;
  }

  &__subtitle {
    text-align: center;
    margin: 12px 0 32px;
  }

  &__icon {
    padding-top: 24px;
    color: $color--blue;
  }
}

.how-it-works {
  & >.window {background-color: $color--yellow !important;}
}
</style>