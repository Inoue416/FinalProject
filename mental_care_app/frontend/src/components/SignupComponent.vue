<script setup>
    import UserNameFormComponent from "./auth_components/UserNameFormComponent.vue";
    import EmailFormComponent from "./auth_components/EmailFormComponent.vue";
    import PasswordFormComponent from "./auth_components/PasswordFormComponent.vue";
    const key_pass = "password";
    const key_pass_conf = "password_confirm"
</script>

<template>
    <div class="mt-3 mb-3">
        <form method="post">
            <UserNameFormComponent />
            <EmailFormComponent />
            <PasswordFormComponent :kind-key="key_pass"></PasswordFormComponent>
            <PasswordFormComponent :kind-key="key_pass_conf"></PasswordFormComponent>
            <button type="submit" class="btn btn-primary" disabled>登録</button>
        </form>
    </div>
</template>
