<script setup>
    import { useStore } from 'vuex';
    import { computed } from 'vue';
    const store = useStore();
    const getEmail = computed({
        get() {
            return store.getters["signupmodule/getEmail"].value;
        },
        set(value) {
            store.dispatch("signupmodule/inputForm", {value: value, key: "email"});
        }
    });
    const getMessage = computed(() => {
        return store.getters["signupmodule/getEmail"].message;
    });
</script>

<template>
    <div class="mb-3">
        <label for="email" class="form-label">メールアドレス</label>
        <input type="email" class="form-control" id="email" v-model="getEmail" />
        <p>入力: {{ getMessage }}</p>
    </div>
</template>