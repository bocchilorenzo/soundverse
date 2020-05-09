<template>
    <v-row no-gutters justify="center" align="center">
        <v-col
            v-for="album in arrayRisultati"
            :key="album.albumId"
            cols="12"
            sm="3"
            lg="2"
            xl="2"
        >
            <router-link
                :to="{
                    name: 'album',
                    path: '/album/:id',
                    params: { id: album.albumId },
                    props: true,
                }"
            >
                <albumCard :albumArray="album" :id="album.albumId" />
            </router-link>
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
