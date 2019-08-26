<template>
  <b-jumbotron bg-variant="dark" class="text-center jumbo-custom">
    <div>
      <b-button v-b-modal.modal-ranking>Ver rankings</b-button>
    </div>
    <!-- Rankings modal -->
    <b-modal
      centered
      id="modal-ranking"
      scrollable
      title="Ranking"
      header-bg-variant="dark"
      header-text-variant="light"
      footer-bg-variant="dark"
      body-bg-variant="primary"
      body-text-variant="light"
      ok-only
    >
      <ranking-list :ranking="getRanking" :msg="getGameWon ? 'Parabéns, você ganhou!' : ''"/>
    </b-modal>
  </b-jumbotron>
</template>

<script>
import RankingList from './RankingList'
import PostService from '../services/PostService'

export default {
  components: {
    RankingList
  },
  computed: {
    getGameWon() {
      return this.$store.getters.getGameWon
    },
    getRanking() {
      return this.$store.getters.getRanking
    },
    getPlayerName() {
      return this.$store.getters.getPlayerName
    },
    getPresses() {
      return this.$store.getters.getPresses
    },
    getLines() {
      return this.$store.getters.getLines
    }
  },
  methods: {
    collectRankings() {
      this.ps.Get(this.cbCollectRankings, this.cbCollectRankingsError)
    },
    cbCollectRankings(resp) {
      if (resp.data) {
        this.$store.dispatch('loadRanking', resp.data)
      }
      if (this.getGameWon) {
        this.$bvModal.show('modal-ranking')
      }
    },
    cbCollectRankingsError(resp) {
      console.log('Erro ao carregar rankings.')
      console.log(resp)
    },
    updateRanking() {
      this.ps.Post(
        this.getRanking,
        this.cbUpdateRanking,
        this.cbUpdateRankingError
      )
    },
    cbUpdateRanking(resp) {
      this.ps.Get(this.cbCollectRankings, this.cbCollectRankingsError)
      console.log(resp)
    },
    cbUpdateRankingError(resp) {
      console.log('Erro ao atualizar rankings.')
      console.log(resp)
    }
  },
  created() {
    this.ps = new PostService()
  },
  mounted() {
    this.collectRankings()
  },
  watch: {
    getGameWon() {
      this.$store.dispatch('addRanking', {
        presses: this.getPresses,
        size: this.getLines,
        name: this.getPlayerName
      })
      this.updateRanking()
    }
  }
}
</script>

<style>
</style>
