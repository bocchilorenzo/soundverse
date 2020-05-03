<template>
    <v-row no-gutters justify="center">
        <v-col
            v-if="this.loading"
            cols="1"
            class="text-center"
            style="height: 100vh; display: flex; align-items:center;"
        >
            <v-progress-circular
                :size="70"
                :width="7"
                color="indigo"
                indeterminate
            ></v-progress-circular>
        </v-col>
        <v-col
            v-else
            v-for="artista in arrayRisultati"
            :key="artista.artistId"
            cols="12"
            sm="3"
            lg="2"
            xl="2"
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
    computed: {
        loading() {
            return this.$store.getters.loading
        },
    },
}
</script>

<style></style>
