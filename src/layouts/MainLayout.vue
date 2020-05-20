<template>
<div class="main_layout">
    <ReadFile @gotFile="loadDataFromFile" />
    <button type="button" @click="getVehicles">Go</button>
    <LineChart v-if="this.listOfVehicles" :data-set="listOfVehicles[999]"/>
</div>
</template>

<script>
import ReadFile from "@/components/ReadFile.vue"
import LineChart from "@/components/charts/LineChart.vue"

export default {
    name: "MainLayout",
    data: () => ({
        trafficData: null,
        listOfVehicles: null
    }),
    components: {
        ReadFile,
        LineChart
    },
    methods: {
        loadDataFromFile(value) {
            if (value["fcd-export"]["timestep"]) this.trafficData = value["fcd-export"]["timestep"]
            console.log("got it")
        },
        groupBy(array, key) {
            return array.reduce((result, currentValue) => {
                (result[currentValue[key]] = result[currentValue[key]] || []).push(
                    currentValue
                )
                return result
            }, {})
        },
        getVehicles() {
            this.listOfVehicles = []
            Object.values(this.trafficData).forEach(item => {
                if (item.vehicle.length) item.vehicle.forEach(vehicle => this.listOfVehicles.push({
                    "id": vehicle._id,
                    "lane": vehicle._lane,
                    "speed": vehicle._speed,
                    "type": vehicle._type,
                    "time": item._time
                }))
                else this.listOfVehicles.push({
                    "id": item.vehicle._id,
                    "lane": item.vehicle._lane,
                    "speed": item.vehicle._speed,
                    "type": item.vehicle._type,
                    "time": item._time
                })
            })
            this.listOfVehicles = this.listOfVehicles.reduce((result, currentValue) => {
                (result[currentValue["id"]] = result[currentValue["id"]] || []).push(currentValue)
                return result
            }, {})
            console.log("done")
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
