<template>
    <div class="home" v-on:>
        <v-container class="fill-height" fluid>
            <card-container :albumArray="albumArray" />
        </v-container>
    </div>
</template>

<script>
import cardContainer from '../components/cardcontainer'
import axios from 'axios'

// @ is an alias to /src

export default {
    name: 'Home',
    components: { cardContainer },
    data() {
        return {
            albumArray: [],
        }
    },
    created: function() {
        this.$vuetify.theme.dark = false
        axios
            .get('https://api.deezer.com/playlist/3155776842')
            .then(response => {
                for (var i = 0; i < 12; i++) {
                    var album = {
                        id: i,
                        title: response.data.tracks.data[i].album['title'],
                        cover:
                            response.data.tracks.data[i].album['cover_medium'],
                        artist: response.data.tracks.data[i].artist['name'],
                        albumId: response.data.tracks.data[i].album['id'],
                        albumLink:
                            'https://deezer.com/album/' +
                            response.data.tracks.data[i].album['id'], //questo non servirà poi, è solo per testare ora
                    }
                    this.albumArray.push(album)
                }
                this.$store.commit('toggleLoading')
                if (this.loading == true) {
                    this.$store.commit('toggleLoading')
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        },
    },
}
</script>
