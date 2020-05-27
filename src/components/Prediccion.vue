<template>
    <v-container>
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
                                            <span>En cirugias pediatricas de cardiopatía congénita</span>
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
                        v-model="valid"
                        lazy-validation
                    >
                        <v-card-text>
                            <v-expansion-panels>
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
                                                        hint="Min:1/Max:31."
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
                                                        label="Parto prematuro"
                                                        required
                                                    ></v-select>
                                                </v-col>
                                                <v-col cols="12"  md="6">
                                                    <v-select
                                                        v-model="paciente.antifibrinoliticos"
                                                        :rules="txtfieldRules"
                                                        :items="['0', '1', '2']"
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
                                                        label="CPB Minimo"
                                                        hint="El minimo es 24."
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
                                                        label="Bombeo"
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
                                                        label="DHCA Minimo"
                                                        hint="El minimo es 0."
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
                                                        label="AOX Time"
                                                        hint="El minimo es 0."
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
                                                        label="Pre_OPCR"
                                                        hint="Min:0/Max:1.3."
                                                        persistent-hint
                                                        required
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-col>

                                <v-col cols="12">
                                    <v-expansion-panel>
                                        <v-expansion-panel-header>Modelo de aprendizaje automatico</v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-radio-group v-model="modelo.ml" :rules="txtfieldRules">
                                                        <v-radio label="Bosque aleatorio" value="rf"></v-radio>
                                                        <v-radio label="Arbol de decision" value="dt"></v-radio>
                                                        <v-radio label="Redes bayesianas" value="rb"></v-radio>
                                                    </v-radio-group>
                                                </v-col>
                                            </v-row>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-col>
                            </v-expansion-panels>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn block :color="simulacion.boton_color" class="mb-2 white--text"  rounded 
                            :disabled="!valid"
                            @click="validate"> 
                                <v-icon left>mdi-chart-arc</v-icon>
                                Predecir</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-col>

            
            <v-col cols="12" md="6" sm="6">
                <v-hover>
                    <template v-slot:default="{ hover }">
                        <v-card
                            class="mx-auto"
                            max-width="344"
                        >
                            <v-img src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"></v-img>

                            <v-card-text>
                            <h2 class="title primary--text">Magento Forests</h2>
                            Travel to the best outdoor experience on planet Earth. A vacation you will never forget!
                            </v-card-text>

                            <v-fade-transition>
                            <v-overlay
                                v-if="hover"
                                absolute
                                color="#036358"
                            >
                                <v-btn @click="cambiar_a_simualcion">SIMULACION</v-btn>
                            </v-overlay>
                            </v-fade-transition>
                        </v-card>
                    </template>
                </v-hover>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
    export default {
        name:'Prediccion',
        data(){
            return{
                valid:true,
                txtfieldRules: [
                    v => !!v || 'Es requerido.'
                ],
                dniRules:[
                    v => !!v || 'El DNI es requerido.',
                    v => v.length <= 8 || 'El DNI es menor a 8 caracteres.',
                ],
                edadRules:[
                    v => !!v || 'La edad es requerida.',
                    v => v >= 1 && v <= 31 || 'Min:1/Max:31.',
                ],
                pesoRules:[
                    v => !!v || 'El peso es requerido.',
                    v => v >= 1 && v <= 30 || 'Excedido.',
                ],
                cpbminRules:[
                    v => !!v || 'El CPB es requerido.',
                    v => v >= 24 || 'El minimo es 24.',
                ],
                dhcaRules:[
                    v => !!v || 'El DHCA es requerido.',
                    v => v >= 0 || 'El minimo es 0.',
                ],
                aoxtimeRules:[
                    v => !!v || 'El AOX es requerido.',
                    v => v >= 0 || 'El minimo es 0.',
                ],
                preopcrRules:[
                    v => !!v || 'El OPCR es requerido.',
                    v => v >= 0 && v <= 1.3 || 'Min:0/Max:1.3.',
                ],
            }
        },
        computed:{
            ...mapState('simula',['simulacion']),
            ...mapState('paciente_main',['paciente', 'modelo'])
        },
        methods:{
            ...mapMutations('simula',['cambiar_a_simualcion']),
            ...mapMutations('paciente_main',['mostrar']),

            isNumber(evt){
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46){
                    evt.preventDefault();
                }else{
                    return true;
                }
            },

            validate () {
                this.$refs.form.validate()
            }
        }
    }
</script>
