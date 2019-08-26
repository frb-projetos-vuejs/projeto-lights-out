<template>
  <b-jumbotron
    class="jumbo-custom"
    header="Lights-out"
    lead="Escolha de 4 a 10 para definir a quantidade de linhas e colunas do jogo."
    bg-variant="dark"
    text-variant="white"
    border-variant="dark"
  >
    <b-row>
      <b-col sm="12" md="6">
        <b-form-group label="Digite o seu nome:">
          <b-input
            trim
            :state="nameState"
            id="input-live"
            type="text"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Seu nome é..."
            v-model="playerName"
          ></b-input>
          <b-form-invalid-feedback id="input-live-feedback">Informe no mínimo 3 letras.</b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col sm="12" md="6">
        <b-form-group :label="`O quadro será de tamanho: ${size}x${size}.`">
          <b-input type="number" min="4" max="10" v-model="size"></b-input>
        </b-form-group>
      </b-col>
      <b-col cols="12" class="text-center">
        <hr>
        <b-button variant="primary" @click="startGame" :disabled="!nameState">Iniciar</b-button>
      </b-col>
    </b-row>
  </b-jumbotron>
</template>

<script>
export default {
  data() {
    return {
      size: 4,
      playerName: ''
    }
  },
  computed: {
    nameState() {
      return this.playerName.length > 2 ? true : false
    }
  },
  methods: {
    startGame() {
      this.$store.dispatch('gameStart', {
        size: parseInt(this.size),
        name: this.playerName
      })
    }
  },
}
</script>

<style>
</style>
