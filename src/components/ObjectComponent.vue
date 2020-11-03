<template>
    <v-expansion-panels multiple>
        <v-expansion-panel
            v-for="(val, key) in arr" 
            :key=key
            :value="refvalue + '-' + indexvalue + '-' + key" 
            @click="updateyaml(refvalue + '-' + indexvalue + '-' + key, key)"
        >
        <v-expansion-panel-header >{{ key }}</v-expansion-panel-header>
            <v-expansion-panel-content >
                <div v-if="( (!!val) && (val.constructor === String) ) || (val.constructor === Number)">
                    <StringComponent 
                        :stringvalue=key 
                        :refvalue="refvalue + '-' + indexvalue + '-' + key" 
                        :changestring="updatestring" 
                        :parentelement="key"
                        >
                    </StringComponent>
                </div>
                
                <div v-if="(!!val) && (val.constructor === Array)">

                    <div v-if="val[0].constructor === String">
                        <v-row>
                            <v-col md="12">
                                <AddStringElement
                                    :index=key
                                    :refvalue="refvalue + '-' + indexvalue + '-' + key"
                                    :add="add_string_element_to_array"
                                >
                                </AddStringElement>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col md="12">
                                <div v-for="(val, index) in val" :key=index>
                                    <ArrayStringComponent 
                                        :refvalue="refvalue + '-' + indexvalue + '-' + key"   
                                        :index=index
                                        :onchange="on_string_element_in_array_change"
                                        :remove="remove_string_element_from_array"
                                        v-bind:check_yaml_output="check_yaml_output"
                                        > 
                                    </ArrayStringComponent>
                                </div>  
                            </v-col>
                        </v-row>
                    </div>

                    <div v-if="val[0].constructor === Object" >
                        <v-row>
                            <AddObjectElement
                                :index=key
                                :refvalue="refvalue + '-' + indexvalue + '-' + key"
                                :add="add_map_element_to_array"
                            >
                            </AddObjectElement>
                        </v-row>

                        <div v-if="is_object_is_empty(refvalue, key)">
                            <div v-for="(elements, index) in val" :key=index>
                                <div v-if="index !== 0">
                                    <ArrayEmptyObjectComponent
                                        :refvalue="refvalue + '-' + indexvalue + '-' + key"   
                                        :index=index
                                        :onkeychange="on_map_key_element_change"
                                        :onvaluechange="on_map_value_element_change"
                                        :remove="remove_map_element_from_array"
                                        v-bind:check_yaml_output="check_yaml_output"
                                    >
                                    </ArrayEmptyObjectComponent>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <v-col md="12">
                                <div v-for="(obj, index) in val" :key=index>
                                    <v-row>
                                        <v-col md="10">
                                            <ObjectComponent 
                                                :arr=obj 
                                                v-bind:updateyaml="updateyaml" 
                                                :refvalue="refvalue + '-' + indexvalue + '-' + key"
                                                v-bind:indexvalue="index" 
                                                v-bind:updatestring="updatestring"
                                                v-bind:is_object_is_empty="is_object_is_empty"
                                                v-bind:add_string_element_to_array="add_string_element_to_array"
                                                v-bind:on_string_element_in_array_change="on_string_element_in_array_change"
                                                v-bind:remove_string_element_from_array="remove_string_element_from_array"
                                                v-bind:add_map_element_to_array="add_map_element_to_array"
                                                v-bind:on_map_key_element_change="on_map_key_element_change"
                                                v-bind:on_map_value_element_change="on_map_value_element_change"
                                                v-bind:remove_map_element_from_array="remove_map_element_from_array"
                                                v-bind:check_yaml_output="check_yaml_output"
                                                >
                                            </ObjectComponent>
                                        </v-col>
                                        <v-col md="2">
                                            <RemoveNonEmptyObjectElement  
                                                :index=index
                                                :refvalue="refvalue + '-' + indexvalue + '-' + key"
                                                :remove="remove_map_element_from_array"
                                            > 
                                            </RemoveNonEmptyObjectElement>
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-col>
                        </div>
                    </div>
                </div>
        
                <div v-if="(!!val) && (val.constructor === Object)">
                    <v-row>
                        <v-col md="12">
                            <ObjectComponent 
                                :arr=val 
                                v-bind:updateyaml="updateyaml" 
                                v-bind:refvalue="refvalue + '-' + indexvalue + '-' + key " 
                                indexvalue="empty"
                                v-bind:updatestring="updatestring"
                                v-bind:is_object_is_empty="is_object_is_empty"
                                v-bind:add_string_element_to_array="add_string_element_to_array"
                                v-bind:on_string_element_in_array_change="on_string_element_in_array_change"
                                v-bind:remove_string_element_from_array="remove_string_element_from_array"
                                v-bind:add_map_element_to_array="add_map_element_to_array"
                                v-bind:on_map_key_element_change="on_map_key_element_change"
                                v-bind:on_map_value_element_change="on_map_value_element_change"
                                v-bind:remove_map_element_from_array="remove_map_element_from_array"
                                v-bind:check_yaml_output="check_yaml_output"
                                >
                            </ObjectComponent>
                        </v-col>
                    </v-row>
                </div>

            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
    import StringComponent from "../components/StringComponent"
    import AddStringElement from "../components/AddStringElement"
    import ArrayStringComponent from "../components/ArrayStringComponent"
    import ArrayEmptyObjectComponent from "../components/ArrayEmptyObjectComponent"
    import AddObjectElement from "../components/AddObjectElement"
    import RemoveNonEmptyObjectElement from "../components/RemoveNonEmptyObjectElement"

    export default {
        name: "ObjectComponent",
        components: {
            StringComponent, 
            AddStringElement,
            ArrayStringComponent,
            ArrayEmptyObjectComponent,
            AddObjectElement,
            RemoveNonEmptyObjectElement
        },
        props: [
            "arr", "updateyaml", "refvalue", "updatestring", "add_string_element_to_array", 
                    "on_string_element_in_array_change", "remove_string_element_from_array",
                    "is_object_is_empty", "indexvalue", "add_map_element_to_array", "on_map_key_element_change",
                    "on_map_value_element_change", "remove_map_element_from_array", "check_yaml_output"
            ],
        
    }
</script>

<style>

</style>