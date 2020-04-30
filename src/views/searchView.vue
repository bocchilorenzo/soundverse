<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col
                v-for="album in arrayRisultati"
                :key="album.id"
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
    </v-container>
</template>

<script>
import albumCard from '../components/card'
export default {
    name: 'search',
    components: {
        albumCard,
    },
    props: {
        arrayRisultati: Array,
    },
}
</script>
