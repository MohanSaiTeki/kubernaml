import Vue from 'vue'
import VueRouter from "vue-router"

import Home from "./views/Home"
import Main from "./views/Main"
import NotFoundPage from "./views/NotFoundPage"
import {deploymentMetadata, deploymentStatus, deploymentSpec} from "./values/deployment"
import {daemonsetMetadata, daemonsetStatus, daemonsetSpec} from "./values/daemonset"

const routes = [
    {
        name: "404 Page",
        path: "*",
        component: NotFoundPage
    },
    {
        name: "Home Page",
        path: "/",
        component: Home
    },
    {
        name: "Deployment Page",
        path: '/deployment',
        component: Main,
        props: {
            kindName: "Deployment",
            metadata: deploymentMetadata,
            spec: deploymentSpec,
            status: deploymentStatus
        }
    },
    {
        name: "Daemonset Page",
        path: '/daemonset',
        component: Main,
        props: {
            kindName: "DaemonSet",
            metadata: daemonsetMetadata,
            spec: daemonsetSpec,
            status: daemonsetStatus
        }
    },
]

Vue.use(VueRouter)

const router = new VueRouter({
    base: 'public',
    mode: 'history',
    routes
})

export default router;