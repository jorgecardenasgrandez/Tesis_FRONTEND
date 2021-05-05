export default{
    namespaced:true,
    state:{
        datacollection: {
            // 'rgba(75, 192, 192, 0.2)', - verde back
                // 'rgba(255, 99, 132, 0.2)', - rojo back
                // 'rgba(75, 192, 192, 1)', - verde borde
                // 'rgba(255,99,132,1)', rojo borde
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
                    display: false
                }
                }]
            },
            legend: {
                display: true
            },
            responsive: true,
            maintainAspectRatio: false
        }

    },
    mutations:{
        mostrar(state, fr){
            /*state.datacollection.labels[0] = fr.fr0 
            state.datacollection.datasets[0].backgroundColor[0] = 'rgba(75, 192, 192, 0.2)'
            state.datacollection.datasets[0].borderColor[0] = 'rgba(75, 192, 192, 1)'
            state.datacollection.datasets[0].data[0] = fr.val0

            state.datacollection.labels[1] = fr.fr1
            state.datacollection.datasets[0].backgroundColor[1] = 'rgba(255, 99, 132, 0.2)'
            state.datacollection.datasets[0].borderColor[1] = 'rgba(255,99,132,1)'
            state.datacollection.datasets[0].data[1] = fr.val1

            state.datacollection.labels[2] = fr.fr2
            state.datacollection.datasets[0].backgroundColor[2] = 'rgba(75, 192, 192, 0.2)'
            state.datacollection.datasets[0].borderColor[2] = 'rgba(75, 192, 192, 1)'
            state.datacollection.datasets[0].data[2] = fr.val2

            state.datacollection.labels[3] = fr.fr3
            state.datacollection.datasets[0].backgroundColor[3] = 'rgba(255, 99, 132, 0.2)'
            state.datacollection.datasets[0].borderColor[3] = 'rgba(255,99,132,1)'
            state.datacollection.datasets[0].data[3] = fr.val3

            state.datacollection.labels[4] = fr.fr4
            state.datacollection.datasets[0].backgroundColor[4] = 'rgba(75, 192, 192, 0.2)'
            state.datacollection.datasets[0].borderColor[4] = 'rgba(75, 192, 192, 1)'
            state.datacollection.datasets[0].data[4] = fr.val4

            state.datacollection.labels[5] = fr.fr5
            state.datacollection.datasets[0].backgroundColor[5] = 'rgba(255, 99, 132, 0.2)'
            state.datacollection.datasets[0].borderColor[5] = 'rgba(255,99,132,1)'
            state.datacollection.datasets[0].data[5] = fr.val5
            //console.log(state.datacollection.labels[0])
            //console.log(state.datacollection.datasets[0].backgroundColor[0])
            //console.log(state.datacollection.datasets[0].borderColor[0])
            //console.log(state.datacollection.datasets[0].data[0])*/
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
        }
    },
    actions:{
        recibirFactoresRiesgo(context, factores_de_riesgo){
            context.commit('mostrar', factores_de_riesgo)
        }
    }
}
