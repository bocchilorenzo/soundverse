<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
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
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="indigo" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title class="mr-5">Application</v-toolbar-title>
            <v-spacer />
            <searchBar v-on:update="prop" />
            <v-btn icon @click="profile()" class="ml-3">
                <v-icon dark>mdi-account-circle</v-icon>
            </v-btn>
        </v-app-bar>

        <v-content>
            <!--dentro il tag va: v-on:nomeEvento="funzioneDaEseguire(datoDaPassare)" => vai in methods qua sotto-->
            <router-view
                :arrayRisultati="arrayRisultati"
                v-on:play="play"
                style="margin: 0px 0px 125px"
            ></router-view>
            <musicPlayer
                :file="file"
                class="player"
                v-if="show"
                v-on:hide="hide"
            />
        </v-content>
        <!--
        <v-footer color="indigo" app>
            <span class="white--text">&copy; 2019</span>
        </v-footer>
        -->
    </v-app>
</template>

<script>
import searchBar from './components/searchbar'
import musicPlayer from './components/musicplayer'
import firebase from 'firebase'

export default {
    name: 'App',
    props: {
        source: String,
    },
    components: { searchBar, musicPlayer },
    data() {
        return {
            drawer: false,
            arrayRisultati: null,
            file: null,
            currentUser: Object,
            show: false,
        }
    },
    created: function() {
        var cU = firebase.auth().currentUser
        if (cU != null) {
            this.currentUser = cU
        }
    },
    methods: {
        prop(arr) {
            this.arrayRisultati = arr
        },
        play(link) {
            this.show = true
            this.file = link
        },
        hide(bool) {
            this.show = bool
        },
        profile() {
            if (this.currentUser == null) {
                this.$router.push({
                    name: 'login',
                    props: { user: this.currentUser },
                }) //passo il prop
            } else {
                this.$router.push({ name: 'profile' })
            }
        },
        //funzioneDaEseguire(data){bla bla bla}
    },
}
</script>
<style>
.player {
    position: fixed;
    bottom: 0;
    width: 100%;
}
</style>
