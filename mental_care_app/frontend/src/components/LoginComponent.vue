<script setup>
    import { ref } from 'vue';
    const name = ref("");
    const password = ref("");
</script>

<template>
    <label for="name">Name</label>
    <input type="text" id="name" v-model="name" />
    <label for="password">Password</label>
    <input type="password" id="password" v-model="password" />
</template>
