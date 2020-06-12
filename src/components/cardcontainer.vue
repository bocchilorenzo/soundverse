<template>
    <v-row align="center">
        <v-col
            v-for="album in arrayRisultati"
            :key="album.albumId"
            cols="12"
            sm="4"
            lg="2"
            xl="2"
        >
            <v-row justify="center">
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
    components: { albumCard },
}
</script>

<style></style>
