<script setup>
    import UserNameFormComponent from "./auth_components/UserNameFormComponent.vue";
    import EmailFormComponent from "./auth_components/EmailFormComponent.vue";
    import PasswordFormComponent from "./auth_components/PasswordFormComponent.vue";
    import ButtonComponent from "./auth_components/ButtonComponent.vue";
    const key_pass = "password";
    const key_pass_conf = "password_confirm";
    const button_label = "登録";
    const button_type = "button";
    const button_style = "btn btn-primary";
</script>

<template>
    <div class="mt-3 mb-3">
        <!-- <form method="post"> -->
        <div class="form-area">
            <UserNameFormComponent />
            <EmailFormComponent />
            <PasswordFormComponent :kind-key="key_pass"></PasswordFormComponent>
            <PasswordFormComponent :kind-key="key_pass_conf"></PasswordFormComponent>
            <ButtonComponent :button-label="button_label" :button-style="button_style" :button-type="button_type"></ButtonComponent>
        </div>
        <!-- </form> -->
    </div>
</template>
