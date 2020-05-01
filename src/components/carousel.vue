<template>
    <div id="carousel">
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
        <v-sheet
            class="mx-auto my-2"
            elevation="3"
            cols="12"
            max-width="1500px"
            v-else
            ><h2 class="ma-2">{{ albumArray[0] }}</h2>
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
            showArrows: true,
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
    },
}
</script>

<style scoped></style>
