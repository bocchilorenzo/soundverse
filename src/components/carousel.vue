<template>
    <div id="carousel">
        <v-sheet class="mx-auto my-2" cols="12" max-width="1500px">
            <h2 class="ma-2" @click="visualizzaLista(albumArray)">
                {{ albumArray[0] }}
            </h2>
            <v-slide-group
                class="pa-0"
                :prev-icon="prevIcon ? 'mdi-minus' : undefined"
                :next-icon="nextIcon ? 'mdi-plus' : undefined"
                :show-arrows="showArrows"
                :center-active="centerActive"
            >
                <v-slide-item v-for="album in albumArray" :key="album.id">
                    <router-link
                        :to="{
                            name: 'album',
                            path: '/album/:id',
                            params: { id: album.albumId },
                            props: true,
                        }"
                    >
                        <albumCard
                            v-if="check(album)"
                            :albumArray="album"
                            :id="album.albumId"
                        />
                    </router-link>
                </v-slide-item>
            </v-slide-group>
        </v-sheet>
    </div>
</template>

<script>
import albumCard from './card'
export default {
    name: 'carousel',
    props: {
        albumArray: Array,
    },
    components: { albumCard },
    data() {
        return {
            showArrows: false,
            centerActive: true,
            prevIcon: false,
            nextIcon: false,
        }
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        },
    },
    methods: {
        check(data) {
            if (typeof data == 'object') {
                return true
            } else {
                return false
            }
        },
        visualizzaLista(arrayAlbum) {
            this.$store.commit('toggleLoading')
            this.$router.push({
                name: 'list',
                params: { lista: arrayAlbum[1] },
            })
            this.$emit('updateLista', arrayAlbum)
            this.$store.commit('toggleLoading')
        },
    },
}
</script>

<style scoped></style>
