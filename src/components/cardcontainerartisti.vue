<template>
    <v-row no-gutters class="pt-3">
        <v-col
            v-for="artista in arrayRisultati"
            :key="artista.artistId"
            xl="2"
            lg="2"
            md="3"
            sm="4"
            class="pb-3 px-1 col-6"
            style="margin:0 auto"
        >
            <router-link
                :to="{
                    name: 'artist',
                    path: '/artist/:artista',
                    params: { artista: artista.artistId },
                    props: true,
                }"
            >
                <artistCard :artistArray="artista" :mode="mode" :id="artista.artistId" />
            </router-link>
        </v-col>
    </v-row>
</template>

<script>
import artistCard from './cardArtisti'

export default {
    name: 'cardContainerArtisti',
    props: { arrayRisultati: Array, mode: String },
    components: { artistCard },
}
</script>

<style></style>
