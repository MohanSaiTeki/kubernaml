<template>
	<v-container style="text-align: center"> 
		<v-row>
			<v-col md="12" sm="12" xs="12" lg="12" xl="12">
				<div id="heading-title"> Kubernaml </div>
			</v-col>
		</v-row>
		<v-row>
			<v-col md="12" sm="12" xs="12" lg="12" xl="12">
				<div id="quotation" >Simple way to generate the YAML configuration files for your kubernetes cluster </div>
			</v-col>
		</v-row>
		<v-row>
			<v-col md="12" sm="12" xs="12" lg="12" xl="12">
				<div id="description"> Just select the requried properties for your configuration file, YAML file will be generated automatically </div>
			</v-col>
		</v-row>
		<v-row>
			<v-col md="12" sm="12" xs="12" lg="12" xl="12" class="img-src">
				<img  :src="require('../assets/example.png')" alt="example image" width="100%"/>
			</v-col>
		</v-row>

		<v-row>
			<v-col md="12">
				<div class="heading-1" id="supported-kinds">Currently supported kinds</div>
				<v-row>
						<v-col v-for="(i, key) in kinds" :key="key" md="3" sm="3" xs="3" lg="3" xl="3">
							<v-btn :to='i'>{{ i }}</v-btn>
						</v-col>
				</v-row>
			</v-col>
		</v-row>

		<v-row>
			<v-col md="12">
				<div class="heading-1" id="tech-stack">Tech Stack</div>
			</v-col>
		</v-row>
		<v-row>
			<v-col md="12">
				<div id="tools"> This tool is developed by using <a href="https://vuejs.org/">Vue.js</a>  and <a href="https://vuetifyjs.com/en/">Vuetify</a> </div>
			</v-col>
		</v-row>

		<v-row>
			<v-col md="12">
				<div class="heading-1" id="help-needed ">Help this project</div>
			</v-col>
		</v-row>
		<v-row>
			<v-col md="12">
				<v-row>
					<v-col md="4"> 
						<div id="github-repo"><a href="https://github.com/MohanSai1997/kube-yaml-gen">GitHub Repo</a></div>
					</v-col>
					<v-col md="4">
						<div id="issues"> <a href="https://github.com/MohanSai1997/kube-yaml-gen/issues">Issues</a> </div>
					</v-col>
					<v-col md="4">
						<div id="todo-list"> <a href="https://github.com/MohanSai1997/kube-yaml-gen/projects">TODO List</a> </div>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		name: "Home",
		data() {
			return {
				kinds: [
					"Deployment",
					"DaemonSet",
				]
			}
		}
	}	
</script>

<style scope>
#heading-title {
	text-align: center;
	font-size: 44px;
	font-weight: 700;
	margin-top: 16%;
}
#quotation {
	text-align: center;
	font-size: 22px;
	margin-top: 16px
}
#description {
	text-align: center;
	font-size: 28px;
	margin-top: 36px;
}
.img-src {
	margin-top: 5%;
}
.heading-1 {
	font-size: 24px;
	font-weight: 500;
	margin-top: 3%;
}
</style>