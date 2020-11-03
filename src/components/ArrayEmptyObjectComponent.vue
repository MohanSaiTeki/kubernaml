<template>
    <div v-if="check_yaml_output(refvalue, index)">
        <v-row>
            <v-col md="5">
                <v-text-field 
                  hide-details
                  label="Enter Key"
                  solo
                  dense  
                  v-on:change="onkeychange(refvalue, index)"
                />
            </v-col>
            <v-col md="5">
                <v-text-field 
                  hide-details
                  label="Enter Value"
                  solo
                  dense  
                  v-on:change="onvaluechange(refvalue, index)"
                />
            </v-col>
            <v-col md="2">
                <v-btn
                    color="blue"
                    elevation="8"
                    outlined
                    small
                    @click="remove(refvalue, index)"
                > Remove</v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: "Array-Empty-Object-Component",
        props:["refvalue", "index", "onkeychange", "onvaluechange", "remove", "check_yaml_output"],
    }
</script>

<style>
.v-expansion-panel-content__wrap {
    padding: 0px 24px 0px
}
</style>