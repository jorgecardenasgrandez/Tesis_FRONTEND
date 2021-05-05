<template>
    <v-container>
        
        <PanelMedico></PanelMedico>

        <v-row>
            <v-col cols="12" md="6" sm="6">
                <v-card>
                    <v-card-title >
                        <v-list-item>
                            <v-row>
                                <v-list-item-avatar color="yellow lighten-4"><v-icon color="red accent-3">mdi-clipboard-pulse</v-icon></v-list-item-avatar>
                                
                                <v-list-item-content>
                                    <v-list-item-title class="headline">
                                        <v-tooltip top>
                                            <template v-slot:activator="{ on }">
                                                <span v-on="on">{{simulacion.titulo_card}}</span>
                                            </template>
                                            <span>En cirugias cardiacas congenitas pediatricas</span>
                                        </v-tooltip>
                                        

                                    </v-list-item-title>
                                    <v-list-item-subtitle>para
                                        <v-chip
                                        class="ma-2"
                                        color="primary"
                                        outlined
                                        pill
                                        >
                                            <v-icon left>mdi-face</v-icon>
                                            {{paciente.nombre}}
                                        </v-chip>
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-row>
                        </v-list-item>
                    </v-card-title>
                    
                    <v-form
                        ref="form"
                        v-model="simulacion.valid"
                        lazy-validation
                        @submit.prevent="prediccion"
                    >
                        <v-card-text>
                            <v-expansion-panels 
                                v-model="simulacion.panel">
                                <v-col cols="12">
                                    <v-expansion-panel>
                                        <v-expansion-panel-header>Datos basicos</v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <v-row>
                                                <v-col cols="12" md="6">
                                                    <v-text-field
                                                        v-model="paciente.dni"
                                                        @keypress="isNumber($event)" 
                                                        rounded
                                                        filled
                                                        :rules="dniRules"
                                                        label="DNI"
                                                        required
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12"  md="6">
                                                    <v-text-field
                                                        v-model="paciente.nombre"
                                                        :rules="txtfieldRules"
                                                        rounded
                                                        filled
                                                        label="Nombre"
                                                        required
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-col>
                                <v-col cols="12">
                                    <v-expansion-panel>
                                        <v-expansion-panel-header>Factores de riesgo</v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <v-row>
                                                <v-col cols="12" md="4">
                                                    <v-text-field
                                                        v-model="paciente.edad"
                                                        :rules="edadRules"
                                                        rounded
                                                        @keypress="isNumber($event)" 
                                                        filled
                                                        label="Edad"
                                                        hint="Dias de Nacimiento"
                                                        persistent-hint
                                                        required
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12"  md="4">
                                                    <v-select
                                                        v-model="paciente.sexo"
                                                        :rules="txtfieldRules"
                                                        :items="['Masculino', 'Femenino']"
                                                        
                                                        rounded
                                                        filled
                                                        label="Sexo"
                                                        return-object
                                                        required
                                                    ></v-select>
                                                </v-col>
                                                <v-col cols="12"  md="4">
                                                    <v-text-field
                                                        v-model="paciente.peso"
                                                        :rules="pesoRules"
                                                        @keypress="isNumber($event)"
                                                        rounded
                                                        filled
                                                        label="Peso (kg)"
                                                        hint=""
                                                        persistent-hint
                                                        required
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col cols="12"  md="6">
                                                    <v-select
                                                        v-model="paciente.parto_prematuro"
                                                        :rules="txtfieldRules"
                                                        :items="['Si', 'No']"
                                                        rounded
                                                        filled
                                                        label="Prematuridad"
                                                        required
                                                    ></v-select>
                                                </v-col>
                                                <v-col cols="12"  md="6">
                                                    <v-select
                                                        v-model="paciente.antifibrinoliticos"
                                                        :rules="txtfieldRules"
                                                        :items="['No aplicar', 'Acido tranexamico', 'Aprotinina']"
                                                        rounded
                                                        filled
                                                        label="Antifibrinolíticos"
                                                        required
                                                    ></v-select>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col cols="12"  md="6">
                                                    <v-text-field
                                                        v-model="paciente.cpb_min"
                                                        :rules="cpbminRules"
                                                        @keypress="isNumber($event)"
                                                        rounded
                                                        filled
                                                        label="Bypass Cardiopulmonar"
                                                        hint="Minutos"
                                                        persistent-hint
                                                        required
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12"  md="6">
                                                    <v-select
                                                        v-model="paciente.bombeo"
                                                        :rules="txtfieldRules"
                                                        :items="['Si', 'No']"
                                                        rounded
                                                        filled
                                                        label="Bombeo cardiaco"
                                                        required
                                                    ></v-select>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col cols="12" md="4">
                                                    <v-text-field
                                                        v-model="paciente.dhca_min"
                                                        :rules="dhcaRules"
                                                        @keypress="isNumber($event)"
                                                        rounded
                                                        filled
                                                        label="Paro circulatorio"
                                                        hint="Minutos"
                                                        persistent-hint
                                                        required
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-text-field
                                                        v-model="paciente.aox_time"
                                                        :rules="aoxtimeRules"
                                                        @keypress="isNumber($event)"
                                                        rounded
                                                        filled
                                                        label="Pinzamiento aortico"
                                                        hint="Minutos"
                                                        persistent-hint
                                                        required
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-text-field
                                                        v-model="paciente.pre_opcr"
                                                        :rules="preopcrRules"
                                                        rounded
                                                        filled
                                                        label="Creatinina preoperatoria"
                                                        hint=""
                                                        persistent-hint
                                                        required
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-col>

                            </v-expansion-panels>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn block :color="simulacion.boton_color" class="mb-2 white--text"  rounded 
                            type="submit"
                            :disabled="!simulacion.valid"> 
                                <v-icon left>mdi-chart-arc</v-icon>
                                Predecir</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-col>

            <v-col cols="12" md="6" sm="6">
                
                <div v-if = "loaded"> <FactoresRiesgo></FactoresRiesgo> </div>    
                <!--<v-row v-if = !showRF>
                </v-row>
                <template>
                    <div class="container">
                        <factores-riesgo
                        v-if="loaded"
                        :chartdata="chartdata"
                        :options="options"/>
                    </div>
                </template> 344 -->
                
                <v-card class="mx-auto" max-width="344">
                    <v-card-title>
                        <span class="green--text">Impacto total supervivencia: {{ calcularPositivo }}% </span> 
                        <span class="red--text">Impacto total mortalidad: {{ calcularNegativo }}% </span>
                    </v-card-title>
                </v-card>
                
                <v-hover>
                    <template v-slot:default="{ hover }">
                        <v-card
                            class="mx-auto"
                            max-width="344"
                        >
                            <v-card-title>
                                Resultado predicción: <span :class="resultado.color"> {{resultado.txt}} </span>
                            </v-card-title>

                            <v-card-subtitle>
                                <p>DNI      : {{auxiliar.dni}}</p>
                                <p>Nombre   : {{auxiliar.nombre}}</p>
                            </v-card-subtitle>
                            <!-- COMENTARIO
                            <v-card-text>
                                <h2 class="title"> Resultado predicción: <span :class="resultado.color"> {{resultado.txt}} </span> </h2>
                                <p>DNI      : {{auxiliar.dni}}</p>
                                <p>Nombre   : {{auxiliar.nombre}}</p>
                                <v-divider></v-divider>
                                <p>Edad     : {{auxiliar.age_at_surgery}}</p>
                                <p>Sexo     : {{auxiliar.gender}}</p>
                                <p>Peso     : {{auxiliar.weight}}</p>
                                <p>Prematuridad     : {{auxiliar.prematurity}}</p>
                                <p>CPB_Min     : {{auxiliar.cpb_min}}</p>
                                <p>Antifibrinolytics     : {{auxiliar.antifibrinolytics}}</p>
                                <p>Bombeo     : {{auxiliar.pumpnonpump}}</p>
                                <p>DHCA_Min     : {{auxiliar.dhca_min}}</p>
                                <p>AOX_time     : {{auxiliar.aox_time}}</p>
                                <p>Pre_opcr     : {{auxiliar.pre_opcr}}</p>
                                <v-divider></v-divider>
                                <p>Modelo     : {{auxiliar.model_choice}}</p>
                            </v-card-text>
                            -->
                            <v-fade-transition v-if="resultado.die == true">
                                <v-overlay
                                    v-if="hover"
                                    absolute
                                    color="#036358"
                                >
                                    <v-btn @click="cambiar_a_simulacion">SIMULACION</v-btn>
                                </v-overlay>
                            </v-fade-transition>
                        </v-card>
                    </template>
                </v-hover>

                <!-- :color="simulacion.boton_color"  type="submit" white--text  class="mb-2"   -->
                <v-card class="mx-auto" max-width="344" v-if="simulacion.simulate">
                    <v-card-actions>
                        <v-btn block text class="mx-auto" color="primary" @click="terminarSimulacion">
                            <v-icon left>mdi-chart-arc</v-icon>
                            Terminar simulación
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

        </v-row>

        <v-snackbar
            v-model="snack.vm"
            :color="snack.color"
        >
            {{ snack.msg }}
            <v-btn
                color="black"
                text
                @click="snack.vm = false"
            >
                Cerrar
            </v-btn>
        </v-snackbar>

        <v-dialog
            v-model="loading.estado"
            hide-overlay
            persistent
            width="300"
            >
            <v-card
                color="primary"
                dark
            >
                <v-card-text>
                Estimando la mortalidad ...
                <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0"
                ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
        

    </v-container>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import axios from 'axios';
