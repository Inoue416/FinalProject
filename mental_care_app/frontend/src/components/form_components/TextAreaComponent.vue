<script setup>
    import { ref, defineProps, computed } from 'vue';
    import { useStore } from 'vuex';
    import ButtonComponent from '../auth_components/ButtonComponent.vue';
    const props = defineProps({
        moduleName: {
            type: String,
            required: true
        }
    })
    const store = useStore();
    const text = ref("");
    const checkText = () => {
        store.dispatch(props.moduleName+"/checkText", text.value);
    };
    const getErrorMessageTextArea = computed(() => {
        return store.getters[props.moduleName + "/getErrorMessageTextArea"];
    });
    const button_type = "button";
    const button_label = "はきだす";
    const button_style = "btn btn-primary";
</script>

<template>
    <div class="form-area">
        <div class="mt-3">
            <label for="HakidasiArea" class="form-label"><b>今思ってることをはきだそう！</b></label>
            <!-- テキストの入力時にバリデーションを走らせて常にボタンの監視を行ったほうがバグを生まないのでは？ -->
            <textarea class="form-control" id="HakidasiArea" rows="3" v-model="text" @keypress="checkText" @blur="checkText"></textarea>
        </div>
        <p><b>入力値</b></p>
        <p>{{ text }}</p>
        <p><b>エラーメッセージ</b></p>
        <p>{{ getErrorMessageTextArea }}</p>
        <ButtonComponent :button-label="button_label" :button-style="button_style" :button-type="button_type" :module-name="props.moduleName"/>
    </div>
</template>