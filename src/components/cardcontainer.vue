<template>
    <v-row align="center">
        <v-col v-for="album in arrayRisultati" :key="album.albumId" cols="12" sm="4" lg="2" xl="2">
            <v-row justify="center">
                <albumCard
                    :albumArray="album"
                    :id="album.albumId"
                    v-on:deletThis="rimuoviElemento"
                />
            </v-row>
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
