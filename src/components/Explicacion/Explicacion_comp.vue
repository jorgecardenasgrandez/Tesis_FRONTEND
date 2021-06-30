<script>
    import {mapState} from 'vuex';
    import { HorizontalBar } from 'vue-chartjs'
    import {EventBus} from '@/main.js'

    export default {
        extends: HorizontalBar,
        computed:{
            ...mapState('listar_predicciones_main',['datacollection', 'options']),
        },
        mounted () {
            EventBus.$on('reenviar_data', clickCount => {
                this.renderChart(this.datacollection, this.options)
            });
            //this.renderChart(this.datacollection, this.options)
        },
    }
</script>