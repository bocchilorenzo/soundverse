<template>
    <v-app id="app" oncontextmenu="return false;">
        <v-navigation-drawer v-model="drawer" app>
            <v-list dense>
                <router-link to="/">
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>mdi-home-outline</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Home</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
                <router-link to="/generi">
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>mdi-playlist-music-outline</v-icon>
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
                <v-divider></v-divider>
                <router-link to="/impostazioni">
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>mdi-cog-outline</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Impostazioni</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app flat color="primary" dark :hide-on-scroll="breakpoint == 'xs'">
            <v-app-bar-nav-icon v-if="burger" @click.stop="drawer = !drawer" />
            <v-app-bar-nav-icon v-else @click.stop="navigateBack()">
                <v-icon>mdi-arrow-left</v-icon>
            </v-app-bar-nav-icon>
            <v-toolbar-title class="mr-2">{{ branding }}</v-toolbar-title>
            <v-spacer />
            <searchBar :collapseSearch="collapseSearch" />
            <v-btn icon @click="profile()" class="ml-3" name="Pulsante account o login">
                <v-icon dark>mdi-account-circle</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <router-view
                :key="$route.fullPath"
                :albumSearch="albumSearch"
                :artistsSearch="artistsSearch"
                :arrayRisultati="arrayRisultati"
                v-on:play="play"
                v-on:updateUser="updateUser"
                :class="{ marginforplayer: show }"
                v-on:login="snackLogin"
                v-on:tema="toggleTema"
                v-on:brand="changeBrand"
                v-on:toggleBurger="toggleBurger"
            ></router-view>
            <v-snackbar v-model="snackbar" :timeout="timeout">
                {{ text }}
                <template>
                    <v-btn
                        style="position:absolute; right: 0; top: 5px"
                        text
                        color="primary"
                        @click="snackbar = false"
                        name="Pulsante chiudi"
                    >Chiudi</v-btn>
                </template>
            </v-snackbar>
            <musicPlayer
                :file="file"
                class="player"
                :class="{ exp: !drawer, coll: drawer }"
                v-if="show"
                v-on:hide="hide"
            />
        </v-main>
    </v-app>
</template>

<script>
import searchBar from './components/searchbar'
import musicPlayer from './components/musicplayer'
import scrollToTopMixin from './mixins/scrollToTopMixin'

export default {
    name: 'App',
    props: {
        source: String,
    },
    mixins: [scrollToTopMixin],
    components: { searchBar, musicPlayer },
    data() {
        return {
            key: 0,
            branding: '',
            drawer: false,
            arrayRisultati: null,
            file: null,
            currentUser: null,
            show: false,
            albumSearch: null,
            artistsSearch: null,
            permanent: false,
            breakpoint: this.$vuetify.breakpoint.name,
            snackbar: false,
            timeout: 4000,
            text: '',
            hidebar: false,
            tema: true,
            burger: true,
            collapseSearch: false,
        }
    },
    created: function() {
        //Imposta il tema in base a ciò che è salvato nello storage
        if (localStorage.getItem('dark') == null) {
            this.$vuetify.theme.dark = true
            this.tema = true
        } else {
            if (localStorage.getItem('dark') == 'true') {
                this.$vuetify.theme.dark = true
                this.tema = true
            } else {
                this.$vuetify.theme.dark = false
                this.tema = false
            }
        }
        this.currentUser = JSON.parse(localStorage.getItem('user'))
        //A seconda del breakpoint il drawer è aperto o chiuso di default
        switch (this.breakpoint) {
            case 'xs':
                this.drawer = false
                this.collapseSearch = true
                break
            case 'sm':
                this.drawer = false
                this.collapseSearch = false
                break
            case 'md':
                this.drawer = false
                this.collapseSearch = false
                break
            case 'lg':
                this.drawer = true
                this.collapseSearch = false
                break
            case 'xl':
                this.drawer = true
                this.collapseSearch = false
                break
        }
    },
    updated: function() {
        this.currentUser = JSON.parse(localStorage.getItem('user'))
        this.scrollToTop()
    },
    methods: {
        //Torna indietro nella cronologia
        navigateBack() {
            this.$router.go(-1)
        },
        //Cambia tra freccia e burger per il menu laterale
        toggleBurger(mode) {
            if (mode == 'freccia') {
                this.burger = false
            } else {
                this.burger = true
            }
        },
        //Imposta il branding nella navbar
        changeBrand(brand) {
            this.branding = brand
        },
        //Modifica il tema da chiaro a scuro e viceversa
        toggleTema() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark
            localStorage.setItem('dark', this.$vuetify.theme.dark)
        },
        //Mostra la snackbar con il messaggio che riceve
        snackLogin(msg) {
            this.text = msg
            this.snackbar = true
        },
        //Fa partire la riproduzione del brano
        play(link) {
            this.show = true
            this.file = link
        },
        hide(bool) {
            this.show = bool
        },
        //Se l'utente è nulla reindirizza al login, altrimenti al profilo personale
        profile() {
            if (this.currentUser == null) {
                this.$router.push({
                    name: 'login',
                })
            } else if (this.$route.name != 'profile') {
                this.$router.push({
                    name: 'profile',
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
html {
    --scrollbarBG: #37474f;
    --thumbBG: #3769c8;
}
body::-webkit-scrollbar {
    width: 12px;
}
body {
    scrollbar-width: thin;
    scrollbar-color: var(--thumbBG) var(--scrollbarBG);
}
body::-webkit-scrollbar-track {
    background: var(--scrollbarBG);
}
body::-webkit-scrollbar-thumb {
    background-color: var(--thumbBG);
    border-radius: 6px;
    border: 3px solid var(--scrollbarBG);
}
.player {
    position: fixed;
    bottom: 0;
}
.exp {
    width: 100%;
}
.coll {
    width: calc(100% - 256px);
}
.marginforplayer {
    margin-bottom: 100px;
}
a {
    text-decoration: none;
}
#app {
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>
