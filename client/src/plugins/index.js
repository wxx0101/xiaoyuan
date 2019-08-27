module.exports = {
    install(Vue) {
        Vue.component("Footer", () => import("../components/footer.vue"))
        Vue.component("Header", () => import("../components/header.vue"))
        Vue.component("List", () => import("../components/homeList/list.vue"))
        Vue.component("ListItem", () => import("../components/homeList/listItem.vue"))
    }
}