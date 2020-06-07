<template>
    <v-container>
        <v-row justify="center" align="center">
            <v-card class="mt-3" flat>
                <h1 > <v-icon large color="cyan darken-2" class="mb-2" left>mdi-heart-pulse</v-icon> CMCA</h1>
            </v-card>
        </v-row>

        <v-divider
        class="mt-5"
        ></v-divider>
        
        <v-row justify="center" align="center">
            <v-col cols="12" md="6" sm="6" xs="6">
                <v-card flat>
                    <v-img  src="../../assets/img_sesion.png"  aspect-ratio="1.4" contain></v-img>
                </v-card>
            </v-col>

            <v-col cols="12" md="6" sm="6" xs="6">
                <v-card class="pa-3 ma-3" flat>
                    <h1 align="center">Iniciar Sesión</h1>
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                            @submit.prevent="login"
                        >
                            <v-text-field
                            v-model="sesion.username"
                            :rules="usuarioRules"
                            label="Usuario"
                            prepend-icon="mdi-account"
                            required
                            ></v-text-field>

                            <v-text-field
                            v-model="sesion.contrasena"
                            :append-icon="show_eye ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="passRules"
                            :type="show_eye ? 'text' : 'password'"
                            prepend-icon="mdi-lock"
                            label="Contraseña"
                            requerided
                            @click:append="show_eye = !show_eye"
                            ></v-text-field>

                            <v-btn
                            type="submit"
                            :disabled="!valid"
                            block
                            rounded
                            color="success"
                            class="mt-4 mr-1 ml-1"
                            >
                            Ingresar
                            </v-btn>
                        </v-form>
                </v-card>
            </v-col>
        </v-row>

        <v-snackbar
            v-model="snack.model_snack"
            color = "error"
        >
            {{ snack.msg }}
            <v-btn
                color="black"
                text
                @click="snack.model_snack = false"
            >
                Cerrar
            </v-btn>
        </v-snackbar>

    </v-container>
</template>

<script>
import {mapMutations, mapState} from 'vuex';

    export default {
        data(){
            return{
                valid:true,
                show_eye:false,
                usuarioRules: [
                    v => !!v || 'El usuario es requerido.'
                ],
                passRules:[
                    v => !!v || 'La contraseña es requerida.'
                ]
            }
        },
        
        computed:{
            ...mapState('usuarios_main',['sesion', 'snack'])
        },

        methods: {
            login(){
                let valid = this.$refs.form.validate()
                console.log(this.sesion.username, this.sesion.contrasena)
                if (valid){
                    let user = {
                        username:this.sesion.username,
                        contrasena:this.sesion.contrasena
                    }
                    this.$store.dispatch('usuarios_main/recibirToken',user)
                    this.reset()
                }  
            },
            resetValidation () {
                this.$refs.form.resetValidation()
            },
            reset () {
                this.$refs.form.reset()
            }
        },

    }
</script>

