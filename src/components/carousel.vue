<template>
    <v-row align="center" id="carousel" no-gutters>
        <v-col lg="2" md="3" sm="4" class="pb-3 px-1 col-6" v-for="album in albumArray.slice(2, 8)" :key="album.id">
            <albumCard v-if="check(album)" :albumArray="album" :id="album.albumId" />
        </v-col>
    </v-row>
    <!--
        <v-sheet class="mx-auto my-2" cols="12" max-width="1500px">
            <h2 class="ma-2" @click="visualizzaLista(albumArray)">{{ albumArray[0] }}</h2>
            <v-slide-group
                class="pa-0"
                :prev-icon="prevIcon ? 'mdi-minus' : undefined"
                :next-icon="nextIcon ? 'mdi-plus' : undefined"
                :show-arrows="showArrows"
                :center-active="centerActive"
            >
                <v-slide-item v-for="album in albumArray" :key="album.id">
                    <albumCard v-if="check(album)" :albumArray="album" :id="album.albumId" />
                </v-slide-item>
            </v-slide-group>
        </v-sheet>
        -->
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
    methods: {
        check(data) {
            if (typeof data == 'object') {
                return true
            } else {
                return false
            }
        },
    },
}
</script>
<style scoped></style>
