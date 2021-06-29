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
                    <h1 align="center">Log in to your account</h1>
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                            @submit.prevent="login"
                        >
                            <v-text-field
                            v-model="username"
                            :rules="usuarioRules"
                            label="Username"
                            prepend-icon="mdi-account"
                            required
                            ></v-text-field>

                            <v-text-field
                            v-model="contrasena"
                            :append-icon="show_eye ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="passRules"
                            :type="show_eye ? 'text' : 'password'"
                            prepend-icon="mdi-lock"
                            label="Password"
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
                            Log in
                            </v-btn>
                        </v-form>
                </v-card>
            </v-col>
        </v-row>

        <Msg :snack="snack" />
        <Loading :loading="loading"/>

    </v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import Msg from '@/components/Mensaje'
import Loading from '@/components/Loading'

    export default {
        data(){
            return{
                valid:true,
                show_eye:false,
                timeout_snack: 0,

                username: '',
                contrasena: '',

                usuarioRules: [
                    v => !!v || 'Username is required'
                ],
                passRules:[
                    v => !!v || 'Password is required'
                ]
            }
        },
        components: {
            Msg,
            Loading
        },
        
        computed:{
            ...mapState('usuarios_main',['sesion', 'snack', 'loading'])
        },

        methods: {
            ...mapActions('usuarios_main',['obtener_token']),

            login(){
                let valid = this.$refs.form.validate()
                if (valid){
                    this.obtener_token({'username': this.username, 'password': this.contrasena})
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

