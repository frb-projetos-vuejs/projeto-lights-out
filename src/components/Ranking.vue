<template>
    <div>
        <b-button>Atualizar</b-button>
        <ol>
            <li v-for="(player, index) in getRanking.slice(0, 30)" :key="index">
                {{ index + 1 }} - {{ player.name }} {{ player.score }}
            </li>
        </ol>
    </div>
</template>

<script>
import PostService from '../services/PostService'

export default {
    data() {
        return {
            ps: null
        }
    },
    computed: {
        getRanking() {
            this.$store.getters.getRanking
        }
    },
    created() {
        this.ps = new PostService()
    },
    mounted() {
        this.collectRankings()
    },
    methods: {
        collectRankings() {
            this.ps.Get(cbCollectRankings, cbCollectRankingsError)
        },
        cbCollectRankings(resp) {
            this.$store.dispatch('loadRanking', resp.data)
        },
        cbCollectRankingsError(resp) {
            console.log('Erro ao carregar rankings.')
            console.log(resp)
        }
    },
}
</script>

<style>

</style>
