import axios from 'axios';
import {EventBus} from '@/main.js'

export default{
    namespaced:true,
    state:{
        paciente:[],

        predicciones:[], // En este array se guarda las predicciones de un paciente (filtro)

        impacto:{
            positivo:0,
            negativo:0
        },
        loading:{
            estado:false
        },

        datacollection: {
            labels: ['','','','','','','','','',''],
            datasets: [{
                label: '',
                borderWidth: 1,
                backgroundColor: ['','','','','','','','','',''],
                borderColor: ['','','','','','','','','',''],
                pointBorderColor: '#2554FF',
                data: [0,0,0,0,0,0,0,0,0,0]
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        display: true //true
                    }
                }],
                xAxes: [ {
                gridLines: {
                    display: true
                }
                }]
            },
            legend: {
                display: false
            },
            responsive: true,
            maintainAspectRatio: false
        }
    },
    mutations:{
        listar_pacientes(state, payload){
            state.paciente = payload
        },
        listar_predicciones(state, payload){
            state.predicciones = payload
        },
        listar_explicacion(state, fr){
            if (fr.val0 < 0){
                state.datacollection.labels[0] = fr.fr0 
                state.datacollection.datasets[0].backgroundColor[0] = 'rgba(75, 192, 192, 0.2)'
                state.datacollection.datasets[0].borderColor[0] = 'rgba(75, 192, 192, 1)'
                state.datacollection.datasets[0].data[0] = fr.val0 
            }
            else{
                state.datacollection.labels[0] = fr.fr0
                state.datacollection.datasets[0].backgroundColor[0] = 'rgba(255, 99, 132, 0.2)'
                state.datacollection.datasets[0].borderColor[0] = 'rgba(255,99,132,1)'
                state.datacollection.datasets[0].data[0] = fr.val0 }
            if (fr.val1 < 0){
                state.datacollection.labels[1] = fr.fr1
                state.datacollection.datasets[0].backgroundColor[1] = 'rgba(75, 192, 192, 0.2)'
                state.datacollection.datasets[0].borderColor[1] = 'rgba(75, 192, 192, 1)'
                state.datacollection.datasets[0].data[1] = fr.val1 }
            else{
                state.datacollection.labels[1] = fr.fr1
                state.datacollection.datasets[0].backgroundColor[1] = 'rgba(255, 99, 132, 0.2)'
                state.datacollection.datasets[0].borderColor[1] = 'rgba(255,99,132,1)'
                state.datacollection.datasets[0].data[1] = fr.val1 }
            if (fr.val2 < 0){
                state.datacollection.labels[2] = fr.fr2
                state.datacollection.datasets[0].backgroundColor[2] = 'rgba(75, 192, 192, 0.2)'
                state.datacollection.datasets[0].borderColor[2] = 'rgba(75, 192, 192, 1)'
                state.datacollection.datasets[0].data[2] = fr.val2 }
            else{
                state.datacollection.labels[2] = fr.fr2
                state.datacollection.datasets[0].backgroundColor[2] = 'rgba(255, 99, 132, 0.2)'
                state.datacollection.datasets[0].borderColor[2] = 'rgba(255,99,132,1)'
                state.datacollection.datasets[0].data[2] = fr.val2 }
            if (fr.val3 < 0){
                state.datacollection.labels[3] = fr.fr3
                state.datacollection.datasets[0].backgroundColor[3] = 'rgba(75, 192, 192, 0.2)'
                state.datacollection.datasets[0].borderColor[3] = 'rgba(75, 192, 192, 1)'
                state.datacollection.datasets[0].data[3] = fr.val3 }
            else{
                state.datacollection.labels[3] = fr.fr3
                state.datacollection.datasets[0].backgroundColor[3] = 'rgba(255, 99, 132, 0.2)'
                state.datacollection.datasets[0].borderColor[3] = 'rgba(255,99,132,1)'
                state.datacollection.datasets[0].data[3] = fr.val3 }
            if (fr.val4 < 0){
                state.datacollection.labels[4] = fr.fr4
                state.datacollection.datasets[0].backgroundColor[4] = 'rgba(75, 192, 192, 0.2)'
                state.datacollection.datasets[0].borderColor[4] = 'rgba(75, 192, 192, 1)'
                state.datacollection.datasets[0].data[4] = fr.val4 }
            else{
                state.datacollection.labels[4] = fr.fr4
                state.datacollection.datasets[0].backgroundColor[4] = 'rgba(255, 99, 132, 0.2)'
                state.datacollection.datasets[0].borderColor[4] = 'rgba(255,99,132,1)'
                state.datacollection.datasets[0].data[4] = fr.val4 }
            if (fr.val5 < 0){
                state.datacollection.labels[5] = fr.fr5
                state.datacollection.datasets[0].backgroundColor[5] = 'rgba(75, 192, 192, 0.2)'
                state.datacollection.datasets[0].borderColor[5] = 'rgba(75, 192, 192, 1)'
                state.datacollection.datasets[0].data[5] = fr.val5 }
            else{
                state.datacollection.labels[5] = fr.fr5
                state.datacollection.datasets[0].backgroundColor[5] = 'rgba(255, 99, 132, 0.2)'
                state.datacollection.datasets[0].borderColor[5] = 'rgba(255,99,132,1)'
                state.datacollection.datasets[0].data[5] = fr.val5 }
            if (fr.val6 < 0){
                state.datacollection.labels[6] = fr.fr6
                state.datacollection.datasets[0].backgroundColor[6] = 'rgba(75, 192, 192, 0.2)'
                state.datacollection.datasets[0].borderColor[6] = 'rgba(75, 192, 192, 1)'
                state.datacollection.datasets[0].data[6] = fr.val6 }
            else{
                state.datacollection.labels[6] = fr.fr6
                state.datacollection.datasets[0].backgroundColor[6] = 'rgba(255, 99, 132, 0.2)'
                state.datacollection.datasets[0].borderColor[6] = 'rgba(255,99,132,1)'
                state.datacollection.datasets[0].data[6] = fr.val6 }
            if (fr.val7 < 0){
                state.datacollection.labels[7] = fr.fr7
                state.datacollection.datasets[0].backgroundColor[7] = 'rgba(75, 192, 192, 0.2)'
                state.datacollection.datasets[0].borderColor[7] = 'rgba(75, 192, 192, 1)'
                state.datacollection.datasets[0].data[7] = fr.val7 }
            else{
                state.datacollection.labels[7] = fr.fr7
                state.datacollection.datasets[0].backgroundColor[7] = 'rgba(255, 99, 132, 0.2)'
                state.datacollection.datasets[0].borderColor[7] = 'rgba(255,99,132,1)'
                state.datacollection.datasets[0].data[7] = fr.val7 }
            if (fr.val8 < 0){
                state.datacollection.labels[8] = fr.fr8
                state.datacollection.datasets[0].backgroundColor[8] = 'rgba(75, 192, 192, 0.2)'
                state.datacollection.datasets[0].borderColor[8] = 'rgba(75, 192, 192, 1)'
                state.datacollection.datasets[0].data[8] = fr.val8 }
            else{
                state.datacollection.labels[8] = fr.fr8
                state.datacollection.datasets[0].backgroundColor[8] = 'rgba(255, 99, 132, 0.2)'
                state.datacollection.datasets[0].borderColor[8] = 'rgba(255,99,132,1)'
                state.datacollection.datasets[0].data[8] = fr.val8 }
            if (fr.val9 < 0){
                state.datacollection.labels[9] = fr.fr9
                state.datacollection.datasets[0].backgroundColor[9] = 'rgba(75, 192, 192, 0.2)'
                state.datacollection.datasets[0].borderColor[9] = 'rgba(75, 192, 192, 1)'
                state.datacollection.datasets[0].data[9] = fr.val9 }
            else{
                state.datacollection.labels[9] = fr.fr9
                state.datacollection.datasets[0].backgroundColor[9] = 'rgba(255, 99, 132, 0.2)'
                state.datacollection.datasets[0].borderColor[9] = 'rgba(255,99,132,1)'
                state.datacollection.datasets[0].data[9] = fr.val9 }   
        },
    },
    actions:{
        async consultarPacientes({commit}){
            try{
                const response = await axios.get('api/paciente/list/', {
                    headers: {Authorization: 'Token ' + (JSON.parse(localStorage.getItem('user_token'))).token}
                })
                commit('listar_pacientes', response.data)
            }catch(error){
                console.log(error)
            }
        },
        
        async consultarPredicciones({commit}, id){  // Realizar el filtro d nuestra lista de pacientes
            try{
                const response = await axios.get(`api/prediction/list/${id}/`, {
                    headers: {Authorization: 'Token ' + (JSON.parse(localStorage.getItem('user_token'))).token}
                })
                commit('listar_predicciones', response.data)
            }catch(error){
                console.log(error)
            }
        },

        async mostrarExplicacion({commit, state}, id){
            const fr = {}
            try{
                state.loading.estado=true

                const response = await axios.get(`api/explainability/detail/${id}/`, {
                    headers: {Authorization: 'Token ' + (JSON.parse(localStorage.getItem('user_token'))).token}
                })
            
                fr["fr0"] = response.data.aox_time.split("|")[0]
                fr["val0"] = response.data.aox_time.split("|")[1]
                fr["fr1"] = response.data.cpb_min.split("|")[0]
                fr["val1"] = response.data.cpb_min.split("|")[1]
                fr["fr2"] = response.data.dhca_min.split("|")[0]
                fr["val2"] = response.data.dhca_min.split("|")[1]
                fr["fr3"] = response.data.pumpnonpump.split("|")[0]
                fr["val3"] = response.data.pumpnonpump.split("|")[1]
                fr["fr4"] = response.data.antifibrinolytics.split("|")[0]
                fr["val4"] = response.data.antifibrinolytics.split("|")[1]
                fr["fr5"] = response.data.pre_opcr.split("|")[0]
                fr["val5"] = response.data.pre_opcr.split("|")[1]
                fr["fr6"] = response.data.age_at_surgery.split("|")[0]
                fr["val6"] = response.data.age_at_surgery.split("|")[1]
                fr["fr7"] = response.data.weight.split("|")[0]
                fr["val7"] = response.data.weight.split("|")[1]
                fr["fr8"] = response.data.gender.split("|")[0]
                fr["val8"] = response.data.gender.split("|")[1]
                fr["fr9"] = response.data.prematurity.split("|")[0]
                fr["val9"] = response.data.prematurity.split("|")[1]

                commit('listar_explicacion', fr)
                EventBus.$emit('reenviar_data', true);

                let positivo = 0
                let negativo = 0
                let i = 0

                while(i < 10){
                    let valor_peso = fr["val"+i]
                    if (valor_peso < 0){  // Impacto positivo
                        positivo = positivo + Math.abs(valor_peso)
                    }else{
                        negativo = negativo + Math.abs(valor_peso)
                    }
                    i = i + 1
                }
                
                state.impacto.positivo = 100*(positivo).toFixed(2) 
                state.impacto.negativo = 100*(negativo).toFixed(2)
            }catch(error){
                console.log(error)
            }finally{
                state.loading.estado=false
            }
        }
    },
}