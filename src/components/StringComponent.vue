<template>
    <v-row>
        <v-col
            md="12"
            id="col-class"
        >
            <v-text-field 
                hide-details
                solo
                dense  
                v-bind:label="getName"
                v-on:change="changestring(refvalue, parentelement)"
            />
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "String-Component",
        props: ["stringvalue", "refvalue", "changestring", "parentelement"],
        computed: {
            getName() {
                return `Enter ${this.stringvalue}`
            }
        }
    };
</script>

<style>
/* vue class */
.v-input__control {
	margin-bottom: 12px;
}
.v-expansion-panel-content__wrap {
    padding: 0px;
}

/* custom id */
#col-class {
    padding: 0px;
}
</style>