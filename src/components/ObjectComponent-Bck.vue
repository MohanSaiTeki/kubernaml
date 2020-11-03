<template>
      <div>
        <div style="margin: 12px">
            <!-- <v-btn
                elevation="2"
                small
                x-small
                v-for="(value, key) in arr" 
                :key=key
                @click="updateyaml(); add_id_name_to_id_list()"
                :value="refvalue + '-' + indexvalue + '-' + key" 
            >{{key}}</v-btn> -->

            <button 
                v-for="(value, key) in arr" 
                :key=key
                class="btn btn-primary" 
                data-toggle="collapse" 
                :data-target="'#' + refvalue + '-' + indexvalue + '-' + key" 
                :value="refvalue + '-' + indexvalue + '-' + key" 
                @click="updateyaml(); add_id_name_to_id_list()"
                style="
                    margin: 2px;
                    padding: 6px;
                    border-radius: 6px;
                    outline: none
                    " 
                v-bind:style=" (check_id_name_in_id_list(refvalue + '-' + indexvalue + '-' + key) !== -1) ? { 
                    'background-color' : '#0000ff',
                    'color' : '#FFFFFF',
                    'border' : '1px solid #8080ff'
                    } : {  
                    'background-color' : '#FFFFFF',
                    'color' : '#8080ff',
                    'border' : '1px solid #8080ff'
                } "
                >
                {{ key }}
            </button>
        </div>
        <div v-for="(value, key) in arr" :key=key>
            <div v-if="( (!!value) && (value.constructor === String) ) || (value.constructor === Number)" class="collapse" :id="refvalue + '-' + indexvalue + '-' + key">
                <StringComponent 
                    :stringvalue=key 
                    :refvalue="refvalue + '-' + indexvalue + '-' + key" 
                    :changestring="updatestring" 
                    :parentelement="key"
                    >
                </StringComponent>
            </div>
             
            <div v-if="(!!value) && (value.constructor === Array)" class="collapse" :id="refvalue + '-' + indexvalue + '-' + key">

                <div v-if="value[0].constructor === String">
                    <div class="row" style="margin: 12px">
                        <div class="col-sm-6">
                            <p> {{ key }} </p>        
                        </div>
                        <div class="col-sm-6">
                            <AddStringElement
                                :index=key
                                :refvalue="refvalue + '-' + indexvalue + '-' + key"
                                :add="add_string_element_to_array"
                            >
                            </AddStringElement>
                        </div>
                        <div class="col-sm-12">
                            <div v-for="(value, index) in value" :key=index>
                                <ArrayStringComponent 
                                    :refvalue="refvalue + '-' + indexvalue + '-' + key"   
                                    :index=index
                                    :onchange="on_string_element_in_array_change"
                                    :remove="remove_string_element_from_array"
                                    v-bind:check_yaml_output="check_yaml_output"
                                    > 
                                </ArrayStringComponent>
                            </div>        
                        </div> 
                    </div>           
                </div>

                <div v-if="value[0].constructor === Object" >
                    <div class="row" style="margin: 24px">
                        <div class="col-sm-6" style="overflow: hidden;" >
                            <p> {{ key }} </p>
                        </div>
                        <div class="col-sm-6">
                            <AddObjectElement
                                :index=key
                                :refvalue="refvalue + '-' + indexvalue + '-' + key"
                                :add="add_map_element_to_array"
                            >
                            </AddObjectElement>
                        </div>
                    </div>

                    <div v-if="is_object_is_empty(refvalue, key)">
                        <div v-for="(elements, index) in value" :key=index>
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
                        <div class="col-sm-12">
                            <div v-for="(obj, index) in value" :key=index>
                                <div class="row ">
                                    <div class="col-sm-10">
                                        <ObjectComponent 
                                            :arr=obj 
                                            v-bind:updateyaml="updateyaml" 
                                            :refvalue="refvalue + '-' + indexvalue + '-' + key"
                                            v-bind:indexvalue="index" 
                                            v-bind:updatestring="updatestring"
                                            v-bind:add_id_name_to_id_list="add_id_name_to_id_list"
                                            v-bind:check_id_name_in_id_list="check_id_name_in_id_list"
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
                                    </div>
                                    <div class="col-sm-2">
                                        <RemoveNonEmptyObjectElement  
                                            :index=index
                                            :refvalue="refvalue + '-' + indexvalue + '-' + key"
                                            :remove="remove_map_element_from_array"
                                        > 
                                        </RemoveNonEmptyObjectElement>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div v-if="(!!value) && (value.constructor === Object)" class="collapse" :id="refvalue + '-' + indexvalue + '-' + key">
                <div class="row" style="margin: 12px">
                    <div class="col-sm-12">
                        {{ key }}  <!-- name of the field -->
                    </div>
                    <div class="col-sm-12">
                        <ObjectComponent 
                            :arr=value 
                            v-bind:updateyaml="updateyaml" 
                            v-bind:refvalue="refvalue + '-' + indexvalue + '-' + key " 
                            indexvalue="empty"
                            v-bind:updatestring="updatestring"
                            v-bind:add_id_name_to_id_list="add_id_name_to_id_list"
                            v-bind:check_id_name_in_id_list="check_id_name_in_id_list"
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
                    </div>
                </div>    
            </div>
        </div>
    </div>
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
                    "on_map_value_element_change", "remove_map_element_from_array", "check_yaml_output", 
                    "check_id_name_in_id_list", "add_id_name_to_id_list"
            ],
        created() {
            console.log(this.arr)
        }
        
    }
</script>

<style>

</style>