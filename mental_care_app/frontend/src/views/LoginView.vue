<script setup>
    import LoginComponent from '@/components/LoginComponent.vue';
    import { onMounted } from 'vue';
    import { useStore } from 'vuex';
    import router from '@/router';
    const store = useStore();
    onMounted(() => {
        if (store.getters["getIsLogin"]) {
            router.push("/");
        }
    });

</script>

<template>
    <h1 class="mt-2 mb-3">ログイン</h1>
    <LoginComponent />
</template>