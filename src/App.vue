<template>
    <v-app id="app">
        <v-navigation-drawer v-model="drawer" app :permanent="permanent">
            <v-list dense>
                <router-link to="/">
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Home</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
                <router-link to="/generi">
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>mdi-playlist-music</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Generi</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
                <v-divider></v-divider>
                <router-link to="/ascoltati">
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>mdi-music-box-multiple-outline</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Ascoltati</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
                <router-link to="/daAscoltare">
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>mdi-clock-outline</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Da ascoltare</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
                <router-link to="/preferiti">
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>mdi-heart</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Preferiti</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="primary" dark hide-on-scroll>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="!permanent" />
            <v-toolbar-title class="mr-5">DeezerRate</v-toolbar-title>
            <v-spacer />
            <searchBar />
            <v-btn icon @click="profile()" class="ml-3">
                <v-icon dark>mdi-account-circle</v-icon>
            </v-btn>
        </v-app-bar>

        <v-content>
            <router-view
                :key="$route.fullPath"
                :albumSearch="albumSearch"
                :artistsSearch="artistsSearch"
                :arrayRisultati="arrayRisultati"
                v-on:play="play"
                v-on:updateUser="updateUser"
                :class="{ marginforplayer: show }"
            ></router-view>
            <!--
            <router-view
                :key="$route.fullPath"
                :albumSearch="albumSearch"
                :artistsSearch="artistsSearch"
                :arrayRisultati="arrayRisultati"
                v-on:play="play"
                v-on:updateUser="updateUser"
                v-on:updateLista2="prop"
                :class="{ marginforplayer: show }"
            ></router-view>
            -->
            <musicPlayer :file="file" class="player" v-if="show" v-on:hide="hide" />
        </v-content>
    </v-app>
</template>

<script>
import searchBar from './components/searchbar'
import musicPlayer from './components/musicplayer'

export default {
    name: 'App',
    props: {
        source: String,
    },
    components: { searchBar, musicPlayer },
    data() {
        return {
            key: 0,
            drawer: false,
            arrayRisultati: null,
            file: null,
            currentUser: null,
            show: false,
            albumSearch: null,
            artistsSearch: null,
            permanent: false,
            breakpoint: this.$vuetify.breakpoint.name,
        }
    },

    created: function() {
        this.$vuetify.theme.dark = true
        this.$store.commit('updateUserFB')
        this.currentUser = this.$store.state.user
        if (this.currentUser != null) {
            this.$store.commit('updateUsernameSetFB')
        } else {
            this.$store.commit('updateUsernameClearFB')
        }
        console.log(this.breakpoint)
        switch (this.breakpoint) {
            case 'xs':
                this.permanent = false
                break
            case 'sm':
                this.permanent = false
                break
            case 'md':
                this.permanent = false
                break
            case 'lg':
                this.permanent = true
                break
            case 'xl':
                this.permanent = true
                break
        }
    },
    updated: function() {
        this.currentUser = this.$store.state.user
    },
    methods: {
        /*
        prop(arr) {
            this.arrayRisultati = arr
        },
        */
        play(link) {
            this.show = true
            this.file = link
        },
        hide(bool) {
            this.show = bool
        },
        profile() {
            console.log(this.currentUser)
            if (this.currentUser == null) {
                this.$router.push({
                    name: 'login',
                })
            } else {
                this.$router.push({
                    name: 'profile',
                    params: { username: this.$store.state.username },
                })
            }
        },
        updateUser(usr) {
            this.currentUser = usr
        },
    },
}
</script>
<style>
.player {
    position: fixed;
    bottom: 0;
    width: 100%;
}
.marginforplayer {
    margin-bottom: 100px;
}
a {
    text-decoration: none;
}
</style>
