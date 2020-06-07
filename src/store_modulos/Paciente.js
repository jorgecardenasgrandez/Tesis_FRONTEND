export default{
    namespaced:true,
    state:{
        paciente:{
            dni:'',
            nombre:'',
            edad:'',
            sexo:'',
            peso:'',
            parto_prematuro:'',
            cpb_min:'',
            antifibrinoliticos:'',
            bombeo:'',
            dhca_min:'',
            aox_time:'',
            pre_opcr:'',
        },
        modelo:{
            ml:''
        },
        resultado:{
            survival:true,
            txt:"", //por defecto
            color: "success--text"
        }
    },
    mutations:{
        mostrar(state){
            console.log(state.paciente.dni)
            console.log(state.paciente.nombre)
            console.log(state.paciente.edad)
            console.log(state.paciente.sexo)
            console.log(state.paciente.peso)
            console.log(state.paciente.parto_prematuro)
            console.log(state.paciente.cpb_min)
            console.log(state.paciente.antifibrinoliticos)
            console.log(state.paciente.bombeo)
            console.log(state.paciente.dhca_min)
            console.log(state.paciente.aox_time)
            console.log(state.paciente.pre_opcr)
            console.log(state.modelo.ml)
        }
    },
    actions:{

    }
}