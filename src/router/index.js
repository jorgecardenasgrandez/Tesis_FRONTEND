import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
  const routes = [
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    name: 'iniciar_sesion',
    component: () => import(/* webpackChunkName: "about" */ '../views/Sesion/Iniciar_sesion.vue')
  },
  {
    path: '/medico',
    name: 'medico',
    component: () => import(/* webpackChunkName: "about" */ '../views/Medico/Prediccion.vue')
  },
  {
    path: '/listar_pacientes',
    name: 'pacientes',
    component: () => import(/* webpackChunkName: "about" */ '../views/Medico/ListarPacientes.vue')
  },
  {
    path: '/listar_predicciones/:id',
    name: 'predicciones',
    component: () => import(/* webpackChunkName: "about" */ '../views/Medico/ListarPredicciones.vue')
  },
  {
    path:'/admin',
    name: 'administrador',
    component: () => import(/* webpackChunkName: "about" */ '../views/Administrador/Panel_admin.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
