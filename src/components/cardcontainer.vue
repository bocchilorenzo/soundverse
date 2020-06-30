<template>
    <v-row align="center" no-gutters class="pt-3">
        <v-col
            v-for="album in arrayRisultati"
            :key="album.albumId"
            xl="2"
            lg="2"
            md="3"
            sm="4"
            class="pb-3 px-1 col-6"
        >
            <albumCard
                :albumArray="album"
                :id="album.albumId"
                v-on:deletThis="rimuoviElemento"
                v-on:snack="snackMsg"
            />
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
        //Metodo da usare per rimuovere l'album dall'array
        rimuoviElemento(id) {
            this.$emit('delete', id)
        },
        snackMsg(msg) {
            this.$emit('login', msg)
        },
    },
}
</script>

<style></style>
