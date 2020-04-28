<template>
    <v-row no-gutters>
        <v-col v-for="album in albumArray" :key="album.id" cols="12" sm="3" lg="2" xl="2">
            <router-link :to="{ name: 'album', path: '/album/:id', params: { id: album.albumId }, props: true}">
                <albumCard :albumArray="album" :id="album.albumId" />
            </router-link>
        </v-col>
    </v-row>
</template>

<script>
import albumCard from './card'

export default {
    name: 'cardContainer',
    props: { albumArray: Array },
    components: { albumCard },
}
</script>

<style></style>
