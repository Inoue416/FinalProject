<script setup>
  import FormComponent from '@/components/FormComponent.vue';
  import { useStore } from 'vuex';
  import router from '@/router';
  const store = useStore();
  if (!store.state.is_login) {
    router.push("/login");
  }
</script>
<template>
  <h1>はきだし</h1>
  <FormComponent />
</template>