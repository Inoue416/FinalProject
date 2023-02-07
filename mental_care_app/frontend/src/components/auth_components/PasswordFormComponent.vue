<script setup>
    import { useStore } from 'vuex';
    import { computed, defineProps } from 'vue';
    const props = defineProps({
        kindKey: {
            type: String,
            required: true
        }
    });
    const store = useStore();
    let get_query = null;
    let set_query = null;
    let label = "";
    console.log("kind key: ");
    console.log(props);
    if (props.kindKey == 'password'){
        console.log("phase: password");
        get_query = "signupmodule/getPassword";
        set_query = "password";
    }else {
        get_query = "signupmodule/getPasswordConfirm";
        set_query = "password_confirm";
        label = "(再入力)";
    }
    const getPassword = computed({
        get() {
            return store.getters[get_query].value;
        },
        set(value) {
            store.dispatch("signupmodule/inputForm", {value: value, key: set_query});
        }
    });
    const getMessage = computed(() => {
        return store.getters[get_query].message;
    });
</script>

<template>
    <div class="mb-3">
        <label :for="set_query" class="form-label">パスワード {{ label }}</label>
        <input type="password" :id="set_query" class="form-control" v-model="getPassword" />
        <p>入力: {{ getMessage }}</p>
    </div>
</template>
