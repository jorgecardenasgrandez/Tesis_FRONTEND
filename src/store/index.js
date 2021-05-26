import Vue from 'vue'
import Vuex from 'vuex'

import simula from '../store_modulos/Simulacion'
import usuarios_main from '../store_modulos/Usuarios_test'
import paciente_main from '../store_modulos/Paciente'
import factores_main from '../store_modulos/Factores_riesgo'

import listar_predicciones_main from '@/store_modulos/Listar_predicciones'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:null
  },
  
  mutations: {
    setToken(state, tkn){
      this.token = tkn
    }
  },

  actions: {
    
  },

  modules: {
    simula, usuarios_main, paciente_main, factores_main, listar_predicciones_main
  }
})
