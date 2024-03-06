<template>
  <div class="toy-subscribe">
    <div class="toy-subscribe__title" v-if="daysToEnd > 0">
      Осталось дней: <strong>{{ daysToEnd }}</strong>
      <span class="toy-subscribe__status chip--outlined" v-if="toySubscriberStore.getSubscribe?.status">{{ toySubscriberStore.getSubscribe?.status }}</span>
    </div>
    <div class="toy-subscribe__title" v-else><strong>Тариф истек</strong></div>
    <div class="toy-subscribe__info" v-if="toySubscriberStore.getSubscribe?.startSubscription">Дата начала: {{ startSubscriptionText }}</div>
    <div class="toy-subscribe__info" v-if="toySubscriberStore.getSubscribe?.endSubscription">Дата окончания: {{ endSubscriptionText }}</div>
    <div class="toy-subscribe__info">
      Ваш тариф: {{ toySubscriberStore.getSubscribe?.rate }}
    </div>
  </div>

  <div class="active-toys">
    <div class="title">Игрушки у вас</div>
    <toy-card
        v-for="toy in toySubscriberStore.getToys" :key="toy.id"
        :toy="toy"
        row
    />
    <base-button class="active-toys__order" type="yellow" full-width @click="router.push('/toys')">Заказать другие игрушки</base-button>
    <base-notice text="Что бы поменять игрушки вы можете оставить заявку на новые игрушки"/>
  </div>
</template>

<script setup>
import {useToySubscribe} from "../../../store/client/parent/toySubscribe";
import {computed} from "vue";
import {daysLeft} from "../../../helpers/methods";
import ToyCard from "../miniCards/toyCard";
import BaseButton from "../../base/BaseButton";
import BaseNotice from "../../base/BaseNotice";
import {useRouter} from "nuxt/app";

const toySubscriberStore = useToySubscribe();

const startSubscriptionText = computed(() => new Date(toySubscriberStore.getSubscribe?.startSubscription).toLocaleDateString())
const endSubscriptionText = computed(() => new Date(toySubscriberStore.getSubscribe?.endSubscription).toLocaleDateString())

const daysToEnd = computed(() => daysLeft(new Date(toySubscriberStore.getSubscribe?.endSubscription)))
const router = useRouter();
</script>

<style lang="scss" scoped>
.toy-subscribe {
  background: white;
  padding: 10px;
  border-radius: 10px;

  &__title {
    margin-bottom: 12px;
  }

  &__info {
    margin: 4px 0;
    color: $color--gray-dark;
  }

  &__status {
    display: inline-block;
    margin-left: 12px;
  }
}

.active-toys {
  margin-top: 16px;

  &__order {
    margin: 16px 0;
  }
}
</style>