<template>
  <b-button
    squared
    class="light-btn m-1"
    :variant="getButtonState ? 'primary' : 'secondary'"
    @click="clicked"
  >{{ getUseLabel ? (id + 1) : '' }}</b-button>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    getButtonState() {
      return this.$store.getters.getButtonToggle(this.id)
    },
    getUseLabel() {
      return this.$store.getters.getShowLabels
    },
    getPlayerName() {
      return this.$store.getters.getPlayerName
    }
  },
  methods: {
    clicked() {
      this.$store.dispatch("buttonOverseer", this.id)
    }
  }
}
</script>

<style>
.light-btn {
  width: 80px;
  height: 50px;
}
</style>
