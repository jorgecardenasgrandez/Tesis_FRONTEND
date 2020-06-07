import axios from 'axios'
export default{
    namespaced:true,
    state:{
        sesion:{
            username:'',
            contrasena:''
        },
        snack:{
            model_snack:false,
            msg:''
        }
    },
    mutations:{
        mostrarSnackBar(state, msg){
            state.snack.model_snack = true
            state.snack.msg = msg
        }
    },

    actions:{
        async recibirToken(context, credenciales){
            try {
                
                const response = await axios.post('login', {
                    username: credenciales.username,
                    password: credenciales.contrasena
                })
                console.log(response)
            } catch (error) {
                context.commit('mostrarSnackBar', error.response.data)
            }
        }
    }
}