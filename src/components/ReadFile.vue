<template>
<div class="read_file">
    <input type="file" @change="readJSONFromFile">
</div>
</template>

<script>
export default {
    name: "ReadFile",
    methods: {
        readJSONFromFile(event) {
            if (event.target.files) {
                const file = event.target.files[0]
                const reader = new FileReader()
                reader.onload = e => this.$emit("gotFile", JSON.parse(e.target.result))
                reader.readAsText(file)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
