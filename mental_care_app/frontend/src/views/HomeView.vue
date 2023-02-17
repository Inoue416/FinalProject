<script setup>
  import HomeComponent from '@/components/HomeComponent.vue';
  import { useStore } from 'vuex';
  const store = useStore();
</script>
<template>
  <div v-if="store.state.is_login">
    <h1>ホーム</h1>
    <HomeComponent />
  </div>
  <div v-if="!store.state.is_login">
    <h1 class="mt-3">さあ、嫌なことは全部はきだそう!</h1>
  </div>
</template>