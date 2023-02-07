<script setup>
    import { defineProps, computed } from 'vue';
    import { useStore } from 'vuex';
    const props = defineProps({
        buttonLabel: {
            type: String,
            required: true
        },
        buttonType: {
            type: String,
            required: true
        },
        buttonStyle: {
            type: String,
            required: true
        },
        moduleName: {
            type:String,
            required: true
        }
    })
    const get_query = props.moduleName+"/getButton";
    const set_query = props.moduleName+'/sendApi'
    const store = useStore();
    const isActive = computed(() => {
        return store.getters[get_query];
    });
    const setApi = () => {
        store.dispatch(set_query);
    };
</script>
<!-- TODO: Clickイベントをいれる -->
<template>
    <button :type="props.buttonType" :class="props.buttonStyle" :disabled="!isActive" @click="setApi">{{ props.buttonLabel }}</button>
</template>