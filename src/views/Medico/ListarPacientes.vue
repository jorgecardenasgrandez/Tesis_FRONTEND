<template>
    <v-container>
      <PanelMedico></PanelMedico>
      <TablaPacientes />
    </v-container>
</template>

<script>
import PanelMedico from '@/components/Panel_medico'
import TablaPacientes from '@/components/Medico/Tabla_pacientes'
export default {
    name: 'ListarPacientes',
    components: {
        PanelMedico,
        TablaPacientes
    },
}
</script>