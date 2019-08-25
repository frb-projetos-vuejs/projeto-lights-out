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
import RankingList from "./RankingList"
export default {
  components: {
    RankingList
  }
}
</script>

<style>
</style>
