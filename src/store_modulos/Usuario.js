import axios from 'axios'
import router from '@/router'
import { controllers } from 'chart.js'

export default{
    namespaced:true,
    state:{
        snack:{
            model_snack:false,
            msg:'',
            color: 'success',
            icono_success: true
        },
        loading:{
            estado:false
        },

        valor_username: [],

    },
    mutations:{
        set_message(state, msg){
            if (msg.status === 200){
                state.snack.model_snack = true
                state.snack.msg = msg.data.detail
                state.snack.color = 'success'
                state.snack.icono_success = true
            }else if(msg.status === 400){ //username already exists
                state.snack.model_snack = true
                state.snack.msg = msg.data.username[0]
                state.snack.color = 'amber darken-3'
                state.snack.icono_success = false
            }else if(msg.status === 403){
                state.snack.model_snack = true
                state.snack.msg = msg.data.detail
                state.snack.color = 'amber darken-3' // info
                state.snack.icono_success = false
            }else{
                state.snack.model_snack = true
                state.snack.msg = 'Internal Server Error'
                state.snack.color = 'error'
                state.snack.icono_success = false
            }
        },

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
                await axios.get('api/user/list/', 
                                {headers: {Authorization: 'Token ' + (JSON.parse(localStorage.getItem('user_token'))).token}
                                }).then(function(response) {
                                    
                                    const usuarios = []
                                    response.data.forEach(element => {
                                        usuarios.push(element)    
                                    })

                                    commit('set_usuarios', usuarios)

                                }).catch(error => {
                                    commit('set_message', error.response)
                                })
            } catch (error) {
                console.log(error)
                commit('set_message', {'status': 500})
            }
        },

        async registrar_usuario({commit, state}, usuario){
            try{
                state.loading.estado=true

                const nuevo_usuario = {}
                if (usuario.genero === 'Male'){ nuevo_usuario.genero = 'M' }else{ nuevo_usuario.genero = 'F' }

                if (usuario.is_staff === 'Admin'){ nuevo_usuario.is_staff = true }else{ nuevo_usuario.is_staff = false }

                nuevo_usuario.nombres = usuario.nombres
                nuevo_usuario.apellidos = usuario.apellidos
                nuevo_usuario.username = usuario.username
                nuevo_usuario.password = usuario.password

                await axios.post('api/user/register/', 
                                nuevo_usuario, 
                                {headers: {Authorization: 'Token ' + (JSON.parse(localStorage.getItem('user_token'))).token}}
                                ).then(response=>{
                                    commit('set_usuario', nuevo_usuario)
                                    commit('set_message', response)
                                }).catch(error=>{
                                    commit('set_message', error.response)  //username already exists
                                })
            }catch(error){
                console.log(error)
                commit('set_message', {'status': 500})
            }finally{
                state.loading.estado=false
            }
        },

        async actualizar_usuario({commit,state}, objeto){
            try{
                state.loading.estado=true

                const usuario_edit = {}
                if (objeto.user.genero === 'Male'){ usuario_edit.genero = 'M' }else{ usuario_edit.genero = 'F' }

                if (objeto.user.is_staff === 'Admin'){ usuario_edit.is_staff = true }else{ usuario_edit.is_staff = false }
                
                usuario_edit.nombres = objeto.user.nombres
                usuario_edit.apellidos = objeto.user.apellidos
                usuario_edit.username = objeto.user.username

                await axios.put(`api/user/update/${objeto.user.id}/`, 
                                usuario_edit, 
                                {headers: {Authorization: 'Token ' + (JSON.parse(localStorage.getItem('user_token'))).token}}
                                ).then(response => {
                                    commit('actualizar', {idx: objeto.index, user: usuario_edit})
                                    commit('set_message', {status:200, data: {detail:'User successfully edited'}})
                                }).catch(error => {
                                    commit('set_message', error.response)  //username already exists
                                })
            }catch(error){
                console.log(error)
                commit('set_message', {'status': 500})
            }finally{
                state.loading.estado=false
            }
        },

        async eliminar_usuario({commit, state}, identificador){
            try{
                state.loading.estado=true

                await axios.delete(`api/user/delete/${identificador.id}/`,
                                {headers: {Authorization: 'Token ' + (JSON.parse(localStorage.getItem('user_token'))).token}
                                }).then(response => {
                                    commit('eliminar', identificador.index)
                                    commit('set_message', response)
                                }).catch(error => {
                                    commit('set_message', error.response)
                                })
            }catch(error){
                console.log(error)
                commit('set_message', {'status': 500})
            }finally{
                state.loading.estado=false
            }
        }
    }
}