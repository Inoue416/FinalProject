<script setup>
    import SignupComponent from '@/components/SignupComponent.vue';
    import { useStore } from 'vuex';
    import router from '@/router';
    const store = useStore();
    if (store.state.is_login) {
        router.push("home");
    }
</script>

<template>
    <h1 class="mt-2">サインアップ</h1>
    <p class="mb-2">ログインには<b>メールアドレス</b>と<b>パスワード</b>を使用します。</p>
    <SignupComponent />
</template>