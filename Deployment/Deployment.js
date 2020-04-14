Vue.component('objectcomponent', {
    name: "temp",
    props: ["arr", "updateyaml", "refvalue", "updatestring", "add_string_element_to_array", 
                    "on_string_element_in_array_change", "remove_string_element_from_array",
                    "is_object_is_empty", "indexvalue", "add_map_element_to_array", "on_map_key_element_change",
                    "on_map_value_element_change", "remove_map_element_from_array", "check_yaml_output", 
                    "check_id_name_in_id_list", "add_id_name_to_id_list"
                ],
    template:`
    <div>
        <div style="margin: 12px">
            <button 
                v-for="(value, key) in arr" 
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
        <div v-for="(value, key) in arr">
            <div v-if="( (!!value) && (value.constructor === String) ) || (value.constructor === Number)" class="collapse" :id="refvalue + '-' + indexvalue + '-' + key">
                <string_component 
                    :stringvalue=key 
                    :refvalue="refvalue + '-' + indexvalue + '-' + key" 
                    :changestring="updatestring" 
                    :parentelement="key"
                    >
                </string_component>
            </div>
             
            <div v-if="(!!value) && (value.constructor === Array)" class="collapse" :id="refvalue + '-' + indexvalue + '-' + key">

                <div v-if="value[0].constructor === String">
                    <div class="row" style="margin: 12px">
                        <div class="col-sm-6">
                            <p> {{ key }} </p>        
                        </div>
                        <div class="col-sm-6">
                            <add_string_element
                                :index=key
                                :refvalue="refvalue + '-' + indexvalue + '-' + key"
                                :add="add_string_element_to_array"
                            >
                            </add_string_element>
                        </div>
                        <div class="col-sm-12">
                            <div v-for="(value, index) in value">
                                <array_string_component 
                                    :refvalue="refvalue + '-' + indexvalue + '-' + key"   
                                    :index=index
                                    :onchange="on_string_element_in_array_change"
                                    :remove="remove_string_element_from_array"
                                    v-bind:check_yaml_output="check_yaml_output"
                                    > 
                                </array_string_component>
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
                            <add_object_element
                                :index=key
                                :refvalue="refvalue + '-' + indexvalue + '-' + key"
                                :add="add_map_element_to_array"
                            >
                            </add_object_element>
                        </div>
                    </div>

                    <div v-if="is_object_is_empty(refvalue, key)">
                        <div v-for="(elements, index) in value">
                            <div v-if="index !== 0">
                                <array_empty_object_component
                                    :refvalue="refvalue + '-' + indexvalue + '-' + key"   
                                    :index=index
                                    :onkeychange="on_map_key_element_change"
                                    :onvaluechange="on_map_value_element_change"
                                    :remove="remove_map_element_from_array"
                                    v-bind:check_yaml_output="check_yaml_output"
                                >
                                </array_empty_object_component>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="col-sm-12">
                            <div v-for="(obj, index) in value" >
                                <div class="row ">
                                    <div class="col-sm-10">
                                        <objectcomponent 
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
                                        </objectcomponent>
                                    </div>
                                    <div class="col-sm-2">
                                        <remove_non_empty_object_element  
                                            :index=index
                                            :refvalue="refvalue + '-' + indexvalue + '-' + key"
                                            :remove="remove_map_element_from_array"
                                        > 
                                        </remove_non_empty_object_element>
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
                        <objectcomponent 
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
                        </objectcomponent>
                    </div>
                </div>    
            </div>
        </div>
    </div>
    `
})

Vue.component('string_component', {
    props:['stringvalue', 'refvalue', "changestring", "parentelement"],
    template:`
        <div class="row" style="margin: 12px">
            <div class="col-sm-6">
                {{ stringvalue }}
            </div>
            <div class="col-sm-6">
                <input 
                    class="form-control" 
                    v-on:change="changestring(refvalue, parentelement)"
                >
            </div>
        </div>
    `
})

