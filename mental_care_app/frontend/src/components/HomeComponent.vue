<script setup>
    import { useStore } from 'vuex';
    import ChartComponent from './home_components/ChartComponent.vue';
    import ListComponent from './ListComponent.vue';
    import { ref, onBeforeMount } from 'vue';
    const listModuleName = "listmodule";
    const chartModuleName = "chartmodule";
    const kindKey = ref("today");
    const store = useStore();
    let all_data = [];

    const chartData = ref({
    labels: [],
    datasets: [{
        label: "ネガポジ",
        data: [],
        tension: 0.1,
        borderColor: 'rgb(255, 192, 203)'
    }]
    });

    const chartOptions = {
    responsive: true,
    scales: {
        y: {
        suggestedMin: -1,
        suggestedMax: 1,
        }
    }
    };

    const getQuery = chartModuleName + "/getData";
    const setQuery = chartModuleName + "/setData";
    onBeforeMount(async () => {
    console.log("Before Mount: ");
    // await store.dispatch(setQuery, props.kindKey);
    // all_data = store.getters[getQuery];
    // let all_data_reverse = all_data.reverse();
    // console.log("Create chart dataset.");
    // for (const elem of all_data_reverse){
    //   console.log(elem);
    //   chartData.value.labels.push(elem.created_at.replace("T", " "));
    //   chartData.value.datasets[0].data.push(elem.total);
    // }
    await store.dispatch(setQuery, kindKey);
    all_data = store.getters[getQuery];
    let all_data_reverse = all_data.reverse();
    console.log("Create chart dataset.");
    let labels = [];
    let data = [];
    for (const elem of all_data_reverse){
      labels.push(elem.created_at.replace("T", " "));
      data.push(elem.total);
      // chartData.value.labels.push(elem.created_at.replace("T", " "));
      // chartData.value.datasets[0].data.push(elem.total);
    }
    chartData.value.labels = labels.concat();
    chartData.value.datasets[0].data = data.concat();
    });

</script>

<template>
    <div class="username-area">ようこそ<b>{{ store.getters["getUserName"] }}</b>さん!</div>
    <div class="chart-area border border-dark mt-3">
        <ChartComponent :module-name="chartModuleName" :kind-key="kindKey" :chart-data="chartData" :chart-options="chartOptions"/>
    </div>
    <div class="list-area mt-3">
        <ListComponent :module-name="listModuleName" :kind-key="kindKey"/>
    </div>
</template>