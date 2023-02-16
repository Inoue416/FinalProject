<script setup>
// IF: propsでkeyを入れて制御するかも
    import { useStore } from 'vuex';
    import { computed, defineProps, onBeforeMount, ref } from 'vue';
    //const kindKey = "all"
    let all_data = [];
    const start = ref(0);
    const end = ref(0);
    const props = defineProps({
        moduleName: {
            type:String,
            required: true
        },
        kindKey: {
            type: String,
            required: true
        }
    });
    
    const tr_classes = (total) => {
        if (total > 0) { return "table-warning"; }
        if (total < 0) { return "table-secondary"; }
        return "table-light";
    }
    const page_active = (num) => {
        if (num == store.getters[props.moduleName+"/getPageNow"]) { return 'page-item active'; }
        return 'page-item';
    }
    const getQuery = props.moduleName + "/getData";
    const setQuery = props.moduleName + "/setData";
    const store = useStore();
    console.log("created: ");
    
    console.log(all_data);
    const getErrorMessage = computed(() => {
        return store.getters[props.moduleName+"/getErrorMessage"];
    });
    const getPageInfo = computed(() => {
        return store.getters[props.moduleName+"/getPageInfo"];
    });
    
    const changeData = (num) => {
        store.dispatch(props.moduleName+"/changeData", num);
        // display = store.getters[getQuery];
        start.value = num;
        end.value = num + 1;
        //display = all_data.slice(start, end);
    };

    const getData = computed(() => {
        const sp = start.value * 10;
        const ep = end.value * 10;
        return all_data.slice(sp, ep);
    });
    
    onBeforeMount(async () => {
        await store.dispatch(setQuery, props.kindKey);
        all_data = store.getters[getQuery];
        console.log("Before Mount: ");
        console.log(all_data);
        start.value = 0;
        end.value = 1;
        console.log("page:");
        console.log(start.value+" ~ "+end.value);
    });
    
</script>

<template>
    <div>{{ getErrorMessage }}</div>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">はきだし</th>
                <th scope="col">ポイント</th>
                <th scope="col" >ネガポジ</th>
                <th scope="col">日付</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in getData" :key="item.id" :class="tr_classes(item.total)">
                <th scope="row">{{ item.things }}</th>
                <td>{{ item.total }}</td>
                <td v-if="item.total > 0">ポジティブ</td>
                <td v-if="item.total < 0">ネガティブ</td>
                <td v-if="item.total == 0.0">-</td>
                <td>{{ item.created_at.replace("T", " ") }}</td>
            </tr>
        </tbody>
    </table>
    <nav aria-label="" class="mt-3">
        <ul class="pagination justify-content-center">
            <li v-for="num in getPageInfo" :key="num" :class="page_active(num)">
                <button class="page-link"  @click="changeData(num)">{{ num+1 }}</button>
            </li>
        </ul>
    </nav>
</template>
