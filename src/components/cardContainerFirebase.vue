<template>
    <v-row align="center" no-gutters class="pt-3">
        <v-col
            v-for="album in albumArray"
            :key="album.albumId"
            xl="2"
            lg="2"
            md="3"
            sm="4"
            class="pb-3 px-1 col-6"
        >
            <albumCard :albumArray="album" :id="album.albumId" v-on:snack="snackMsg" />
        </v-col>
    </v-row>
</template>

<script>
import albumCard from './card'

export default {
    name: 'cardContainerProva',
    props: { idArray: Array },
    components: { albumCard },
    data() {
        return {
            albumArray: [],
            loading: true,
            bottom: false,
            start: 0,
            end: 15,
            stop: false,
            lastCycle: false,
        }
    },
    created: function() {
        window.addEventListener('scroll', () => {
            this.bottom = this.bottomVisible()
        })
        this.addAlbums()
    },
    methods: {
        //Aggiunge gli album all'array
        addAlbums() {
            if (this.stop == false) {
                if (this.idArray.length < 15) {
                    this.end = this.idArray.length
                    this.lastCycle = true
                }
                for (var i = this.start; i < this.end; i++) {
                    if (this.idArray[i].albumId != undefined) {
                        var album = {
                            title: this.idArray[i].titolo,
                            artist: this.idArray[i].artista,
                            albumId: this.idArray[i].albumId,
                            cover: this.idArray[i].cover,
                        }
                        this.albumArray.push(album)
                    }
                }
                this.start = this.end
                if (this.lastCycle == true) {
                    this.stop = true
                } else {
                    if (this.idArray.length > this.end + 15) {
                        this.end += 15
                    } else {
                        this.end = this.idArray.length - 1
                        this.lastCycle = true
                    }
                }
            } else {
                //this.loading = false
            }
        },
        //Controlla se siamo arrivati alla fine della pagina
        bottomVisible() {
            const scrollY = window.scrollY
            const visible = document.documentElement.clientHeight
            const pageHeight = document.documentElement.scrollHeight - 200
            const bottomOfPage = visible + scrollY >= pageHeight
            return bottomOfPage || pageHeight < visible
        },
        snackMsg(msg) {
            this.$emit('login', msg)
        },
    },
    watch: {
        bottom(bottom) {
            if (bottom) {
                this.addAlbums()
            }
        },
    },
}
</script>

<style></style>
