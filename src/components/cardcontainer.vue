<template>
    <v-row align="center" no-gutters>
        <v-col v-for="album in arrayRisultati" :key="album.albumId" xl="2" lg="2" md="3" sm="4">
            <albumCard :albumArray="album" :id="album.albumId" v-on:deletThis="rimuoviElemento" />
        </v-col>
    </v-row>
</template>

<script>
import albumCard from './card'

export default {
    name: 'cardContainer',
    props: { arrayRisultati: Array },
    components: { albumCard },
    methods: {
        //metodo da usare per rimuovere l'album dall'array
        rimuoviElemento(id) {
            this.$emit('delete', id)
        },
    },
}
</script>

<style></style>
