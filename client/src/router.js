import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      meta: {
        flag: true,
        y: 0
      },
      component: () => import("./views/page/home.vue")
    },
    {
      path: "/detail",
      name: "detail",
      component: () => import("./components/detail/index")
    },
    {
      path: "/search",
      name: "search",
      component: () => import("./views/page/search")
    },
    {
      path: "/classify",
      name: "classify",
      meta: {
        flag: true
      },
      component: () => import("./views/page/classify")
    },
    {
      path: "/shopcar",
      name: "shopcar",
      meta: {
        flag: true
      },
      component: () => import("./views/page/shopcar")
    },
    {
      path: "/profile",
      name: "profile",
      meta: {
        flag: true
      },
      component: () => import("./views/page/profile")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/login/login")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/login/register")
    },
    {
      path: "/position",
      name: "position",
      component: () => import("./views/page/position")
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.flag) {
//     let position = sessionStorage.getItem("position")
//     if (position) {
//       next()
//     } else {
//       next("/position")
//     }
//   } else {
//     next()
//   }
// })


export default router;
