<template>
  <div id="div-main">
    <background/>
    <b-container>
      <main v-if="!getGameState"/>
      <game v-else/>
      <ranking-jumbo/>
    </b-container>
  </div>
</template>

<script>
import Ranking from "./components/Ranking"
import Main from "./components/Main"
import Game from "./components/Game"
import Background from "./components/Background"
import PostService from "./services/PostService"

export default {
  data() {
    return {
      size: 4,
      playerName: ""
    }
  },
  components: {
    Background,
    Main,
    Game,
    Ranking
  },
  computed: {
    nameState() {
      return this.playerName.length > 2 ? true : false
    },
    getGameState() {
      return this.$store.getters.getGameStarted
    },
    getButtons() {
      return this.$store.getters.getButtons
    },
    getPlayerName() {
      return this.$store.getters.getPlayerName
    },
    getPresses() {
      return this.$store.getters.getPresses
    },
    getRanking() {
      return this.$store.getters.getRanking
    },
    getGameWon() {
      return this.$store.getters.getGameWon
    }
  },
  methods: {
    startGame() {
      this.$store.dispatch("gameStart", {
        size: parseInt(this.size),
        name: this.playerName
      })
    },
    quitGame() {
      if (confirm("Tem certeza que deseja sair?")) {
        this.$store.dispatch("quitGame")
      }
    },
    changeLabelState() {
      this.$store.dispatch("changeShowLabel")
    },
    collectRankings() {
      this.ps.Get(this.cbCollectRankings, this.cbCollectRankingsError)
    },
    cbCollectRankings(resp) {
      if (resp.data) {
        this.$store.dispatch("loadRanking", resp.data)
      }
      if (this.getGameWon) {
        this.$bvModal.show("modal-ranking")
      }
    },
    cbCollectRankingsError(resp) {
      console.log("Erro ao carregar rankings.")
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
    },
    cbUpdateRankingError(resp) {
      console.log("Erro ao atualizar rankings.")
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
      this.$store.dispatch("addRanking", {
        presses: this.getPresses,
        size: this.size,
        name: this.getPlayerName
      })
      this.updateRanking()
    }
  }
}
</script>

<style>
@import "assets/custom.css";
</style>
