<template>
<v-app>
    <div id="app">
        <MainLayout/>
    </div>
</v-app>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue"

export default {
    name: "App",
    components: {
        MainLayout
    }
}
</script>
