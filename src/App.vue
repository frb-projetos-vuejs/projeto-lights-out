<template>
  <div>
    <b-container>
      <b-jumbotron v-if="!getGameState" class="jumbo" header="Lights-out" lead="Escolha de 4 a 10 para definir a quantidade de linhas e colunas do jogo." bg-variant="secondary" text-variant="white" border-variant="dark">
        <b-row>
          <b-col sm="12" md="6">
            <b-form-group label="Digite o seu nome:">
              <b-input trim :state="nameState" id="input-live" type="text" aria-describedby="input-live-help input-live-feedback" placeholder="Seu nome é..." v-model="playerName"></b-input>
              <b-form-invalid-feedback id="input-live-feedback">
                Informe no mínimo 3 letras.
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col sm="12" md="6">
            <b-form-group :label="`O quadro será de tamanho: ${size}x${size}.`">
              <b-input type="number" min="4" max="10" v-model="size"></b-input>
            </b-form-group>
          </b-col>
        </b-row>
        <hr>
        <b-button variant="primary" @click="startGame" :disabled="!nameState">Iniciar</b-button>
      </b-jumbotron>
      <b-jumbotron class="text-center" :header="`Jogador: ${getPlayerName}`" :lead="'Tempo: Jogadas: ' + getPresses" bg-variant="dark" border-variant="dark" text-variant="white" v-else>
        <span v-for="button in getButtons" :key="button.id">
          <light-button :id="button.id" />
          <br v-if="(button.id+1) % size === 0" />
        </span>
        <hr>
        <b-button variant="info" class="m-1" @click="changeLabelState">Mostrar números</b-button>
        <b-button variant="primary" class="m-1" @click="quitGame">Voltar</b-button>
      </b-jumbotron>
      <b-jumbotron bg-variant="dark" class="text-center">
        <div>
          <b-button v-b-modal.modal-ranking>Ver rankings</b-button>

        </div>
      </b-jumbotron>
    </b-container>

    <!-- Rankings modal -->
    <b-modal centered id="modal-ranking" scrollable title="Ranking" header-bg-variant="dark" header-text-variant="light" footer-bg-variant="dark">
      <ranking :ranking="getRanking" :msg="getGameWon ? 'Parabéns, você ganhou!' : 'Ranking dos vencedores:'" />
    </b-modal>
  </div>
</template>

<script>
import LightButton from './components/LightButton'
import Ranking from './components/Ranking'
import PostService from './services/PostService'

export default {
  data() {
    return {
      size: 4,
      playerName: ''
    }
  },
  components: {
    LightButton,
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
      getPresses(){
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
      this.$store.dispatch('gameStart', { size: parseInt(this.size), name: this.playerName })
    },
    quitGame() {
      if (confirm("Tem certeza que deseja sair?")) {
        this.$store.dispatch('quitGame')
      }
    },
    changeLabelState() {
      this.$store.dispatch('changeShowLabel')
    },
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
      this.ps.Post(this.getRanking, this.cbUpdateRanking, this.cbUpdateRankingError)
    },
    cbUpdateRanking(resp) {
      this.ps.Get(this.cbCollectRankings, this.cbCollectRankingsError)
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
      this.$store.dispatch('addRanking', { presses: this.getPresses, size: this.size, name: this.getPlayerName })
      this.updateRanking()
    }
  },
}
</script>

<style>

</style>
