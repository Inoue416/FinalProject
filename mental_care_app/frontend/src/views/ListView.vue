<script setup>
    import ListComponent from '@/components/ListComponent.vue';
    const moduleName = "listmodule";
</script>    

<template>
    <h1>はきだし一覧</h1>
    <ListComponent :module-name="moduleName"/>
</template>