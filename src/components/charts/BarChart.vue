<template>
  <div class="bar_chart">
    <button type="button" @click="showData">ShowData</button>
  </div>
</template>

<script>
export default {
  name: "BarChart",
  props: {
    dataSet: Object
  },
  methods: {
    showData() {
      console.log(this.dataSet)
    }
  }
}
</script>
