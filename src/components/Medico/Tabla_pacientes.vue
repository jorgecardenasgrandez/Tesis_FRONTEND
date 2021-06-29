<template>
  <div>
      <template>
        <v-data-table
          :headers="headers"
          :items="paciente"
          class="elevation-1"
          loading
          loading-text="Loading patient list ... Please wait"
        >
          <template v-slot:top> 
            <v-toolbar flat color="white">
              <v-toolbar-title>Patient list</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
            </v-toolbar>
          </template>

          <template v-slot:[`item.boton`]="{ item }">
            <v-btn :to="{name: 'predicciones', params:{id: item.id}}" rounded color="red accent-3" elevation="5" dark>
              <v-icon color="yellow lighten-4"> mdi-chart-arc </v-icon>                              
            </v-btn>
          </template>

        </v-data-table>
      </template>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'

export default {
    name:'Tabla_pacientes',
    data() {
      return {
        headers: [
          {text: 'ID', align: 'center', value: 'id'},
          {text: 'DNI', sortable: false, value: 'dni', align: 'center'},
          {text: 'Name', value: 'nombre', align: 'center' },
          {text: 'Date of entry', value: 'fecha', align: 'center'},
          {text: 'Predictions', value:'boton', sortable: false, align: 'center'},
        ],
      }
    },
    computed: {
      ...mapState('listar_predicciones_main', ['paciente']),
    },

    methods: {
      ...mapActions('listar_predicciones_main',['consultarPacientes']),

      getColor (prematurity) {
        if (prematurity){
          return 'red'
        }else{
          return 'green'
        }
      }
    },
    created () {
      this.consultarPacientes();
    },
}
</script>