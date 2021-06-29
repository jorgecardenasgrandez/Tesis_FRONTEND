<template>
    <div>
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
                Validating credentials ...
                <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0"
                ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name:'Loading',
    props: {
        loading: {
            type: Object,
        },
    },

}
</script>