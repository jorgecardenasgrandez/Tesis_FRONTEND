<template>
    <v-container>
        <v-data-table
            :headers="headers"
            :items="valor_username"
            sort-by="id"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Lista de usuarios</v-toolbar-title>

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
                                <!-- sm="6" md="4" -->
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field v-model="editedItem.first_name" label="Nombre" :rules="txtfieldRules"></v-text-field>
                                                <v-text-field v-model="editedItem.last_name" label="Apellido" :rules="txtfieldRules"></v-text-field>
                                                <v-text-field v-model="editedItem.username" label="Usuario" :rules="txtfieldRules"></v-text-field>
                                                <v-text-field
                                                v-model="editedItem.password"
                                                :append-icon="show_eye ? 'mdi-eye' : 'mdi-eye-off'"
                                                :rules="txtfieldRules"
                                                :type="show_eye ? 'text' : 'password'"
                                                label="Contraseña"
                                                requerided
                                                @click:append="show_eye = !show_eye"
                                                ></v-text-field>
                                                <v-select
                                                v-model="editedItem.user_type"
                                                :rules="txtfieldRules"
                                                :items="['Administrador', 'Tecnico', 'Medico']"
                                                label="Tipo de Usuario"
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

            <template v-slot:item.actions="{ item }">
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
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
        </v-data-table>

        <v-snackbar
            v-model="snack.mdl"
            :color="snack.color"
        >
            {{ snack.msg }}
            <v-btn
                color="black"
                text
                @click="snack.mdl = false"
            >
                Cerrar
            </v-btn>
        </v-snackbar>

    </v-container>
</template>

<script>
import {mapState} from 'vuex';
import axios from 'axios';

    export default {
        username:'usernames',
        data: () => ({
            valid:true,
            show_eye:false,
            contrasena:'',
            txtfieldRules: [
                v => !!v || 'Es requerido.'
            ],

            snack:{
                mdl:false,
                msg:'',
                color:''
            },  

            dialog: false,
            headers: [
                {
                text: 'Usuario',
                align: 'start',
                sortable: false,
                value: 'username',
                },
                { text: 'ID', value: 'id' },
                { text: 'Nombre', value: 'first_name' },
                { text: 'Apellido', value: 'last_name' },
                { text: 'Tipo usuario', value: 'user_type' },
                { text: 'Acciones', value: 'actions', sortable: false },
            ],
            valor_username: [], //El valor que tiene los objetos oficiales
            editedIndex: -1,
            editedItem: {
                username: '',
                id: '',
                first_name: '',
                last_name: '',
                password:'',
                user_type: '',
            },
            defaultItem: {
                username: '',
                id: '',
                first_name: '',
                last_name: '',
                password:'',
                user_type: '',
            },
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'Nuevo usuario' : 'Editar usuario'
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
            validate () {
                this.$refs.form.validate()
            },
            resetValidation () {
                this.$refs.form.resetValidation()
            },

            async initialize () {
                try {
                    const response = await axios.get('')
                    await response.data.forEach(element => {
                        let usuario = {}
                        usuario.id = element.id
                        usuario.first_name = element.first_name
                        usuario.last_name = element.last_name
                        usuario.username = element.username
                        usuario.password = element.password
                        usuario.user_type = element.user_type
                        this.valor_username.push(usuario)
                    })
                } catch (error) {
                    console.log(error.response.data)
                }
            },

            editItem (item) {
                this.editedIndex = this.valor_username.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            async deleteItem (item) { //poner async
                const index = this.valor_username.indexOf(item)
                const respuesta = confirm('¿Estas seguro de eliminar este usuario?') && this.valor_username.splice(index, 1)

                if (respuesta){
                    await axios.delete(`usuario/${item.id}`) //, this.config
                    this.snack.mdl = true
                    this.snack.color = "success"
                    this.snack.msg = "Se elimino correctamente."
                }
                
            },

            close () {
                this.dialog = false
                this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                })
                this.resetValidation()
            },

            async save () { //PONER EL ASYNC
                let valid_formulario = this.$refs.form.validate()
                if (valid_formulario){
                    if (this.editedIndex > -1) {//EDITAR
                        //Object.assign(this.valor_username[this.editedIndex], this.editedItem)
                        
                        try{

                            const response = await axios.put(`usuario/${this.editedItem.id}`, this.editedItem) //, this.config
                            Object.assign(this.valor_username[this.editedIndex], this.editedItem) //Si editamos correctamente, va a cambiar la vista

                            this.snack.mdl = true
                            this.snack.color = "success"
                            this.snack.msg = `El usuario se editó exitosamente.`
                        }catch(error){
                            console.log(error)
                        }
                        
                    } else {//AGREGAR
                        //El editItem tiene el nuevo valor y el valor editado ya que comparten la misma vista
                        const new_usuario = {
                            first_name: this.editedItem.first_name,
                            last_name: this.editedItem.last_name,
                            username: this.editedItem.username,
                            password: this.editedItem.password,
                            user_type: this.editedItem.user_type
                        }
                        console.log(new_usuario)
                        try {
                            const response = await axios.post('usuario', new_usuario)
                            this.editedItem.first_name = response.data.first_name
                            this.editedItem.last_name = response.data.last_name
                            this.editedItem.username = response.data.username
                            this.editedItem.user_type = response.data.user_type
                            this.editedItem.password = response.data.password
                            this.valor_username.push(this.editedItem)

                            this.snack.mdl = true
                            this.snack.color = "success"
                            this.snack.msg = "El usuario se guardó exitosamente."
                        } catch (error) {
                            console.log(error)
                        }
                        
                        /** 
                         * - 
                         *  
                         * try{
                         *  const entradadb = await this.axios.post('url_post', new_usuario,this.config) el config solo si tenemos JWT
                         *  - Ahora la entradadb tiene el valor ya ingresado
                         *  this.editedItem.first_name = entradadb.data.first_name
                         *  this.editedItem.last_name = entradadb.data.last_name
                         *  this.editedItem.username = entradadb.data.username
                         *  this.editedItem.user_type = entradadb.data.user_type
                         *  this.editedItem.password = entradadb.data.password
                         *  this.valor_username.push(this.editedItem)
                         * }catch(){
                         *  console.log(error)
                         * }
                         *  
                         */
                        //this.valor_username.push(this.editedItem)
                    }
                    this.close()
                }
            }
        }       
    }
</script>
