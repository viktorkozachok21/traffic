<template>
<div class="read__file">
    <v-file-input
        label="Оберіть файл з даними"
        v-model="file"
        color="teal"
    ></v-file-input>
</div>
</template>

<script>
export default {
    name: "ReadFile",
    data: () => ({
        file: null
    }),
    watch: {
        file: {
            handler() {
                this.readJSONFromFile()
            }
        }
    },
    methods: {
        readJSONFromFile() {
            if (this.file) {
                this.$notiflixSetLoading()
                try {
                    const reader = new FileReader()
                    reader.onload = e => this.$emit("gotFile", JSON.parse(e.target.result))
                    reader.readAsText(this.file)
                } catch (e) {
                    this.$notiflixRemoveLoading()
                    throw e
                }
            }
        }
    }
}
</script>

<style lang="scss" >
</style>
