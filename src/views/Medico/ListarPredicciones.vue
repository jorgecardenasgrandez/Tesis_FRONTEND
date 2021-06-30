<template>
    <v-container>
        <PanelMedico></PanelMedico>
        <v-data-table
          :headers="headers"
          :items="predicciones"
          class="elevation-1"
          loading
          loading-text="Loading prediction list... Please wait"
        >
            <template v-slot:top> 
                <v-toolbar flat color="white">
                <v-toolbar-title>List of predictions</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                </v-toolbar>
            </template>

            <template v-slot:[`item.die`]="{ item }">
                <v-chip dark :color="getColorDie(item.die)">
                    {{ item.die }}
                </v-chip>
            </template>

            <template v-slot:[`item.simulate`]="{ item }">
                <v-chip dark :color="getColorSimulacion(item.simulate)" >
                    {{ item.simulate ? 'Yes' : 'No'}}
                </v-chip>
            </template>

            <template v-slot:[`item.gender`]="{ item }">
                {{ item.gender ? 'Female' : 'Male'}}
            </template>

            <template v-slot:[`item.prematurity`]="{ item }">
                {{ item.prematurity ? 'Yes' : 'No' }}
            </template>

            <template v-slot:[`item.pumpnonpump`]="{ item }">
                {{ item.pumpnonpump ? 'Yes' : 'No' }}
            </template>

            <template v-slot:[`item.antifibrinolytics`]="{ item }">
                {{item.antifibrinolytics==2 ? 'Aprotinin' : item.antifibrinolytics==1 ? 'Tranexamic Acid' : 'None'}} 
            </template>

            <template v-slot:[`item.boton`]="{item}">
                <v-btn rounded color="indigo darken-2" dark elevation="5" 
                @click="metodo_mostrar_explicacion(item.explicacion)"
                >
                    <v-icon color="yellow lighten-4"> mdi-chart-gantt </v-icon>                              
                </v-btn>
            </template>
            
        </v-data-table>
        
        <v-dialog v-model="dialog" width="1000">
            <v-card>
                <v-card-text> 
                    <ExplicacionFR></ExplicacionFR>
                </v-card-text>
                <v-card-title>
                    <p class="green--text">Total survival impact: {{ impacto.positivo }}% </p> 
                    <p class="red--text">Total mortality impact: {{ impacto.negativo }}% </p>
                </v-card-title>
            </v-card>
        </v-dialog>

        <Loading :loading="loading"/>
            
    </v-container>
</template>

<script>
import PanelMedico from '@/components/Panel_medico'
import ExplicacionFR from '@/components/Explicacion/Explicacion_comp.vue' //es sin el .vue
import Loading from '@/components/Loading'
import {mapState, mapActions} from 'vuex'


export default {
    name: 'ListarPredicciones',
    components: {
        PanelMedico,
        ExplicacionFR,
        Loading
    },
    data() {
        return {
            dialog: false,

            headers: [
                {text: 'ID', value: 'id', align: 'center'},
                {text: 'Die', value: 'die', align: 'center'},
                {text: 'Simulation', value: 'simulate', align: 'center'},
                {text: 'Explainability', value:'boton', sortable: false, align: 'center'},

                {text: 'Age at surgery (days)', value: 'age_at_surgery', align: 'center'},
                {text: 'Weight (kg)', value: 'weight', align: 'center'},
                {text: 'Gender', value: 'gender', sortable: false, align: 'center'},
                {text: 'Prematurity', value: 'prematurity', sortable: false, align: 'center'},

                {text: 'Aortic cross-clamp time', value: 'aox_time', align: 'center'},
                {text: 'Cardiopulmonary bypass', value: 'cpb_min', align: 'center'},
                {text: 'Deep hypothermic circulatory arrest', value: 'dhca_min', align: 'center'},
                {text: 'PumpNonPump', value: 'pumpnonpump', align: 'center'},
                {text: 'Antifibrinolytics', value: 'antifibrinolytics', align: 'center'},
                {text: 'Preoperative serum creatinine', value: 'pre_opcr', align: 'center'},
            ],
        }
    },
    computed: {
        ...mapState('listar_predicciones_main', ['predicciones', 'impacto', 'loading'])
    },
    created () {
        this.consultarPredicciones(this.$route.params.id);
    },
    methods: {
        ...mapActions('listar_predicciones_main',['consultarPredicciones', 'mostrarExplicacion']),
        
        metodo_mostrar_explicacion(id){
            this.dialog = true
            this.mostrarExplicacion(id)
        },
        getColorSimulacion(simulate){
            if (simulate){
                return 'amber darken-3'
            }else{
                return 'cyan darken-3'
            }
        },
        getColorDie(valor_die){
            if (valor_die <= 0.2){
                return 'green'
            }else{
                return 'red'
            }
        }
    },
}
</script>