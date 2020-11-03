<template>
    <div v-if="check_yaml_output(refvalue, index)">
        <v-row>
            <v-col md="10" class="padding-btm">
                <v-text-field 
                  label="Enter value"
                  hide-details
                  solo
                  dense  
                  v-on:change="onchange(refvalue, index)"
                />
            </v-col>
            <v-col md="2" class="padding-btm">
                <v-btn
                    color="blue"
                    elevation="8"
                    outlined
                    small
                    :disabled="(index === 0)"
                    @click="remove(refvalue, index)"
                > Remove</v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: "Array-String-Component",
        props: ["refvalue", "index", "onchange", "remove", "check_yaml_output"]
    }
</script>

<style>
/* vue class */
.v-input__control {
	margin-bottom: 12px;
}

/* custom id */
.padding-btm {
    padding-bottom: 0px;
}
</style>