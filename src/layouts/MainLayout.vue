<template>
<div class="main__layout">
    <v-row no-gutters>
        <v-col cols="6" align="center">
            <v-container>
                <ReadFile
                    @gotFile="getDataFromFile"
                />
            </v-container>
        </v-col>
        <v-col cols="6" align="center">
            <v-container>
                <v-select
                    v-if="numberOfVehicles"
                    v-model="currentVehicle"
                    :items="numberOfVehicles"
                    label="Оберіть номер автомобіля:"
                    color="teal"                    
                ></v-select>
            </v-container>
        </v-col>
        <v-col cols="6" align="center">
            <LineChart
                v-if="listOfAverageSpeed"
                :data-set="listOfAverageSpeed"
            />
        </v-col>
        <v-col cols="6" align="center">
            <BaseLineChart
                v-if="listOfVehiclesGroupedById"
                :key="currentVehicle"
                :data-set="listOfVehiclesGroupedById[+currentVehicle]"
            />
        </v-col>
    </v-row>
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
            this.currentVehicle = 0
            setTimeout(async () => {
                await this.getListOfVehicles()
                this.getListOfVehiclesGroupedById()
                this.getNumberOfVehicle()
                this.getListOfAverageSpeed()
            }, 0)
            this.$notiflixRemoveLoading()
        },
        runFunctions() {
            this.$notiflixSetLoading()
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
            this.numberOfVehicles = [...new Set(this.listOfVehicles.map(item => item.id))]
        },
        getListOfAverageSpeed() {
            this.listOfAverageSpeed = [...new Set(this.listOfVehicles.map(item => item.speed))]
        }
    }
}
</script>

<style lang="scss" scoped>
canvas {
    margin: 1rem;
}
</style>
