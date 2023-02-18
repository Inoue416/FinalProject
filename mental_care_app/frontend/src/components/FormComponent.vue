<script setup>
    import TextAreaComponent from './form_components/TextAreaComponent.vue';
    import { useStore } from 'vuex';
    import router from '@/router';
    const store = useStore();
    const module_name = "hakidasimodule";
    console.log("watch Form guard..");
    console.log(store.getters["getIsLogin"]);
    if(!store.getters["getIsLogin"]) {
        router.push("/");
    }

</script>

<template>
    <TextAreaComponent :module-name="module_name"/>
</template>