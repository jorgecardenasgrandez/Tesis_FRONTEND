<script>
    import {mapState} from 'vuex';
    import { HorizontalBar } from 'vue-chartjs'
    import {EventBus} from '../main'

    export default {
        extends: HorizontalBar,
        computed:{
            ...mapState('factores_main',['datacollection', 'options']),
        },
        mounted () {
            EventBus.$on('reenvio_data', clickCount => {
                this.renderChart(this.datacollection, this.options)
            });
            
            this.renderChart(this.datacollection, this.options)
        },

    }

    /*import { Line } from 'vue-chartjs'
    export default {
        extends: Line,
        props: {
            chartdata: {
            type: Object,
            default: null
            },
            options: {
            type: Object,
            default: null
            }
        },
        mounted () {
            this.renderChart(this.chartdata, this.options)
        }
    }*/
</script>