Vue.component("add_string_element", {
    props:["index", "refvalue", "add"],
    template:`
    <div class="row">
        <div class="col-sm">
            <button class="btn btn-primary" @click="add(refvalue)">Add</button>
        </div>
    </div>
    `
})

Vue.component('array_string_component', {
    props: ["refvalue", "index", "onchange", "remove", "check_yaml_output"],
    template: `
        <div v-if="check_yaml_output(refvalue, index)">
            <div class="row" style="margin: 8px 10px 8px 10px;">
                <div class="col-sm-10">
                    <input 
                        class="form-control" 
                        @change="onchange(refvalue, index)"
                    >
                </div>
                <div class="col-sm-2">
                    <button class="btn btn-primary" @click="remove(refvalue, index)" :disabled="(index === 0)">Remove</button>
                </div>
            </div>
        </div>
    `
})

Vue.component("array_empty_object_component", {
    props:["refvalue", "index", "onkeychange", "onvaluechange", "remove", "check_yaml_output"],
    template:`
    <div v-if="check_yaml_output(refvalue, index)">
        <div class="row" style="margin: 12px 24px 12px 24px;">
            <div class="col-sm-5">
                <div class="row">
                    <div class="col-sm-2">
                        <p>Key</p>
                    </div>
                    <div class="col-sm-10">
                        <input class="form-control" @change="onkeychange(refvalue, index)">
                    </div>
                </div>
            </div>
            <div class="col-sm-5">
                <div class="row">
                    <div class="col-sm-2">
                        <p>Value</p>
                    </div>
                    <div class="col-sm-10">
                        <input class="form-control" @change="onvaluechange(refvalue, index)">
                    </div>
                </div>
            </div>
            <div class="col-sm-2">
                <button class="btn btn-primary"  @click="remove(refvalue, index)">Remove</button>
            </div>
        </div>
    </div>
    `
})

Vue.component("add_object_element", {
    props:["index", "refvalue", "add"],
    template:`
    <div class="row">
        <div class="col-sm" style="text-align: right">
            <button class="btn btn-primary" @click="add(refvalue)">Add</button>
        </div>
    </div>
    `
})

Vue.component("remove_non_empty_object_element", {
    props:["index", "refvalue", "remove"],
    template:`
    <div class="row">
        <div class="col-sm">
            <button class="btn btn-primary"  @click="remove(refvalue, index)">Remove</button>
        </div>
    </div>
    `
})

