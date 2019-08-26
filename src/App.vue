<template>
  <div id="div-main">
    <background/>
    <b-container>
      <main-screen v-if="!getGameState"/>
      <game v-else/>
      <ranking/>
    </b-container>
  </div>
</template>

<script>
import Ranking from './components/Ranking'
import MainScreen from './components/MainScreen'
import Game from './components/Game'
import Background from './components/Background'

export default {
  components: {
    Background,
    MainScreen,
    Game,
    Ranking
  },
  computed: {
    getGameState() {
      return this.$store.getters.getGameStarted
    }
  }
}
</script>

<style>
@import 'assets/custom.css';
</style>
