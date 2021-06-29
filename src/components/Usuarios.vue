<template>
    <v-container>
        <v-data-table
            :headers="headers"
            :items="valor_username"
            sort-by="id"
            class="elevation-1"
            loading
            loading-text="Loading users list ... Please wait"
        >
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Users list</v-toolbar-title>

                    <v-divider
                    class="mx-4"
                    inset
                    vertical
                    ></v-divider>

                    <v-spacer></v-spacer>

                    <v-dialog v-model="dialog" max-width="500px" persistent >
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" fab large dark class="mt-2" v-on="on">
                                <v-icon dark>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                            >
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                </v-card-title>
                                <!-- sm="6" md="4"   :disabled="deshabilitar"-->
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field v-model="editedItem.nombres" label="Firstname" :rules="txtfieldRules"></v-text-field>
                                                <v-text-field v-model="editedItem.apellidos" label="Lastname" :rules="txtfieldRules"></v-text-field>
                                                
                                                <v-select
                                                    v-model="editedItem.genero"
                                                    :rules="txtfieldRules"
                                                    :items="['Male', 'Female']"
                                                    label="Gender"
                                                ></v-select>

                                                <v-text-field v-model="editedItem.username" label="Username" :rules="username_rules"></v-text-field>
                                                <v-text-field
                                                v-model="editedItem.password"
                                                :append-icon="show_eye ? 'mdi-eye' : 'mdi-eye-off'"
                                                :rules="txtfieldRules"
                                                :type="show_eye ? 'text' : 'password'"
                                                :disabled="deshabilitar"
                                                label="Password"
                                                requerided
                                                @click:append="show_eye = !show_eye"
                                                ></v-text-field>
                                                <v-select
                                                v-model="editedItem.is_staff"
                                                :rules="txtfieldRules"
                                                :items="['Admin', 'Doctor']"
                                                label="User type"
                                                ></v-select>
                                            </v-col>
                                        </v-row>
                                        
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                                    <v-btn color="success" rounded dark @click="save">Guardar</v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card>
                    </v-dialog>

                </v-toolbar>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                    small
                    color="blue darken-4"
                    class="mr-2"
                    @click="editItem(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                    small
                    color="red"
                    @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>

        <Msg :snack="snack" />
        <Loading :loading="loading"/>

    </v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import Msg from '@/components/Mensaje'
import Loading from '@/components/Loading'

    export default {
        username:'usernames',
        data: () => ({
            valid:true,
            show_eye:false,
            deshabilitar: false,  // password

            txtfieldRules: [
                v => !!v || 'Es requerido.'
            ],
            username_rules: [
                v => !!v || 'Es requerido.',
                v => (v && v.length <= 10) || 'Maximo 10 caracteres.'
            ],  

            dialog: false,
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'Username', align: 'start', sortable: false, value: 'username'},
                { text: 'Firstname', value: 'nombres' },
                { text: 'Lastname', value: 'apellidos' },
                { text: 'Gender', value: 'genero' },
                { text: 'User type', value: 'is_staff', sortable: false },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            valor_username_ux: [], //El valor que tiene los objetos oficiales
            editedIndex: -1,
            editedItem: {
                username: '',
                id: '',
                nombres: '',
                apellidos: '',
                genero: '',
                password:'',
                is_staff: '',
            },
            defaultItem: {
                username: '',
                id: '',
                nombres: '',
                apellidos: '',
                genero: '',
                password:'',
                is_staff: '',
            },
        }),

        components: {
            Msg,
            Loading
        },

        computed: {
            ...mapState('gestion_usuario', ['valor_username', 'snack', 'loading']),

            formTitle () {
                return this.editedIndex === -1 ? 'New user' : 'Edit user'
            },
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        created () {
            this.initialize()
        },

        methods: {
            ...mapActions('gestion_usuario', ['initialize', 'eliminar_usuario', 'registrar_usuario', 'actualizar_usuario']),

            validate () {
                this.$refs.form.validate()
            },
            resetValidation () {
                this.$refs.form.resetValidation()
            },

            editItem (item) {
                this.editedIndex = this.valor_username.indexOf(item)
                this.editedItem = Object.assign({}, item)
                if (item.genero === 'M'){
                    this.editedItem.genero = 'Male'
                }else{
                    this.editedItem.genero = 'Female'
                }

                if (item.is_staff){
                    this.editedItem.is_staff = 'Admin'
                }else{
                    this.editedItem.is_staff = 'Doctor'
                }
                this.editedItem.password = '********'
                this.deshabilitar = true
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.valor_username.indexOf(item)
                const respuesta = confirm('Are you sure you want to delete this user?')
                if (respuesta){
                    this.eliminar_usuario({'id': item.id, 'index': index})
                }
            },

            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1})
                this.resetValidation()
                this.deshabilitar = false
            },

            save () {
                let valid_formulario = this.$refs.form.validate()
                if (valid_formulario){
                    if (this.editedIndex > -1) {//EDITAR

                        this.actualizar_usuario({index: this.editedIndex, user: this.editedItem})
                    
                    } else {  //AGREGAR
                        //El editItem tiene el nuevo valor y el valor editado ya que comparten la misma vista
                        this.deshabilitar = false
                        this.registrar_usuario(this.editedItem)
                    }
                    this.close()
                }
            }
        }       
    }
</script>
