<template>
    <v-app id="inspire">
        <v-content>
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
                            :to="{ name: 'album', path: '/album/:id', params: { id: album.albumId }, props: true}"
                        >
                            <albumCard :albumArray="album" :id="album.albumId" />
                        </router-link>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import albumCard from '../components/card'
import axios from 'axios'
export default {
    name: 'search',
    data() {
        return {
            arrayRisultati: [],
        }
    },
    created: function() {
        this.updateData()
    },
    methods: {
        updateData() {
            var q = this.$route.params.q
            console.log(q)
            axios
                .get('https://api.deezer.com/search/album?q=' + q)
                .then(response => {
                    for (var i = 0; i < 12; i++) {
                        var risultati = {
                            id: i,
                            title: response.data.data[i]['title'],
                            cover: response.data.data[i]['cover_medium'],
                            artist: response.data.data[i].artist['name'],
                            albumId: response.data.data[i]['id'],
                            albumLink: response.data.data[i]['link'], //questo non servirà poi, è solo per testare ora
                            explicit: response.data.data[i]['explicit_lyrics'],
                        }
                        this.arrayRisultati.push(risultati)
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
        },
    },
    components: {
        albumCard,
    },
}
</script>
