<template>
    <div class="text-center">
        <!-- <b-button>Atualizar</b-button> -->
        <h5>{{msg}}</h5>
        <ol>
            <li class="score" v-for="(player, index) in ranking" :key="index">
                Nome: {{ player.name }}<br>Jogadas: {{ player.presses }} | Tamanho: {{ player.size | sizeFilter }}
            </li>
        </ol>
    </div>
</template>

<script>
export default {
    props: ['ranking', 'msg'],
    filters: {
        sizeFilter(value) {
            return value + 'x' + value
        }
    }
}
</script>

<style>

.score {
    border: 1px solid white;
}

</style>
