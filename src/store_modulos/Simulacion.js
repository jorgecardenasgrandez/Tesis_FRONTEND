export default{
    namespaced:true,
    state:{
        simulacion:{
            toolbar_color:'cyan darken-2',
            boton_color:'red accent-3',
            titulo_card:'Predicción de la mortalidad'
        }
    },
    mutations:{
        cambiar_a_simualcion(state){
            state.simulacion.toolbar_color = 'amber darken-2' 
            state.simulacion.boton_color = 'brown darken-2'
            state.simulacion.titulo_card = 'Simulación'
        }
    },
    actions:{

    }
}