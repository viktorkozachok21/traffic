<script>
import { Line } from "vue-chartjs"

export default {
    name: "BaseLineChart",
    extends: Line,
    props: {
        dataSet: Array,
    },
    mounted() {
        this.renderChart(this.setupChart(), {
            responsive: true
        })
    },
    methods: {
        setupChart() {
            return {
                labels: this.dataSet.map(item => item.time),
                datasets: [{
                    label: "Графік зміни швидкості автомобіля на визначеному проміжку",
                    data: this.dataSet.map(item => item.speed),
                    borderColor: "#638062"
                }]
            }
        }
    }
}
</script>
