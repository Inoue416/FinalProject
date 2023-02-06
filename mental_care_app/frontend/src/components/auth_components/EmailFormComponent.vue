<script setup>
    import { useStore } from 'vuex';
    import { computed } from 'vue';
    const store = useStore();
    const getEmail = computed({
        get() {
            return store.getters["signupmodule/getEmail"];
        },
        set(value) {
            store.dispatch("signupmodule/inputForm", {value: value, key: "email"});
        }
    });
</script>

<template>
    <div class="mb-3">
        <label for="email" class="form-label">メールアドレス</label>
        <input type="email" class="form-control" id="email" placeholder="sample@example.com" v-model="getEmail" />
        <p>入力: {{ getEmail }}</p>
    </div>
</template>