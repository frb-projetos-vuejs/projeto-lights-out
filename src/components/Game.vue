<template>
  <b-jumbotron
    class="text-center jumbo-custom"
    :header="`Jogador: ${getPlayerName}`"
    :lead="'Jogadas: ' + getPresses"
    bg-variant="dark"
    border-variant="dark"
    text-variant="white"
  >
    <span v-for="button in getButtons" :key="button.id">
      <light-button :id="button.id"/>
      <br v-if="(button.id+1) % getLines === 0">
    </span>
    <hr>
    <b-button variant="info" class="m-1" @click="changeLabelState">Mostrar números</b-button>
    <b-button variant="primary" class="m-1" @click="quitGame">Voltar</b-button>
  </b-jumbotron>
</template>

<script>
import LightButton from "./LightButton"
export default {
  components: {
    LightButton
  },
  computed: {
    getButtons() {
      return this.$store.getters.getButtons
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
    changeLabelState() {
      this.$store.dispatch("changeShowLabel")
    },
    quitGame() {
      if (confirm("Tem certeza que deseja sair?")) {
        this.$store.dispatch("quitGame")
      }
    }
  },
}
</script>

<style>
</style>
