import Vue from 'vue'
import Vuex from 'vuex'

import simula from '../store_modulos/Simulacion'
import usuarios_main from '../store_modulos/Usuarios_test'
import paciente_main from '../store_modulos/Paciente'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    simula, usuarios_main, paciente_main
  }
})
