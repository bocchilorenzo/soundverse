<template>
    <v-row align="center">
        <v-col v-for="album in arrayAlbum" :key="album.albumId" cols="12" sm="4" lg="2" xl="2">
            <v-row justify="center" >
                <albumCard :albumArray="album" :id="album.albumId" />
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import albumCard from './card'

export default {
    name: 'cardContainer',
    props: { arrayRisultati: Array },
    data() {
        return { arrayAlbum: this.arrayRisultati }
    },
    components: { albumCard },
    methods: {
        //metodo da usare per rimuovere l'album dall'array
        rimuoviElemento(id) {
            var i = 0
            while (i < this.arrayAlbum.length) {
                if (this.arrayAlbum[i].albumId == id) {
                    this.arrayAlbum.splice(i, i + 1)
                    i = 0
                } else {
                    i++
                }
            }
        },
    },
}
</script>

<style></style>
