<script setup>
    import EmailFormComponent from './auth_components/EmailFormComponent.vue';
    import PasswordFormComponent from './auth_components/PasswordFormComponent.vue';
    import ButtonComponent from './auth_components/ButtonComponent.vue';
    import { useStore } from 'vuex';
    import { watch } from 'vue';
    import router from '@/router';
    const store = useStore();
   
    const module_name = "loginmodule";
    const button_label = "ログイン";
    const button_type = "button";
    const button_style = "btn btn-primary";
    const kind_key = "password";
   
    watch(() => store.getters["getIsLogin"], function () {
        console.log("watch login guard..");
        if (store.getters["getIsLogin"]) {
            router.push("/");
        }
    });
</script>

<template>
    <div class="mt-3 mb-3">
        <!-- <form method="post"> -->
        <div class="form-area">
            <EmailFormComponent :module-name="module_name"/>
            <PasswordFormComponent :module-name="module_name" :kind-key="kind_key"/>
            <ButtonComponent :button-label="button_label" :button-style="button_style" :button-type="button_type" :module-name="module_name"/>
        </div>
    </div>
</template>
