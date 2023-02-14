<script setup>
    import { useStore } from 'vuex';
    import ChartComponent from './home_components/ChartComponent.vue';
    //import { ref, mounted } from 'vue';
   
    const message = "Welcome Home";
    const store = useStore();
    
</script>

<template>
    <h1>{{ message }}</h1>
    <h2>{{ store.getters["getUserName"] }}</h2>
    <div class="chart-area border border-dark mt-3">
        <ChartComponent />
    </div>
</template>

<style scoped>
    .chart-area {
        width: 100%;
        height: 40%;

    };
</style>