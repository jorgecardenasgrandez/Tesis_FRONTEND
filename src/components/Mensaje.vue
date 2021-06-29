<template>
    <div>
        <v-snackbar
            v-model="snack.model_snack"
            :color = "snack.color"
            :timeout="timeout_snack"
            text
            elevation="0"
        >
            <v-icon v-if="snack.icono_success" left dark>mdi-check-circle-outline</v-icon>
            <v-icon v-else left dark>mdi-alert-circle-outline</v-icon>
            <strong>{{ snack.msg }}</strong>
            
            <v-btn
                fab
                dark
                x-small
                @click="snack.model_snack = false"
            >
                <v-icon dark>mdi-close</v-icon>
            </v-btn>

        </v-snackbar>
    </div>
</template>

<script>
export default {
    name: 'Mensaje',
    props: {
        snack: Object
    },
    data() {
        return {
            timeout_snack:0,
        }
    },
}
</script>