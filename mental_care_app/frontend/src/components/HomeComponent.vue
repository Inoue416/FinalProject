<script setup>
    import { useStore } from 'vuex';
    const message = "Welcome Home";
    const store = useStore();

</script>

<template>
    <h1>{{ message }}</h1>
    <h2>{{ store.getters["getUserName"] }}</h2>
</template>
