<script setup>
    import { useStore } from 'vuex';
    import ChartComponent from './home_components/ChartComponent.vue';
    import ListComponent from './ListComponent.vue';
    import { ref } from 'vue';
    const moduleName = "listmodule";
    const kindKey = ref("today");
    const store = useStore();
</script>

<template>
    <div class="username-area">ようこそ<b>{{ store.getters["getUserName"] }}</b>さん!</div>
    <div class="chart-area border border-dark mt-3">
        <ChartComponent :module-name="moduleName" :kind-key="kindKey"/>
    </div>
    <div class="list-area mt-3">
        <ListComponent :module-name="moduleName" :kind-key="kindKey"/>
    </div>
</template>