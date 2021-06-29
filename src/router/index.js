import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'iniciar_sesion',
    component: () => import(/* webpackChunkName: "about" */ '../views/Sesion/Iniciar_sesion.vue'),
  },
  {
    path: '/medico',
    name: 'medico',
    component: () => import(/* webpackChunkName: "about" */ '../views/Medico/Prediccion.vue'),
    meta: {ruta_protegida:true}
  },
  {
    path: '/listar_pacientes',
    name: 'pacientes',
    component: () => import(/* webpackChunkName: "about" */ '../views/Medico/ListarPacientes.vue'),
    meta: {ruta_protegida:true}
  },
  {
    path: '/listar_predicciones/:id',
    name: 'predicciones',
    component: () => import(/* webpackChunkName: "about" */ '../views/Medico/ListarPredicciones.vue'),
    meta: {ruta_protegida:true}
  },
  {
    path:'/admin',
    name: 'administrador',
    component: () => import(/* webpackChunkName: "about" */ '../views/Administrador/Panel_admin.vue'),
    meta: {ruta_protegida:true}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.ruta_protegida){
    console.log(store.getters['usuarios_main/loggedIn'])
    if(store.getters['usuarios_main/loggedIn']){
      next()
    }else{
      next('/')
    }
  }else{
    next()
  }
})

export default router
