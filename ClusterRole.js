let ClusterRoleApiGroup = [
    '', 'scheduling.k8s.io', 'policy', 'rbac.authorization.k8s.io', 'nodemanagement.gke.io', 'batch', 'scalingpolicy.kope.io', 'apps', 
    'authentication.k8s.io', 'metrics.k8s.io', 'cloud.google.com', 'storage.k8s.io', 'networking.k8s.io', 'coordination.k8s.io', 
    'apiextensions.k8s.io', 'authorization.k8s.io', 'apiregistration.k8s.io', 'admissionregistration.k8s.io', 'extensions', 
    'networking.gke.io', 'autoscaling', 'v1', 'node.k8s.io', 'certificates.k8s.io'
]

let ClusterRoleResources = [
    'bindings', 'componentstatuses', 'configmaps', 'endpoints', 'events', 'limitranges', 'namespaces', 'persistentvolumeclaims', 
    'persistentvolumes', 'pods', 'podtemplates', 'replicationcontrollers', 'resourcequotas', 'secrets', 'serviceaccounts', 'services', 
    'mutatingwebhookconfigurations', 'validatingwebhookconfigurations', 'customresourcedefinitions', 'apiservices', 
    'controllerrevisions', 'daemonsets', 'statefulsets', 'tokenreviews', 'localsubjectaccessreviews', 
    'selfsubjectaccessreviews', 'selfsubjectrulesreviews', 'subjectaccessreviews', 'horizontalpodautoscalers', 'cronjobs', 'jobs', 
    'certificatesigningrequests', 'backendconfigs', 'leases', 'deployments', 'ingresses', 'networkpolicies', 
    'podsecuritypolicies', 'replicasets', 'nodes', 'managedcertificates', 'runtimeclasses',
    'updateinfos', 'poddisruptionbudgets', 'clusterrolebindings', 'clusterroles', 'rolebindings', 'roles', 
    'scalingpolicies', 'priorityclasses', 'csidrivers', 'csinodes', 'storageclasses', 'volumeattachments'
]

let ClusterRoleVerbs = [
    "get", "list", "delete", "watch", "deletecollection", "create", "patch", "update"
]

let ClusterNonResourceURLs = [
    "/api",
    "/api/v1",
    "/apis",
    "/apis/",
    "/apis/admissionregistration.k8s.io",
    "/apis/admissionregistration.k8s.io/v1beta1",
    "/apis/apiextensions.k8s.io",
    "/apis/apiextensions.k8s.io/v1beta1",
    "/apis/apiregistration.k8s.io",
    "/apis/apiregistration.k8s.io/v1",
    "/apis/apiregistration.k8s.io/v1beta1",
    "/apis/apps",
    "/apis/apps/v1",
    "/apis/apps/v1beta1",
    "/apis/apps/v1beta2",
    "/apis/authentication.k8s.io",
    "/apis/authentication.k8s.io/v1",
    "/apis/authentication.k8s.io/v1beta1",
    "/apis/authorization.k8s.io",
    "/apis/authorization.k8s.io/v1",
    "/apis/authorization.k8s.io/v1beta1",
    "/apis/autoscaling",
    "/apis/autoscaling/v1",
    "/apis/autoscaling/v2beta1",
    "/apis/batch",
    "/apis/batch/v1",
    "/apis/batch/v1beta1",
    "/apis/certificates.k8s.io",
    "/apis/certificates.k8s.io/v1beta1",
    "/apis/cloud.google.com",
    "/apis/cloud.google.com/v1beta1",
    "/apis/coordination.k8s.io",
    "/apis/coordination.k8s.io/v1",
    "/apis/coordination.k8s.io/v1beta1",
    "/apis/extensions",
    "/apis/extensions/v1beta1",
    "/apis/metrics.k8s.io",
    "/apis/metrics.k8s.io/v1beta1",
    "/apis/networking.gke.io",
    "/apis/networking.gke.io/v1beta1",
    "/apis/networking.k8s.io",
    "/apis/networking.k8s.io/v1",
    "/apis/networking.k8s.io/v1beta1",
    "/apis/node.k8s.io",
    "/apis/node.k8s.io/v1beta1",
    "/apis/nodemanagement.gke.io",
    "/apis/nodemanagement.gke.io/v1alpha1",
    "/apis/policy",
    "/apis/policy/v1beta1",
    "/apis/rbac.authorization.k8s.io",
    "/apis/rbac.authorization.k8s.io/v1",
    "/apis/rbac.authorization.k8s.io/v1beta1",
    "/apis/scalingpolicy.kope.io",
    "/apis/scalingpolicy.kope.io/v1alpha1",
    "/apis/scheduling.k8s.io",
    "/apis/scheduling.k8s.io/v1",
    "/apis/scheduling.k8s.io/v1beta1",
    "/apis/storage.k8s.io",
    "/apis/storage.k8s.io/v1",
    "/apis/storage.k8s.io/v1beta1",
    "/healthz",
    "/healthz/SSH Tunnel Check",
    "/healthz/autoregister-completion",
    "/healthz/etcd",
    "/healthz/log",
    "/healthz/ping",
    "/healthz/poststarthook/apiservice-openapi-controller",
    "/healthz/poststarthook/apiservice-registration-controller",
    "/healthz/poststarthook/apiservice-status-available-controller",
    "/healthz/poststarthook/bootstrap-controller",
    "/healthz/poststarthook/ca-registration",
    "/healthz/poststarthook/crd-informer-synced",
    "/healthz/poststarthook/generic-apiserver-start-informers",
    "/healthz/poststarthook/kube-apiserver-autoregistration",
    "/healthz/poststarthook/rbac/bootstrap-roles",
    "/healthz/poststarthook/scheduling/bootstrap-system-priority-classes",
    "/healthz/poststarthook/start-apiextensions-controllers",
    "/healthz/poststarthook/start-apiextensions-informers",
    "/healthz/poststarthook/start-kube-aggregator-informers",
    "/healthz/poststarthook/start-kube-apiserver-admission-initializer",
    "/logs",
    "/metrics",
    "/openapi/v2",
    "/version"
  ]

