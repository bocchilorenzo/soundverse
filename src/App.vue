<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
            <v-list dense>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon>mdi-contact-mail</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Contact</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="indigo" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title>Application</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col class="text-center">
                        <v-tooltip left>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    :href="source"
                                    icon
                                    large
                                    target="_blank"
                                    v-on="on"
                                >
                                    <v-icon large>mdi-code-tags</v-icon>
                                </v-btn>
                            </template>
                            <span>Source</span>
                        </v-tooltip>

                        <v-tooltip right>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    icon
                                    large
                                    href="https://codepen.io/johnjleider/pen/zgxeLQ"
                                    target="_blank"
                                    v-on="on"
                                >
                                    <v-icon large>mdi-codepen</v-icon>
                                </v-btn>
                            </template>
                            <span>Codepen</span>
                        </v-tooltip>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
        <v-footer color="indigo" app>
            <span class="white--text">&copy; 2019</span>
        </v-footer>
    </v-app>
</template>

<script>
import axios from 'axios'
import cardContainer from './components/cardcontainer.vue'

export default {
    name: 'App',
    props: {
        source: String,
    },
    components: { cardContainer },
    data() {
        return {
            albumArray: [],
            drawer: false,
        }
    },
    created: function() {
        this.$vuetify.theme.dark = true
        axios
            .get(
                'https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/3155776842'
            )
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
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
    },
}
</script>
