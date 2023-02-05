<script setup>
    const items = [0,1,2,3,4];
</script>

<template>
    <ul>
        <div v-for="item in items" :key="item">
            <li>{{ item }}</li>
        </div>
    </ul>
</template>