let vue = new Vue({
    el: ".app",
    data: {
        version: "",
        clusterRoleName: "",
        apigroup: ClusterRoleApiGroup,
        resources: ClusterRoleResources,
        verbs: ClusterRoleVerbs,
        nonResourceURLs: ClusterNonResourceURLs,
        selectedApiVersion: "",
        selectedApiGroups: [],
        selectedResources: [],
        selectedVerbs: [],
        selectedNonResourceUrls: [],
        selectedNonResourceVerbs: []
    },
    methods:{
        selectApiVersion(e) {
            if(this.selectedApiVersion === ""){
                this.selectedApiVersion = e
            } else {
                this.selectedApiVersion = ""
            }
            console.log(e)
        },
        addToApiGroup(e) {
            if (this.selectedApiGroups.length === 0 || this.selectedApiGroups.indexOf(e) === -1){
                this.selectedApiGroups.push(e)
            } else {
                let index = this.selectedApiGroups.indexOf(e);
                if (index !== -1) this.selectedApiGroups.splice(index, 1);
            }
        },
        addToResources(e) {
            if (this.selectedResources.length === 0 || this.selectedResources.indexOf(e) === -1) {
                this.selectedResources.push(e)
            } else {
                let index = this.selectedResources.indexOf(e);
                if (index !== -1) this.selectedResources.splice(index, 1);
            }
        },
        addToVerbs(e) {
            if (this.selectedVerbs.length === 0 || this.selectedVerbs.indexOf(e) === -1) {
                this.selectedVerbs.push(e)
            } else {
                let index = this.selectedVerbs.indexOf(e);
                if (index !== -1) this.selectedVerbs.splice(index, 1);
            }
        },
        addNonResourceURL(e) {
            if (this.selectedNonResourceUrls.length === 0 || this.selectedNonResourceUrls.indexOf(e) === -1) {
                this.selectedNonResourceUrls.push(e)
            } else {
                let index = this.selectedNonResourceUrls.indexOf(e);
                if (index !== -1) this.selectedNonResourceUrls.splice(index, 1);
            }
        },
        addNonResourceVerbs(e) {
            if (this.selectedNonResourceVerbs.length === 0 || this.selectedNonResourceVerbs.indexOf(e) === -1) {
                this.selectedNonResourceVerbs.push(e)
            } else {
                let index = this.selectedNonResourceVerbs.indexOf(e);
                if (index !== -1) this.selectedNonResourceVerbs.splice(index, 1);
            }
        }
    },
    computed:{
        yamlFile () {
            var yamlObj = {
                    apiVersion: "rbac.authorization.k8s.io/" + this.selectedApiVersion,
                    kind: "ClusterRole",
                    metadata:
                        {
                            name: this.clusterRoleName
                        },
                    rules:
                        [
                            {
                                apiGroups: this.selectedApiGroups,
                                resources: this.selectedResources,
                                verbs: this.selectedVerbs
                            },
                            {
                                nonResourceURLs: this.selectedNonResourceUrls,
                                verbs: this.selectedNonResourceVerbs
                            }
                        ]
                }
                console.log("[[[[[")
        return jsyaml.dump(yamlObj);
        }
    }
})