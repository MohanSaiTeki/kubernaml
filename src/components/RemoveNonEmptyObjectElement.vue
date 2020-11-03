<template>
    <v-row>
        <v-col>
            <v-btn
                color="blue"
                elevation="8"
                outlined
                small
                @click="remove(refvalue, index)"
            > Remove</v-btn>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "Remove-Non-Empty-Object-Element",
        props:["index", "refvalue", "remove"]
    }
</script>

<style>

</style>