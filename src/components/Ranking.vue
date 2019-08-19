<template>
    <div class="text-center">
        <!-- <b-button>Atualizar</b-button> -->
        <h5>{{msg}}</h5>
        <ol>
            <li v-for="(player, index) in ranking" :key="index">
                {{ player.name }} - {{ player.score }}
            </li>
        </ol>
    </div>
</template>

<script>
export default {
    props: ['ranking', 'msg']
}
</script>

<style>

</style>
