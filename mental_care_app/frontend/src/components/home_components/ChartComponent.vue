<script setup>
  import { Line } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
  import { useStore } from 'vuex';
  import { onMounted, reactive, defineProps, onBeforeMount } from 'vue';

  ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);
  const props = defineProps({
    kindKey: {
      type: String,
      required: true
    },
    moduleName: {
      type: String,
      required: true
    }
  });
  let all_data = [];

  const store = useStore();
  const chartData = reactive({
    datasets: [
      {data: [] }
    ]
  });

  const chartOptions = {
    responsive: true
  };
  const getQuery = props.moduleName + "/getData";
  const setQuery = props.moduleName + "/setData";

  onBeforeMount(async () => {
    if ((store.getters[getQuery]).length == []) {
      await store.dispatch(setQuery, props.kindKey);
    } else {
      console.log("data load skip...");
    }
    all_data = store.getters[getQuery];
    console.log("Before Mount: ");
    console.log(all_data);
  });

  onMounted(() => {
    console.log("Mounted:");
    console.log(chartData);
    all_data = store.getters[getQuery];
    all_data = all_data.reverse();
    for (const idx in all_data){
      console.log(all_data[idx].created_at);
      console.log(all_data[idx].total);
      chartData.datasets.data.push({x:all_data[idx].created_at, y:all_data[idx].total});
    }
    console.log(all_data);
  });
</script>

<template>
  <Line
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>
