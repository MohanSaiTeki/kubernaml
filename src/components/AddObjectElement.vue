<template>
<v-col md="12">
    <v-btn
        block
        color="blue"
        elevation="8"
        outlined
        small
        @click="add(refvalue)"
            class="add-btn"
    > Add</v-btn>
    </v-col>
</template>

<script>
    export default {
        name: "Add-Object-Element",
        props:["index", "refvalue", "add"]
    }
</script>

<style>
.add-btn {
    padding: 6px;
}
</style>