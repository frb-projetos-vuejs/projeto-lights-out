<template>
    <b-button squared class="light-btn m-1" :variant="toggled ? 'success' : 'secondary'" @click="toggled = !toggled">
        {{id}}
    </b-button>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            toggled: false
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
