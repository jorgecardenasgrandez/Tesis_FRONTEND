import axios from 'axios'
import router from '@/router'

export default{
    namespaced:true,
    state:{
        user: null,
        snack:{
            model_snack:false,
            msg:'',
            color: 'success',
            icono_success: true
        },
        loading:{
            estado:false
        }
    },
    mutations:{
        set_message(state, msg){
            if (msg.status === 403){  //user not found
                state.snack.model_snack = true
                state.snack.msg = msg.data.detail
                state.snack.color = 'amber darken-3' // info
                state.snack.icono_success = false
            }else if(msg.status === 200){  //delete
                state.snack.model_snack = true
                state.snack.msg = msg.data.detail
                state.snack.color = 'success'
                state.snack.icono_success = true
            }else{
                state.snack.model_snack = true
                state.snack.msg = 'Internal Server Error'
                state.snack.color = 'error'
                state.snack.icono_success = false
            }
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

        async obtener_token({commit, state}, credenciales){
            try {
                state.loading.estado=true
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
                    commit('set_message', error.response)
                })
            } catch (error) {
                console.log(error)
                commit('set_message', {'status': 500})
            }finally{
                state.loading.estado=false
            }
            
        },

        async logout({commit}){
            try{
                await axios.get('api/user/logout/', {
                    headers: {Authorization: 'Token ' + (JSON.parse(localStorage.getItem('user_token'))).token}
                }).then(response => {
                    commit('eliminar_token')
                    commit('set_message', response)

                }).catch(error => {
                    commit('set_message', error.response)
                })
            }catch(error){
                console.log(error)
                commit('mostrarSnackBar', {'status': 500})
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