new Vue({
    el: "#app",
    data: {
        idList : [],
        yamlInput: {
            metadata: deploymentMetadata,
            spec: deploymentSpec,
            status: deploymentStatus
        },
        yamlOutput:{
            apiVersion: " ",
            metadata:{},
            spec: {},
            status: {}
        }
    },
    methods: {
        onApiVersionChange(){
            this.yamlOutput.apiVersion = event.target.value
        },
        addIdNameToIdList(){
            if(this.idList.indexOf(event.target.value) === -1){
                this.idList.push(event.target.value)
            } else {
                let index = this.idList.indexOf(event.target.value);
                if (index !== -1) this.idList.splice(index, 1);
            }
        },
        checkIdNameInIdList(idName){
            return this.idList.indexOf(idName)
        },
        checkIndexValueInYamlOutput(strObjectPath, index){

            let computeObjectPath = (objPath) => {
                let pathInArr = objPath.split("-")
                let currentPath = this.yamlOutput
                
                for( let i = 0; i < pathInArr.length; i++ ){
                    if(pathInArr[i] !== "empty"){
                        if(Number(pathInArr[i])){
                            currentPath = currentPath[Number(pathInArr[i])]
                        } else {
                            if(typeof(currentPath[pathInArr[i]]) !== 'undefined'){
                                currentPath = currentPath[pathInArr[i]]
                            }
                        }
                    }
                }
                return currentPath   
            }

            let objectRef = computeObjectPath(strObjectPath)
        
            if(objectRef.constructor === Array){
                if(index+1 <= objectRef.length){
                    return true
                } else {
                    return false
                }   
            }   


            if(objectRef.constructor === Object){   
                if(index <= Object.keys(objectRef).length){
                    return true
                } else {
                    return false
                }   
            }

        },
        // This function is called while rendering to check wheather object is empty or not. Based on that value it will render different views
        isObjectIsEmpty(strObjectPath, objectKey){

            let computeObjectPath = (objPath) => {
                let pathInArr = objPath.split("-")
                let currentPath = this.yamlInput
                
                for( let i = 0; i < pathInArr.length; i++ ){
                    if(pathInArr[i] !== "empty"){
                        if(Number(pathInArr[i])){
                            currentPath = currentPath[Number(pathInArr[i])]
                        } else {
                            currentPath = currentPath[pathInArr[i]]
                        }
                    }
                }

                return currentPath   
            }

            objectRef = computeObjectPath(strObjectPath)

            // Pointing to starting element of an array to check whether object is empty or not
            if(objectRef.constructor === Array){
                return (Object.keys(objectRef[0][objectKey][0]).length === 0) ? true : false
            }
            if(objectRef.constructor === Object){
                return (Object.keys(objectRef[objectKey][0]).length === 0) ? true : false
            }

        },
        checkTypeForObjectProperty(objPath){
            let pathInArr = objPath.split("-")
            let currentPath = this.yamlInput

            for( let i = 0; i < pathInArr.length; i++ ){
                if(pathInArr[i] !== "empty"){
                    if(Number(pathInArr[i])){
                        currentPath = currentPath[Number(pathInArr[i])]
                    } else {
                        currentPath = currentPath[pathInArr[i]]
                    }
                }
            }
            
            if( currentPath.constructor === Object){
                return {}
            } else if(currentPath.constructor === Number) {
                return 0000
            } else if(currentPath.constructor === String){
                return " "
            } else if(currentPath.constructor === Array){
                if(currentPath[0].constructor === String)
                    return [" "]
                if(currentPath[0].constructor === Object)
                    if(Object.keys(currentPath[0]).length === 0){
                        return {}
                    }else{
                        return [{}]
                    }
            }
        },
        addObjectElement() {
            let computeObjectPath = (objPath) => {
                let pathInArr = objPath.split("-")
                let currentPath = this.yamlOutput

                for( let i = 0; i < pathInArr.length - 1; i++ ){
                    if(pathInArr[i] !== "empty"){
                        if(Number(pathInArr[i])){
                            currentPath = currentPath[Number(pathInArr[i])]
                        } else {
                            currentPath = currentPath[pathInArr[i]]
                        }
                    }
                }
                return currentPath
            }

            let objectRef = computeObjectPath(event.target.value)
            let elementName = event.target.innerHTML.trim()

            if(objectRef.hasOwnProperty(elementName)){
                Vue.delete(objectRef, elementName)
            } else {
                Vue.set(objectRef, event.target.innerHTML.trim(), this.checkTypeForObjectProperty(event.target.value))
            }
        },
        onStringChange(objectPath, parentelement) {
            let computeObjectPath = (objPath) => {
                let pathInArr = objPath.split("-")
                let currentPath = this.yamlOutput

                for( let i = 0; i < pathInArr.length - 1; i++ ){
                    if(pathInArr[i] !== "empty"){
                        if(Number(pathInArr[i])){
                            currentPath = currentPath[Number(pathInArr[i])]
                        } else {
                            currentPath = currentPath[pathInArr[i]]
                        }
                    }
                }
                return currentPath
            }
            
            // ----
            // if event.targer.value is Number in form of string then string will converted to Number assigned to object else string value is assigned
            // ----

            Vue.set(computeObjectPath(objectPath), parentelement, isNaN(Number(event.target.value)) ? event.target.value : Number(event.target.value))
        },
        addStringElementToArray(strObjectPath){
            let computeObjectPath = (objPath) => {
                let pathInArr = objPath.split("-")
                let currentPathOfYamlInput = this.yamlInput
                let currentPathOfYamlOutput = this.yamlOutput
                
                for( let i = 0; i < pathInArr.length; i++ ){
                       
                    if(pathInArr[i] !== "empty"){
                        if(isNaN(pathInArr[i])){
                            currentPathOfYamlInput = currentPathOfYamlInput[pathInArr[i]]
                            currentPathOfYamlOutput = currentPathOfYamlOutput[pathInArr[i]]
                        } else {
                            currentPathOfYamlInput = currentPathOfYamlInput[Number(pathInArr[i])]
                            currentPathOfYamlOutput = currentPathOfYamlOutput[Number(pathInArr[i])]
                        }
                    }
                }

                return [currentPathOfYamlInput, currentPathOfYamlOutput]   
            }

            // ----
            // Updating both yamlInput and yamlOutput data to show input fields
            // ----
            
            let [ objectYamlInputRef, objectYamlOutputRef ] = computeObjectPath(strObjectPath)
            objectYamlInputRef.push(" ")
            objectYamlOutputRef.push(" ")
        },
        onStringElementInArrayChange(strObjectPath, index ){

            let computeObjectPath = (objPath) => {
                let pathInArr = objPath.split("-")
                let currentPath = this.yamlOutput
                
                for( let i = 0; i < pathInArr.length; i++ ){
                    if(pathInArr[i] !== "empty"){
                        if(Number(pathInArr[i])){
                            currentPath = currentPath[Number(pathInArr[i])]
                        } else {
                            currentPath = currentPath[pathInArr[i]]
                        }
                    }
                }

                return currentPath   
            }

            objectRef = computeObjectPath(strObjectPath)
            Vue.set(objectRef, index, event.target.value)
        },
        removeStringElementFromArray(strObjectPath, index){
        
            if(index !== 0){
                let computeObjectPath = (objPath) => {
                    let pathInArr = objPath.split("-")
                    let currentPathOfYamlInput = this.yamlInput
                    let currentPathOfYamlOutput = this.yamlOutput
                    
                    for( let i = 0; i < pathInArr.length; i++ ){
                        if(pathInArr[i] !== "empty"){
                            if(Number(pathInArr[i])){
                                currentPathOfYamlInput = currentPathOfYamlInput[Number(pathInArr[i])]
                                currentPathOfYamlOutput = currentPathOfYamlOutput[Number(pathInArr[i])]
                            } else {
                                currentPathOfYamlInput = currentPathOfYamlInput[pathInArr[i]]
                                currentPathOfYamlOutput = currentPathOfYamlOutput[pathInArr[i]]
                            }
                        }
                    }
                    return [currentPathOfYamlInput, currentPathOfYamlOutput]   
                }
    
                // ----
                // Deleting both yamlInput and yamlOutput data to show input fields
                // ----
                let [ objectYamlInputRef, objectYamlOutputRef ] = computeObjectPath(strObjectPath)
                  
                Vue.delete(objectYamlInputRef, index)
                Vue.delete(objectYamlOutputRef, index)
            }
        },
        addMapElementTOArray(strObjectPath, index){   
            
            let computeObjectPath = (objPath) => {
                let pathInArr = objPath.split("-")
                let currentPathOfYamlInput = this.yamlInput
                let currentPathOfYamlOutput = this.yamlOutput
                
                for( let i = 0; i < pathInArr.length; i++ ){
                    if(pathInArr[i] !== "empty"){
                        if(Number(pathInArr[i])){
                            currentPathOfYamlInput = currentPathOfYamlInput[Number(pathInArr[i])]
                            currentPathOfYamlOutput = currentPathOfYamlOutput[Number(pathInArr[i])]
                        } else {
                            currentPathOfYamlInput = currentPathOfYamlInput[pathInArr[i]]
                            currentPathOfYamlOutput = currentPathOfYamlOutput[pathInArr[i]]
                        }
                    }
                }
                return [currentPathOfYamlInput, currentPathOfYamlOutput]   
            }

            // ----
            // Updating both yamlInput and yamlOutput data to show input fields
            // ----
            let [ objectYamlInputRef, objectYamlOutputRef ] = computeObjectPath(strObjectPath)

            // Checks whether object is empty or not. If empty then already available object in yamlInput will render if not then empty inputs will render.
            if(Object.keys(objectYamlInputRef[0]).length === 0){
                objectYamlInputRef.push({})
                Vue.set(objectYamlOutputRef, " ", " ")
            } else {
                let objectValueInArray  = objectYamlInputRef[0]
                objectYamlInputRef.push(objectValueInArray)
                objectYamlOutputRef.push({})
            }
        },
        onMapKeyElementChange(strObjectPath, index){
            let computeObjectPath = (objPath) => {
                let pathInArr = objPath.split("-")
                let currentPath = this.yamlOutput
                
                for( let i = 0; i < pathInArr.length; i++ ){
                    if(pathInArr[i] !== "empty"){
                        if(Number(pathInArr[i])){
                            currentPath = currentPath[Number(pathInArr[i])]
                        } else {
                            currentPath = currentPath[pathInArr[i]]
                        }
                    }
                }
                return currentPath   
            }

            objectRef = computeObjectPath(strObjectPath)

            Vue.delete(objectRef, " ")
            Vue.set(objectRef, event.target.value, " ")
        },
        onValueKeyElementChange(strObjectPath, index){
            let computeObjectPath = (objPath) => {
                let pathInArr = objPath.split("-")
                let currentPath = this.yamlOutput
                
                for( let i = 0; i < pathInArr.length; i++ ){
                    if(pathInArr[i] !== "empty"){
                        if(Number(pathInArr[i])){
                            currentPath = currentPath[Number(pathInArr[i])]
                        } else {
                            currentPath = currentPath[pathInArr[i]]
                        }
                    }
                }
                return currentPath   
            }

            objectRef = computeObjectPath(strObjectPath)
    
            Vue.set(objectRef, Object.keys(objectRef)[index - 1], event.target.value)
        },
        removeMapElementFromArray(strObjectPath, index){

            if(index !== 0){
                let computeObjectPath = (objPath) => {
                    let pathInArr = objPath.split("-")
                    let currentPathOfYamlInput = this.yamlInput
                    let currentPathOfYamlOutput = this.yamlOutput
                    
                    for( let i = 0; i < pathInArr.length; i++ ){
                        if(pathInArr[i] !== "empty"){
                            if(Number(pathInArr[i])){
                                currentPathOfYamlInput = currentPathOfYamlInput[Number(pathInArr[i])]
                                currentPathOfYamlOutput = currentPathOfYamlOutput[Number(pathInArr[i])]
                            } else {
                                currentPathOfYamlInput = currentPathOfYamlInput[pathInArr[i]]
                                currentPathOfYamlOutput = currentPathOfYamlOutput[pathInArr[i]]
                            }
                        }
                    }
    
                    return [currentPathOfYamlInput, currentPathOfYamlOutput]   
                }
    
                // ----
                // Deleting both yamlInput and yamlOutput data to show input fields
                // ----
                let [ objectYamlInputRef, objectYamlOutputRef ] = computeObjectPath(strObjectPath)
                  
                Vue.delete(objectYamlInputRef, index)
                Vue.delete(objectYamlOutputRef, Object.keys(objectYamlOutputRef)[index-1])
            }
        }
    },
    computed:{
        yamlFile () {
            let yamlObj={
                apiVersion: this.yamlOutput.apiVersion,
                kind: "Deployment",
                metadata: this.yamlOutput.metadata,
                spec: this.yamlOutput.spec,
                status: this.yamlOutput.status,
            }
        return jsyaml.dump(yamlObj);
        }
    }
})
