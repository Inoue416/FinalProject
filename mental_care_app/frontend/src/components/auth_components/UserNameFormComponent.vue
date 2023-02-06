<script setup>
    import { useStore } from 'vuex';
    import { computed } from 'vue';
    const store = useStore();
    const getUserName = computed({
        get(){
            return store.getters["signupmodule/getUserName"];
        },
        set(value) {
            console.log(value);
            store.dispatch("signupmodule/inputForm", {value: value, key: 'username'});
        }
    });
</script>

<template>
    <div class="mb-3">
        <label for="username" class="form-label">ユーザー名</label>
        <input type="text" id="username" class="form-control" placeholder="3 ~ 10文字 (日本語、アルファベットのみ)" v-model="getUserName" />
        <p class="error-message">入力: {{ getUserName }}</p>
    </div>
</template>