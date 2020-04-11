Vue.component('objectcomponent', {
    name: "temp",
    props: ["arr", "updateyaml", "refvalue", "updatestring", "add_string_element_to_array", 
                    "on_string_element_in_array_change", "remove_string_element_from_array",
                    "is_object_is_empty", "indexvalue", "add_map_element_to_array", "on_map_key_element_change",
                    "on_map_value_element_change", "remove_map_element_from_array"
                ],
    template:`
    <div>
        <button 
            v-for="(value, key) in arr" 
            class="btn btn-primary" 
            data-toggle="collapse" 
            :data-target="'#' + refvalue + '-' + indexvalue + '-' + key" 
            :value="refvalue + '-' + indexvalue + '-' + key" 
            @click="updateyaml"
            >
            {{ key }}
        </button>
        <div v-for="(value, key) in arr">
            <div v-if="( (!!value) && (value.constructor === String) ) || (value.constructor === Number)" class="collapse" :id="refvalue + '-' + indexvalue + '-' + key" >
                <string_component 
                    :stringvalue=key 
                    :refvalue="refvalue + '-' + indexvalue + '-' + key" 
                    :changestring="updatestring" 
                    :parentelement="key"
                    >
                </string_component>
            </div>
             
            <div v-if="(!!value) && (value.constructor === Array)" class="collapse" :id="refvalue + '-' + indexvalue + '-' + key" >
                <div v-if="value[0].constructor === String">
                    <div class="row">
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
                    </div>
                        
                    <div v-for="(value, index) in value">
                        <array_string_component 
                            :refvalue="refvalue + '-' + indexvalue + '-' + key"   
                            :index=index
                            :onchange="on_string_element_in_array_change"
                            :remove="remove_string_element_from_array"
                            > 
                        </array_string_component>
                    </div>
                </div>

                <div v-if="value[0].constructor === Object" >
                    <div class="row">
                        <div class="col-sm-6">
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
                                >
                                </array_empty_object_component>
                            </div>
                        </div>
                    </div>

                    <div v-else>
                        <div class="col-sm-12">
                            <div v-for="(obj, index) in value" >
                                <div class="row">
                                    <div class="col-sm-10">
                                        <objectcomponent 
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
                <div class="row">
                    <div class="col-sm-12">
                        {{ key }}   <!-- name of the field -->
                    </div>
                    <div class="col-sm-12">
                        <objectcomponent 
                            :arr=value 
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
        <div class="row">
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
            <button @click="add(refvalue)">Add element</button>
        </div>
    </div>
    `
})

Vue.component('array_string_component', {
    props: ["refvalue", "index", "onchange", "remove"],
    template: `
        <div class="row">
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
    `
})

Vue.component("array_empty_object_component", {
    props:["refvalue", "index", "onkeychange", "onvaluechange", "remove" ],
    template:`
    <div class="row">
        <div class="col-sm-5">
            <p>Key</p>
            <input class="form-control" @change="onkeychange(refvalue, index)">
        </div>
        <div class="col-sm-5">
            <p>Value</p>
            <input class="form-control" @change="onvaluechange(refvalue, index)">
        </div>
        <div class="col-sm-2">
            <button @click="remove(refvalue, index)">Remove</button>
        </div>
    </div>
    `
})

Vue.component("add_object_element", {
    props:["index", "refvalue", "add"],
    template:`
    <div class="row">
        <div class="col-sm">
            <button @click="add(refvalue)">Add element</button>
        </div>
    </div>
    `
})

Vue.component("remove_non_empty_object_element", {
    props:["index", "refvalue", "remove"],
    template:`
    <div class="row">
        <div class="col-sm">
            <button @click="remove(refvalue, index)">Remove</button>
        </div>
    </div>
    `
})

new Vue({
    el: "#app",
    data: {
        yamlInput: {
            metadata: {
                annotations: [{}],
                clusterName: " ",
                creationTimestamp: " ",
                deletionGracePeriodSeconds:  0,
                deletionTimestamp: " ",
                finalizers: [''],
                xcvnm: [{}],
                generateName: " ",
                generation: 0,
                labels: " ",
                managedFields: {
                    apiVersion: " ",
                    fields: " ",
                    manager: " ",
                    operation: " ",
                    time: " "
                },
                name: " ",
                namespace: " ",
                ownerReferences: {
                apiVersion: " ",
                blockOwnerDeletion: " ",
                controller: " ",
                kind: " ",
                name: " ",
                uid: " "
                },
                resourceVersion: " ",
                selfLink: " ",
                uid: " "
            },
            spec: {
                clusterIP: " ",
                externalIPs: " ",
                externalName: " ",
                externalTrafficPolicy: " ",
                healthCheckNodePort: 0000,
                loadBalancerIP: " ",
                loadBalancerSourceRanges: [""],
                ports: [{
                    name: " ",
                    nodePort: 0000,
                    port: 0000,
                    protocol: " ",
                    targetPort: " ",
                    tempArrObject:[{
                        polrt: " "
                    }],
                    nestedObject:[{
                        arr:[{}]
                    }],
                    tempArrString:[""],
                    tempObject:{
                        name1: {
                            pp: " "
                        },
                        arrvalue: [{
                            qq: " ",
                            nesarr: {
                                qwer: [{}]
                            }
                        }]
                    }
                }],
                publishNotReadyAddresses: " ",
                selector: [""],
                sessionAffinity: " ",
                sessionAffinityConfig: {
                    clientIP: {
                        timeoutSeconds: 0000,
                        type: " "
                        }
                    }
                },
            status: {
                loadBalancer: {
                    ingress: {
                        hostname: " ",
                        ip: " ",
                    }
                }
            }
        },
        yamlOutput:{
            metadata:{},
            spec: {},
            status: {}
        }
    },
    methods: {
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
                Vue.delete(objectYamlOutputRef, index)
            }
        }
    },
    computed:{
        yamlFile () {
            let yamlObj={
                apiVersion: "v1",
                kind: "Service",
                metadata: this.yamlOutput.metadata,
                spec: this.yamlOutput.spec,
                status: this.yamlOutput.status,
            }
        return jsyaml.dump(yamlObj);
        }
    }
})