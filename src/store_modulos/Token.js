import axios from 'axios'
import router from '@/router'

export default{
    namespaced:true,
    state:{
        user: null,
        snack:{
            model_snack:false,
            msg:''
        }
    },
    mutations:{
        mostrarSnackBar(state, msg){
            state.snack.model_snack = true
            state.snack.msg = msg
        },

        set_usuario(state, payload){
            state.user = payload
        },

        eliminar_token(state){
            state.user = null
            localStorage.removeItem('user_token')
            router.push({name:'iniciar_sesion'})
        }
        
    },

    actions:{
        cargar_local_storage({commit}){
            if (localStorage.getItem('user_token')){
                const usuario = (JSON.parse(localStorage.getItem('user_token'))).user
                commit('set_usuario', usuario)
            }else{
                commit('set_usuario', null)
            }
        },

        async obtener_token({commit}, credenciales){
            try {
                await axios.post('api/user/login/', {
                    username: credenciales.username,
                    password: credenciales.password
                }).then(response => {
                    const user = response.data.user
                    commit('set_usuario', user)

                    if (user.user_type){  // Administrador
                        router.push({name:'administrador'})
                    }else{  // Medico
                        router.push({name:'medico'})
                    }
                    localStorage.setItem('user_token', JSON.stringify(response.data))

                }).catch(error => {
                    commit('mostrarSnackBar', error.response.data.detail)
                })
            } catch (error) {
                console.log(error)
                commit('mostrarSnackBar', "Error en la consulta!.")
            }
        },

        async logout({commit}){
            try{
                await axios.get('api/user/logout/', {
                    headers: {Authorization: 'Token ' + (JSON.parse(localStorage.getItem('user_token'))).token}
                }).then(response => {
                    
                    commit('eliminar_token')

                }).catch(error => {
                    commit('mostrarSnackBar', error.response.data.detail)
                })
            }catch(error){
                console.log("GENERAL:", error)
                commit('mostrarSnackBar', "Error en la consulta!.")
            }
        },
    },

    getters: {
        loggedIn(state){
            return !!state.user 
        },
        get_first_name(state){
            return state.user.first_name
        }
    }
}