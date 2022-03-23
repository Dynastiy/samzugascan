import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/layout/indexPage.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView,
        children: [{
            path: '/',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/pages/indexPage.vue')
        }, ]
    },

    {
        path: '/blocks',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/layout/otherPages.vue'),
        children: [{
            path: '/blocks',
            name: 'blocks',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/pages/blocksPage.vue')
        }, {
            path: '/txns',
            name: 'txns',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/pages/txnsPage.vue')
        }, ]
    },

    {
        path: '/:catchAll(.*)',
        name: '',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/pages/errorPage.vue"),
    },
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    routes
})

export default router