import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    mixins: [Bar,reactiveProp],
    props: ['options'],
    mounted() {
        this.renderChart(this.data, this.options)
    }
}