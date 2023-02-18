<script setup>
    import ListComponent from '@/components/ListComponent.vue';
    import { useStore } from 'vuex';
    import router from '@/router';
    const store = useStore();
    if (!store.state.is_login) {
        router.push("/login");
    }
    const moduleName = "listmodule";
    const kindKey = "all";
</script>    

<template>
    <h1>はきだし一覧</h1>
    <ListComponent :module-name="moduleName" :kind-key="kindKey"/>
</template>