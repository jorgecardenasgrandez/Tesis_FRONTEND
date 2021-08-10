<template>
    <v-container>
        <v-navigation-drawer
            v-model="drawer"
            :clipped="$vuetify.breakpoint.lgAndUp"
            app
            >
                <v-row justify="center" align="center">
                    <v-col cols="12">
                    <v-list dense class="ml-1">
                        <v-list-item>
                            <v-list-item-avatar>
                                <img src="https://randomuser.me/api/portraits/men/81.jpg">
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title> {{get_first_name}} </v-list-item-title>
                                <v-list-item-subtitle>Admnistrador</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
                
                <v-divider class="mx-3"></v-divider>
                <v-list dense rounded> 
                    <v-list-item-group color="blue darken-3 ">
                        <v-list-item :to="{name:'medico'}">
                            <v-list-item-icon >
                                <v-icon>mdi-clipboard-pulse</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title> Prediction </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
                
                <template v-slot:append>
                    <div class="pa-2">
                        <v-btn color="black" dark block @click="logout">Logout</v-btn>
                    </div>
                </template>
        </v-navigation-drawer>

        <v-app-bar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            app
            color="indigo darken-2"
            dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title
                style="width: 300px"
                class="ml-0 pl-4"
            >
                <span class="hidden-sm-and-down">CMCA | Management Panel</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-apps</v-icon>
            </v-btn>
        </v-app-bar>        
        
        <Usuarios></Usuarios>

    </v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Usuarios from '../../components/Usuarios.vue'

    export default {
        data: () => ({
            dialog: false,
            drawer: null,
        
        }),
        components:{
            Usuarios
        },
        computed: {
            ...mapGetters('usuarios_main', ['get_first_name'])
        },
        methods: {
            ...mapActions('usuarios_main', ['logout'])
        },
    }
</script>