import PanelMedico from '../../components/Panel_medico.vue'
import FactoresRiesgo from '../../components/Factores_comp.vue' //es sin el .vue
import {EventBus} from '../../main.js'

    export default {
        data(){
            return{
                impacto_positivo: 0,
                impacto_negativo: 0,

                loaded: false,

                snack:{
                    vm:false,
                    color:'',
                    msg:''
                },

                loading:{
                    titulo:'',
                    estado:false
                },

                auxiliar:{
                    dni:'',
                    nombre:'',
                    age_at_surgery:'',
                    gender:'',
                    weight:'',
                    prematurity:'',
                    cpb_min:'',
                    antifibrinolytics:'',
                    pumpnonpump:'',
                    dhca_min:'',
                    aox_time:'',
                    pre_opcr:''
                },

                txtfieldRules:[
                    v => !!v || 'Es requerido.'
                ],
                dniRules:[
                    v => !!v || 'El DNI es requerido.',
                    v => (v && v.length == 8) || '8 caracteres.'
                ],
                edadRules:[
                    v => !!v || 'La edad es requerida.',
                    v => v >= 0 || 'Edad minima es 0 dias.',
                ],
                pesoRules:[
                    v => !!v || 'El peso es requerido.',
                    v => v >= 0 || 'Peso minimo es 0 kg.',
                ],
                cpbminRules:[
                    v => !!v || 'El CPB es requerido.',
                    v => v >= 0 || 'Tiempo minimo es 0 minutos.',
                ],
                dhcaRules:[
                    v => !!v || 'El DHCA es requerido.',
                    v => v >= 0 || 'Tiempo minimo es 0 minutos.',
                ],
                aoxtimeRules:[
                    v => !!v || 'El AOX es requerido.',
                    v => v >= 0 || 'Tiempo minimo es 0 minutos.',
                ],
                preopcrRules:[
                    v => !!v || 'Creatinina Pre es requerido.',
                    v => v >= 0 || 'Medida minima es 0.',
                ],
            }
        },

        components:{
            PanelMedico,
            FactoresRiesgo
        },

        computed:{
            ...mapState('simula',['simulacion']),
            ...mapState('paciente_main', ['paciente', 'resultado']),
            calcularPositivo(){
                return this.impacto_positivo
            },
            calcularNegativo(){
                return this.impacto_negativo
            }
        },

        methods:{
            ...mapMutations('simula',['cambiar_a_simulacion', 'normalidad']),
            ...mapMutations('paciente_main',['mostrar']),
            
            async prediccion(){
                let valid = this.$refs.form.validate()
                if (this.validarCampos() && valid){
                    let sexo = this.paciente.sexo
                    let parto = this.paciente.parto_prematuro
                    let bombeo = this.paciente.bombeo
                    let antifi = this.paciente.antifibrinoliticos

                    if(sexo === "Femenino"){
                        sexo = true
                    }else{
                        sexo = false
                    }

                    if(parto === "Si"){
                        parto = true
                    }else{
                        parto = false
                    }

                    if(bombeo === "Si"){
                        bombeo = true
                    }else{
                        bombeo = false
                    }

                    if(antifi === "Aprotinina"){
                        antifi = 2
                    }else if(antifi === "Acido tranexamico"){
                        antifi = 1
                    }else{
                        antifi = 0
                    }

                    let paciente_pediatrico = {
                        paciente:{
                            dni:this.paciente.dni,
                            nombre:this.paciente.nombre,
                        },
                        age_at_surgery:this.paciente.edad,
                        gender:sexo,
                        weight:this.paciente.peso,
                        prematurity:parto,
                        cpb_min:this.paciente.cpb_min,
                        antifibrinolytics:antifi,
                        pumpnonpump:bombeo,
                        dhca_min:this.paciente.dhca_min,
                        aox_time:this.paciente.aox_time,
                        pre_opcr:this.paciente.pre_opcr,
                        simulate:this.simulacion.simulate
                    }
                    // console.log(paciente_pediatrico)
                    try {

                        this.loading.estado = true

                        const response = await axios.post('api/prediction/register/', paciente_pediatrico)
                        // console.log(response.data)

                        this.loading.estado = false

                        this.auxiliar.dni=response.data.DNI
                        this.auxiliar.nombre=response.data.Nombre
                        
                        const factores_riesgo = {
                            "fr0":response.data.Risk_Factors[0][0],
                            "val0":response.data.Risk_Factors[0][1],
                            "fr1":response.data.Risk_Factors[1][0],
                            "val1":response.data.Risk_Factors[1][1],
                            "fr2":response.data.Risk_Factors[2][0],
                            "val2":response.data.Risk_Factors[2][1],
                            "fr3":response.data.Risk_Factors[3][0],
                            "val3":response.data.Risk_Factors[3][1],
                            "fr4":response.data.Risk_Factors[4][0],
                            "val4":response.data.Risk_Factors[4][1],
                            "fr5":response.data.Risk_Factors[5][0],
                            "val5":response.data.Risk_Factors[5][1],
                            "fr6":response.data.Risk_Factors[6][0],
                            "val6":response.data.Risk_Factors[6][1],
                            "fr7":response.data.Risk_Factors[7][0],
                            "val7":response.data.Risk_Factors[7][1],
                            "fr8":response.data.Risk_Factors[8][0],
                            "val8":response.data.Risk_Factors[8][1],
                            "fr9":response.data.Risk_Factors[9][0],
                            "val9":response.data.Risk_Factors[9][1],
                        }
                        // console.log(factores_riesgo)
                        this.$store.dispatch('factores_main/recibirFactoresRiesgo',factores_riesgo)
                        EventBus.$emit('reenvio_data', true);
                        this.loaded = true
                        /*console.log(this.factores_riesgo.fr1[0],this.factores_riesgo.fr1[1])
                        console.log(this.factores_riesgo.fr2[0],this.factores_riesgo.fr2[1])
                        console.log(this.factores_riesgo.fr3[0],this.factores_riesgo.fr3[1])
                        console.log(this.factores_riesgo.fr4[0],this.factores_riesgo.fr4[1])
                        console.log(this.factores_riesgo.fr5[0],this.factores_riesgo.fr5[1])
                        console.log(this.factores_riesgo.fr6[0],this.factores_riesgo.fr6[1])
                        console.log(this.factores_riesgo.fr7[0],this.factores_riesgo.fr7[1])
                        console.log(this.factores_riesgo.fr8[0],this.factores_riesgo.fr8[1])
                        console.log(this.factores_riesgo.fr9[0],this.factores_riesgo.fr9[1])
                        console.log(this.factores_riesgo.fr10[0],this.factores_riesgo.fr10[1])
                        this.auxiliar.age_at_surgery=response.data.Feat[0]
                        this.auxiliar.gender=response.data.Feat[1]
                        this.auxiliar.weight=response.data.Feat[2]
                        this.auxiliar.prematurity=response.data.Feat[3]
                        this.auxiliar.cpb_min=response.data.Feat[4]
                        this.auxiliar.antifibrinolytics=response.data.Feat[5]
                        this.auxiliar.pumpnonpump=response.data.Feat[6]
                        this.auxiliar.dhca_min=response.data.Feat[7]
                        this.auxiliar.aox_time=response.data.Feat[8]
                        this.auxiliar.pre_opcr=response.data.Feat[9]
                        this.auxiliar.model_choice=response.data.Model*/
                        let positivo = 0
                        let negativo = 0
                        let i = 0
                        while(i < 10){
                            let valor_peso = factores_riesgo["val"+i]
                            // console.log("peso", valor_peso)
                            if (valor_peso < 0){  // Impacto positivo
                                positivo = positivo + Math.abs(valor_peso)
                                console.log("positivo", positivo)
                            }else{
                                negativo = negativo + valor_peso
                                console.log("negativo", negativo)
                            }
                            i = i + 1
                        }
                        // console.log(positivo, negativo)
                        this.impacto_positivo = 100*(positivo).toFixed(2) 
                        this.impacto_negativo = 100*(negativo).toFixed(2)
                        // console.log(this.impacto_positivo, this.impacto_negativo) 
                        

                        this.resultado.probabilidad = response.data.Prediction
                        const valor_probabilidad = 100*(1 - this.resultado.probabilidad).toFixed(2)  // GENERAR LA PROBABILIDAD
                        this.resultado.txt = `Supervivencia ${valor_probabilidad} %`

                        if (this.resultado.probabilidad > 0.2){ //MORTALIDAD
                            this.resultado.die = true
                            this.simulacion.valid = false
                            this.resultado.color = "red--text"
                        }else{ // SUPERVIVENCIA
                            // this.reset()
                            this.resultado.color = "green--text"
                            // this.resultado.die = false
                            // this.normalidad()  // el simulacion.simulate
                        }
                    } catch (error) {
                        console.log(error)
                    }
                    
                }else{
                    this.snack.vm = true
                    this.snack.color = "red"
                    this.snack.msg = "Debe ingresar todos los campos."
                }
            },

            terminarSimulacion(){
                this.reset()
                this.resultado.die = false
                this.normalidad()
            },
            validarCampos(){
                if(this.paciente.dni.length > 0 && this.paciente.nombre.length > 0 && this.paciente.edad.length > 0 &&
                    this.paciente.sexo.length > 0 && this.paciente.peso.length > 0 && this.paciente.parto_prematuro.length > 0 && this.paciente.cpb_min.length > 0 &&
                    this.paciente.antifibrinoliticos.length > 0 && this.paciente.bombeo.length > 0 && this.paciente.dhca_min.length > 0 && 
                    this.paciente.aox_time.length > 0 && this.paciente.pre_opcr.length > 0){
                        return true
                }else{
                    return false
                }
            },

            isNumber(evt){
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46){
                    evt.preventDefault();
                }else{
                    return true;
                }
            },

            reset () {
                this.$refs.form.reset()
            }
        }
    }
</script>
