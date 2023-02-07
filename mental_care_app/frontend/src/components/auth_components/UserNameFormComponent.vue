<script setup>
    import { useStore } from 'vuex';
    import { computed } from 'vue';
    const store = useStore();
    const getUserName = computed({
        get(){
            return store.getters["signupmodule/getUserName"].value;
        },
        set(value) {
            store.dispatch("signupmodule/inputForm", {value: value, key: 'username'});
        }
    });
    const getMessage = computed( () => {
        return store.getters["signupmodule/getUserName"].message;
    })
</script>

<template>
    <div class="mb-3">
        <label for="username" class="form-label">ユーザー名</label>
        <input type="text" id="username" class="form-control" v-model="getUserName" />
        <p class="error-message">入力: {{ getMessage }}</p>
    </div>
</template>