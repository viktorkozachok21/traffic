<template>
<div class="read__file">
    <input type="file" @change="readJSONFromFile">
</div>
</template>

<script>
export default {
    name: "ReadFile",
    methods: {
        readJSONFromFile(event) {
            if (event.target.files) {
                this.$notiflixSetLoading()
                try {
                    const file = event.target.files[0]
                    const reader = new FileReader()
                    reader.onload = e => this.$emit("gotFile", JSON.parse(e.target.result))
                    reader.readAsText(file)
                } catch (e) {
                    this.$notiflixRemoveLoading()
                    throw e
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
