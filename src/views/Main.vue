<template>
	<div>
		<v-row id="heading">
			<v-col>
				<div><b>Kubernaml - {{kindName}}</b></div>
			</v-col>
		</v-row>
		<v-container id="container">
			<p class="hint" :style="$vuetify.breakpoint.width < 960 ? 'display: block' : 'display: none'">Please open the this page in laptop for the best experience</p>
			<v-row>
				<v-col md="7">
					<h3 id="option-headings">Select the YAML Option</h3>
					<!-- <p id="hint"> <b>NOTE:</b> You will loose the selected properties when you close the expanded properties(example clusterName inside the metadata) inside the metadata, spec and status </p> -->
					<v-row>
						<v-col md="2" id="api-version">
							apiVersion
						</v-col>
						<v-col md="10">
							<v-text-field
								hide-details
								outlined
								solo
								dense
								@change="onApiVersionChange"
								/>
						</v-col>
					</v-row>
					<v-expansion-panels>
						<v-expansion-panel>
							<v-expansion-panel-header> Metadata</v-expansion-panel-header>
							<v-expansion-panel-content>
								<ObjectComponent 
									v-bind:arr="yamlInput.metadata"
									v-bind:updateyaml="addObjectElement" 
									v-bind:updatestring="onStringChange" 
									refvalue="metadata"
									indexvalue="empty"
									v-bind:is_object_is_empty="isObjectIsEmpty"
									v-bind:add_string_element_to_array="addStringElementToArray"
									v-bind:on_string_element_in_array_change="onStringElementInArrayChange"
									v-bind:remove_string_element_from_array="removeStringElementFromArray"
									v-bind:add_map_element_to_array="addMapElementTOArray"
									v-bind:on_map_key_element_change="onMapKeyElementChange"
									v-bind:on_map_value_element_change="onValueKeyElementChange"
									v-bind:remove_map_element_from_array="removeMapElementFromArray"
									v-bind:check_yaml_output="checkIndexValueInYamlOutput"
								/>
							</v-expansion-panel-content>
						</v-expansion-panel>

						<v-expansion-panel>
							<v-expansion-panel-header>Spec</v-expansion-panel-header>
							<v-expansion-panel-content>
								<ObjectComponent 
									v-bind:arr="yamlInput.spec"
									v-bind:updateyaml="addObjectElement" 
									v-bind:updatestring="onStringChange" 
									refvalue="spec"
									indexvalue="empty"
									v-bind:is_object_is_empty="isObjectIsEmpty"
									v-bind:add_string_element_to_array="addStringElementToArray"
									v-bind:on_string_element_in_array_change="onStringElementInArrayChange"
									v-bind:remove_string_element_from_array="removeStringElementFromArray"
									v-bind:add_map_element_to_array="addMapElementTOArray"
									v-bind:on_map_key_element_change="onMapKeyElementChange"
									v-bind:on_map_value_element_change="onValueKeyElementChange"
									v-bind:remove_map_element_from_array="removeMapElementFromArray"
									v-bind:check_yaml_output="checkIndexValueInYamlOutput"
								/>	
							</v-expansion-panel-content>
						</v-expansion-panel>

						<v-expansion-panel>
							<v-expansion-panel-header>Status</v-expansion-panel-header>
							<v-expansion-panel-content>
								<ObjectComponent 
									v-bind:arr="yamlInput.status"
									v-bind:updateyaml="addObjectElement" 
									v-bind:updatestring="onStringChange" 
									refvalue="status"
									indexvalue="empty"
									v-bind:is_object_is_empty="isObjectIsEmpty"
									v-bind:add_string_element_to_array="addStringElementToArray"
									v-bind:on_string_element_in_array_change="onStringElementInArrayChange"
									v-bind:remove_string_element_from_array="removeStringElementFromArray"
									v-bind:add_map_element_to_array="addMapElementTOArray"
									v-bind:on_map_key_element_change="onMapKeyElementChange"
									v-bind:on_map_value_element_change="onValueKeyElementChange"
									v-bind:remove_map_element_from_array="removeMapElementFromArray"
									v-bind:check_yaml_output="checkIndexValueInYamlOutput"
								/>	
							</v-expansion-panel-content>
						</v-expansion-panel>

					</v-expansion-panels>
				</v-col>
				<v-col md="5" >
					<div id="output-container">
						<h3 id="option-headings">Generated YAML</h3>
						<div id="yaml-output">
							<pre>{{yamlFile}}</pre>
					</div>
				</div>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
	import ObjectComponent from "../components/ObjectComponent"
	import Vue from "vue"
	import jsyaml from "js-yaml"

	export default {
	name: "Main",
	props: ["kindName", "metadata", "spec", "status"],
	components: {
		ObjectComponent
	},
	data() {
		return {
			// idList : [],
			yamlInput: {
				metadata: this.metadata,
				spec: this.spec,
				status: this.status
			},
			yamlOutput:{
				apiVersion: " ",
				metadata:{},
				spec: {},
				status: {}
			}
		};
	},
	methods: {
		onApiVersionChange(){
			this.yamlOutput.apiVersion = event.target.value
		},
		// addIdNameToIdList(value){
		// 	console.log(this.idList)
		// 	if(this.idList.indexOf(event.target.value) === -1){
		// 		this.idList.push(event.target.value)
		// 	} else {
		// 		let index = this.idList.indexOf(event.target.value);
		// 		if (index !== -1) this.idList.splice(index, 1);
		// 	}
		// },
		// checkIdNameInIdList(idName){
		// 	return this.idList.indexOf(idName)
		// },
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

			let objectRef = computeObjectPath(strObjectPath)

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
				return 0
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
		addObjectElement(value, elementName) {

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

			let objectRef = computeObjectPath(value)

			if(Object.hasOwnProperty.call(objectRef, elementName)){
				Vue.delete(objectRef, elementName)
			} else {
				Vue.set(objectRef, elementName, this.checkTypeForObjectProperty(value))
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

			let objectRef = computeObjectPath(strObjectPath)
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
				console.log("---")
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

			let objectRef = computeObjectPath(strObjectPath)

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

			let objectRef = computeObjectPath(strObjectPath)

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
				kind: this.kindName,
				metadata: this.yamlOutput.metadata,
				spec: this.yamlOutput.spec,
				status: this.yamlOutput.status,
			}
		return jsyaml.dump(yamlObj);
		}
	}
};
</script>

<style>
/* vue class */
.v-input__control {
	margin-bottom: 12px;
}

/* custom id */
.hint {
	text-align: center;
	font-size: 14px; 
	padding: 12px; 
	color: red;
	border-radius: 8px;
}
#api-version {
	text-align: center;
	margin-top: 10px;
}
#heading {
	font-size: 28px;
	padding: 8px;
	text-align: center;
	background-color: #d1e3ff;
}
#option-headings {
	padding: 12px 0px;
}

#container {
	padding: 0px 24px 0px 24px;
	max-width: 100%;
}
#output-container {
	position: sticky; 
	top: 0
}
#yaml-output {
	background-color: #dedede;
	border-radius: 6px;
	padding: 24px;
}
</style>