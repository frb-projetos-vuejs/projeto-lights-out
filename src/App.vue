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
    </b-container>
  </div>
</template>

<script>
import LightButton from './components/LightButton'

export default {
  data() {
    return {
      size: 4,
      playerName: ''
    }
  },
  components: {
    LightButton
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
      }
  },
  methods: {
    startGame() {
      this.$store.dispatch('gameStart', { size: parseInt(this.size), name: this.playerName })
    },
    quitGame() {

    },
    changeLabelState() {
      this.$store.dispatch('changeShowLabel')
    }
  },
}
</script>

<style>

</style>
