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
        }
    })
    const store = useStore();
    const isActive = computed(() => {
        console.log(store.getters["signupmodule/getButton"]);
        return store.getters["signupmodule/getButton"];
    });
</script>

<template>
    <button :type="props.buttonType" :class="props.buttonStyle" :disabled="!isActive">{{ props.buttonLabel }}</button>
</template>