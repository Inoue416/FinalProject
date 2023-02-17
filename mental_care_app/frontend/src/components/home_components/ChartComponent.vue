<script setup>
  import { Chart, registerables } from 'chart.js';
  import { useStore } from 'vuex';
  import { defineProps, onBeforeMount, ref } from 'vue';

  Chart.register(...registerables);
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
  
  const getQuery = props.moduleName + "/getData";
  const setQuery = props.moduleName + "/setData";
  const renderChart = () => {
    let lineElem = document.querySelector("#line-chart");
    new Chart(lineElem, {
      type: 'line',
      data: {
        labels: chartData.value.labels,
        datasets: chartData.value.datasets
      },
      options: chartOptions
    })
  };
  onBeforeMount(async () => {
    console.log("Before Mount: ");
    await store.dispatch(setQuery, props.kindKey);
    all_data = store.getters[getQuery];
    let all_data_reverse = all_data.reverse();
    console.log("Create chart dataset.");
    for (const elem of all_data_reverse){
      chartData.value.labels.push(elem.created_at.replace("T", " "));
      chartData.value.datasets[0].data.push(elem.total);
    }
    renderChart();
  });
</script>

<template>
  <canvas id="line-chart"></canvas>
</template>
