<script setup>
    import SignupComponent from '@/components/SignupComponent.vue';
    import { useStore } from 'vuex';
    import { computed } from 'vue';
    const store = useStore();
    const getErrorMessage = computed(() => {
        return store.getters["signupmodule/getErrorMessage"];
    })
</script>

<template>
    <p>{{ getErrorMessage }}</p>
    <h1 class="mt-2">サインアップ</h1>
    <p class="mb-2">ログインには<b>メールアドレス</b>と<b>パスワード</b>を使用します。</p>
    <SignupComponent />
</template>