export default{
    namespaced:true,
    state:{
        simulacion:{
            toolbar_color:'cyan darken-2',
            boton_color:'red accent-3',
            titulo_card:'Predicción de la mortalidad',
            panel:0,
            simulate:false,
            valid:true
        }
    },
    mutations:{
        cambiar_a_simulacion(state){
            state.simulacion.toolbar_color = 'amber darken-2' 
            state.simulacion.boton_color = 'brown darken-2'
            state.simulacion.titulo_card = 'Simulación'
            state.simulacion.panel = 1
            state.simulacion.simulate = true
            state.simulacion.valid = true
        },
        normalidad(state){
            state.simulacion.toolbar_color = 'cyan darken-2' 
            state.simulacion.boton_color = 'red accent-3'
            state.simulacion.titulo_card = 'Predicción de la mortalidad'
            state.simulacion.panel = 0
            state.simulacion.simulate = false
        }
    },
    actions:{

    }
}