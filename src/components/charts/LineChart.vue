<script>
import { Line } from "vue-chartjs"

export default {
    name: "LineChart",
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
                labels: this.dataSet.map((item, index) => index),
                datasets: [{
                    label: "Графік середньої швидкості автомобілів",
                    data: this.dataSet.map(item => item),
                    borderColor: "#638062"
                }]
            }
        }
    }
}
</script>
