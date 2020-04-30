<template>
    <v-row no-gutters justify="center" align="center">
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
            v-for="album in albumArray"
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
</template>

<script>
import albumCard from './card'

export default {
    name: 'cardContainer',
    props: { albumArray: Array },
    components: { albumCard },
    computed: {
        loading() {
            return this.$store.getters.loading
        },
    },
}
</script>

<style></style>
