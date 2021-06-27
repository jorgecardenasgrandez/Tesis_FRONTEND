import axios from 'axios'
import router from '@/router'
import { controllers } from 'chart.js'

export default{
    namespaced:true,
    state:{
        user: null,
        snack_u:{
            model_snack:false,
            msg:''
        },

        valor_username: [],

    },
    mutations:{
        set_usuarios(state, payload){
            state.valor_username = payload
        },
        
        set_usuario(state, payload){
            state.valor_username.push(payload)
        },

        actualizar(state, payload){
            Object.assign(state.valor_username[payload.idx], payload.user) //Si editamos correctamente, va a cambiar la vista
        },

        eliminar(state, idx){
            state.valor_username.splice(idx, 1)
        }
    },

    actions:{
        async initialize ({commit}) {
            try {
                await axios.get('api/user/list/', {
                    headers: {Authorization: 'Token ' + (JSON.parse(localStorage.getItem('user_token'))).token}
                }).then(function(response) {
                    
                    const usuarios = []
                    response.data.forEach(element => {
                        usuarios.push(element)    
                    })

                    commit('set_usuarios', usuarios)

                }).catch(error => {
                    console.log("error 1")
                    console.log(error.response.data)  // Error de que no esta actualizado el token
                    //commit('mostrarSnackBar', error.response.data.detail)
                })
            } catch (error) {
                console.log(error.response.data)
            }
        },

        async registrar_usuario({commit}, usuario){
            const nuevo_usuario = {}
            if (usuario.genero === 'Male'){ nuevo_usuario.genero = 'M' }else{ nuevo_usuario.genero = 'F' }

            if (usuario.is_staff === 'Admin'){ nuevo_usuario.is_staff = true }else{ nuevo_usuario.is_staff = false }

            nuevo_usuario.nombres = usuario.nombres
            nuevo_usuario.apellidos = usuario.apellidos
            nuevo_usuario.username = usuario.username
            nuevo_usuario.password = usuario.password
            
            try{
                const response = await axios.post('api/user/register/', 
                                                nuevo_usuario, 
                                                {headers: 
                                                    {Authorization: 'Token ' + (JSON.parse(localStorage.getItem('user_token'))).token}
                                                })

                commit('set_usuario', nuevo_usuario)
                
            }catch(error){
                console.log(error)
            }
        },

        async actualizar_usuario({commit}, objeto){
            const usuario_edit = {}
            if (objeto.user.genero === 'Male'){ usuario_edit.genero = 'M' }else{ usuario_edit.genero = 'F' }

            if (objeto.user.is_staff === 'Admin'){ usuario_edit.is_staff = true }else{ usuario_edit.is_staff = false }
            
            usuario_edit.nombres = objeto.user.nombres
            usuario_edit.apellidos = objeto.user.apellidos
            usuario_edit.username = objeto.user.username
            
            try{
                await axios.put(`api/user/update/${objeto.user.id}/`, 
                usuario_edit, 
                {headers: {Authorization: 'Token ' + (JSON.parse(localStorage.getItem('user_token'))).token}}
                ).then(response => {
                    commit('actualizar', {idx: objeto.index, user: usuario_edit})
                }).catch(error => {
                    console.log("error 1")
                    console.log(error.response.data)  // Error de que no esta actualizado el token
                    //commit('mostrarSnackBar', error.response.data.detail)
                })
            }catch(error){
                console.log(error)
            }
        },

        async eliminar_usuario({commit}, identificador){
            try{
                await axios.delete(`api/user/delete/${identificador.id}/`, {
                    headers: {Authorization: 'Token ' + (JSON.parse(localStorage.getItem('user_token'))).token}
                }).then(response => {

                    commit('eliminar', identificador.index)

                }).catch(error => {
                    console.log("error 1")
                    console.log(error.response.data)  // Error de que no esta actualizado el token
                    //commit('mostrarSnackBar', error.response.data.detail)
                })
            }catch(error){
                console.log(error)
            }
        }
    },

    getters: {
        
    }
}