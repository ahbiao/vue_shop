import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/users/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'
},
{
  path: '/login',
  component: Login
}, {
  path: '/home',
  component: Home,
  redirect: '/welcome',
  children: [{
    path: '/welcome',
    component: Welcome
  }, {
    path: '/users',
    component: Users
  }, {
    path: '/rights',
    component: Rights
  }, {
    path: '/roles',
    component: Roles
  }, {
    path: '/categories',
    component: Cate
  }]
}
]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 表示将来要访问的路径
  // from 表示从哪个路径跳转而来
  // next 是个函数 表示放行   next()   next('路径') 强制跳转到指定路径
  if (to.path === '/login') return next()
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})
export default router
