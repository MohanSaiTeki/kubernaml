<template>
    <v-row>
        <v-col>
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
    </v-row>
</template>

<script>
	export default {
		name: "Add-String-Element",
		props:["index", "refvalue", "add"]
	}
</script>

<style>
.add-btn {
    padding: 6px;
}
</style>