<template>
    <v-row no-gutters>
        <v-col
            v-for="artista in arrayRisultati"
            :key="artista.artistId"
            xl="2"
            lg="2"
            md="3"
            sm="4"
        >
            <router-link
                :to="{
                    name: 'artist',
                    path: '/artist/:artista',
                    params: { artista: artista.artistId },
                    props: true,
                }"
            >
                <artistCard :artistArray="artista" :id="artista.artistId" />
            </router-link>
        </v-col>
    </v-row>
</template>

<script>
import artistCard from './cardArtisti'

export default {
    name: 'cardContainerArtisti',
    props: { arrayRisultati: Array },
    components: { artistCard },
}
</script>

<style></style>
