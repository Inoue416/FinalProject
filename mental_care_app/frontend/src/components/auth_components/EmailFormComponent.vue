<script setup>
    import { useStore } from 'vuex';
    import { computed, defineProps } from 'vue';
    const props = defineProps({
        moduleName: {
            type: String,
            required: true
        }
    });
    const store = useStore();
    const get_query = props.moduleName+"/getEmail";
    const set_query = props.moduleName+"/inputForm";
    const getEmail = computed({
        get() {
            return store.getters[get_query].value;
        },
        set(value) {
            store.dispatch(set_query, {value: value, key: "email"});
        }
    });
    const getMessage = computed(() => {
        return store.getters[get_query].message;
    });
    const checkEmail = () => {
        console.log(props.moduleName);
        if (props.moduleName == "signupmodule"){
            console.log("Check email...");
            store.dispatch(props.moduleName+"/checkEmail", "email");
        }
    };
</script>

<template>
    <div class="mb-3">
        <label for="email" class="form-label">メールアドレス</label>
        <input type="email" class="form-control" id="email" v-model="getEmail" @blur="checkEmail" />
        <p>入力: {{ getMessage }}</p>
    </div>
</template>