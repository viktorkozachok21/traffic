<template>
<div class="main__layout">
    <ReadFile
        @gotFile="getDataFromFile"
    />
    <button type="button" @click="runFunctions">Go</button>
    <LineChart
        v-if="listOfAverageSpeed"
        :data-set="listOfAverageSpeed"
    />
    <label for="vehicle-select">Choose a number of vehicle:</label>
    <select v-if="listOfVehiclesGroupedById" v-model.lazy="currentVehicle" id="vehicle-select">
        <option>0</option>
        <option v-for="number in numberOfVehicles" :key="number">{{ number }}</option>
    </select>
    <BaseLineChart
        v-if="listOfVehiclesGroupedById"
        :key="currentVehicle"
        :data-set="listOfVehiclesGroupedById[+currentVehicle]"
    />
</div>
</template>

<script>
import ReadFile from "@/components/ReadFile.vue"
import BaseLineChart from "@/components/charts/BaseLineChart.vue"
import LineChart from "@/components/charts/LineChart.vue"

export default {
    name: "MainLayout",
    data: () => ({
        trafficData: null,
        listOfVehicles: null,
        listOfVehiclesGroupedById: null,
        listOfAverageSpeed: null,
        numberOfVehicles: null,
        currentVehicle: 0
    }),
    components: {
        ReadFile,
        BaseLineChart,
        LineChart
    },
    methods: {
        getDataFromFile(value) {
            if (value["fcd-export"]["timestep"]) this.trafficData = value["fcd-export"]["timestep"]
            this.listOfAverageSpeed = null
            this.listOfVehiclesGroupedById = null
            this.$notiflixRemoveLoading()
        },
        runFunctions() {
            this.$notiflixSetLoading()
            setTimeout(async () => {
                await this.getListOfVehicles()
                this.getListOfVehiclesGroupedById()
                this.getNumberOfVehicle()
                this.getListOfAverageSpeed()
                this.$notiflixRemoveLoading()
            }, 0)
        },
        getListOfVehicles() {
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
        },
        getListOfVehiclesGroupedById() {
            this.listOfVehiclesGroupedById = this.listOfVehicles.reduce((result, currentValue) => {
                (result[currentValue["id"]] = result[currentValue["id"]] || []).push(currentValue)
                return result
            }, {})
        },
        getNumberOfVehicle() {
            this.numberOfVehicles = new Set(this.listOfVehicles.map(item => item.id)).size - 1
        },
        getListOfAverageSpeed() {
            this.listOfAverageSpeed = [...new Set(this.listOfVehicles.map(item => item.speed))]
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
