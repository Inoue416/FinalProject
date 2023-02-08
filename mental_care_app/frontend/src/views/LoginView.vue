<script setup>
    import LoginComponent from '@/components/LoginComponent.vue';
    import { useStore } from 'vuex';
    import { computed } from 'vue';
    const store = useStore();
    const getErrorMessage = computed(() => {
        return store.getters["loginmodule/getErrorMessage"];
    })
</script>

<template>
    <p>{{ getErrorMessage }}</p>
    <h1 class="mt-2 mb-3">ログイン</h1>
    <LoginComponent />
</template>