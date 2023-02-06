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
    console.log("kind key: ");
    console.log(props);
    if (props.kindKey == 'password'){
        console.log("phase: password");
        get_query = "signupmodule/getPassword";
        set_query = "password";
    }else {
        get_query = "signupmodule/getPasswordConfirm";
        set_query = "password_confirm";
    }
    const getPassword = computed({
        get() {
            return store.getters[get_query];
        },
        set(value) {
            store.dispatch("signupmodule/inputForm", {value: value, key: set_query});
        }
    });
</script>

<template>
    <div class="mb-3">
        <label :for="set_query" class="form-label">パスワード</label>
        <input type="password" :id="set_query" class="form-control" v-model="getPassword" />
        <p>入力: {{ getPassword }}</p>
    </div>
</template>
