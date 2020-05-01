<template>
    <div class="home" v-on:>
        <v-container class="fill-height" fluid>
            <carousel :albumArray="worldAlbumArray" />
            <carousel :albumArray="italyAlbumArray" />
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import carousel from '../components/carousel'

// @ is an alias to /src

export default {
    name: 'Home',
    components: { carousel },
    data() {
        return {
            albumArray: [],
            worldAlbumArray: [],
            italyAlbumArray: [],
        }
    },
    created: function() {
        this.$vuetify.theme.dark = false
        axios
            .all([
                axios.get(`https://api.deezer.com/playlist/3155776842`),
                axios.get(`https://api.deezer.com/playlist/1116187241`),
            ])
            .then(
                axios.spread((firstResponse, secondResponse) => {
                    for (var i = 0; i < 40; i++) {
                        var albumWorld = {
                            id: i,
                            title:
                                firstResponse.data.tracks.data[i].album[
                                    'title'
                                ],
                            cover:
                                firstResponse.data.tracks.data[i].album[
                                    'cover_medium'
                                ],
                            artist:
                                firstResponse.data.tracks.data[i].artist[
                                    'name'
                                ],
                            albumId:
                                firstResponse.data.tracks.data[i].album['id'],
                            albumLink:
                                'https://deezer.com/album/' +
                                firstResponse.data.tracks.data[i].album['id'], //questo non servirà poi, è solo per testare ora
                        }
                        this.worldAlbumArray.push(albumWorld)
                    }

                    for (var x = 0; x < 40; x++) {
                        var albumItaly = {
                            id: x,
                            title:
                                secondResponse.data.tracks.data[x].album[
                                    'title'
                                ],
                            cover:
                                secondResponse.data.tracks.data[x].album[
                                    'cover_medium'
                                ],
                            artist:
                                secondResponse.data.tracks.data[x].artist[
                                    'name'
                                ],
                            albumId:
                                secondResponse.data.tracks.data[x].album['id'],
                            albumLink:
                                'https://deezer.com/album/' +
                                secondResponse.data.tracks.data[x].album['id'], //questo non servirà poi, è solo per testare ora
                        }
                        this.italyAlbumArray.push(albumItaly)
                    }
                    this.$store.commit('toggleLoading')
                    if (this.loading == true) {
                        this.$store.commit('toggleLoading')
                    }
                })
            )
            .catch(error => console.log(error))
        axios
            .get('https://api.deezer.com/playlist/3155776842')
            .then(response => {
                for (var i = 0; i < 40; i++) {
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
