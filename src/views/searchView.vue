<template>
    <div>
        <div v-if="loading == true">
            <v-tabs
                v-model="tab"
                background-color="primary"
                class="elevation-2"
                dark
                :centered="centered"
                :grow="grow"
            >
                <v-tabs-slider></v-tabs-slider>
                <v-tab>Album</v-tab>
                <v-tab>Artisti</v-tab>
                <v-tab>Utenti</v-tab>
                <v-tab-item>
                    <v-row align="center" no-gutters class="pt-2">
                        <v-col
                            v-for="n in 18"
                            :key="n"
                            xl="2"
                            lg="2"
                            md="3"
                            sm="4"
                            class="pb-3 px-1 col-6"
                        >
                            <v-skeleton-loader class="mx-2" type="card"></v-skeleton-loader>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item>
                    <v-row align="center" no-gutters class="pt-2">
                        <v-col
                            v-for="n in 12"
                            :key="n"
                            lg="2"
                            md="3"
                            sm="4"
                            class="pb-3 px-1 col-6"
                        >
                            <v-skeleton-loader
                                type="image"
                                style="border-radius: 100%; margin: 0 auto"
                                height="150px"
                                width="150px"
                            ></v-skeleton-loader>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item>
                    <v-row align="center" no-gutters class="pt-2">
                        <v-col class="pb-3 px-1 col-12">
                            <v-skeleton-loader
                                class="mx-2"
                                type="list-item-avatar"
                            ></v-skeleton-loader>
                        </v-col>
                    </v-row>
                </v-tab-item>
            </v-tabs>
        </div>
        <div v-else>
            <v-tabs
                v-model="tab"
                background-color="primary"
                class="elevation-2"
                dark
                :centered="centered"
                :grow="grow"
            >
                <v-tabs-slider></v-tabs-slider>
                <v-tab>Album</v-tab>
                <v-tab>Artisti</v-tab>
                <v-tab>Utenti</v-tab>
                <v-tab-item>
                    <cardContainer
                        v-if="albums.length != 0"
                        :arrayRisultati="albums"
                        v-on:login="snackMsg"
                    ></cardContainer>
                    <div v-else class="d-flex justify-center">
                        <v-container
                            class="d-inline-flex justify-center flex-column align-center"
                            style="border-radius: 50%; height:400px;width:400px; margin:10px"
                        >
                            <svg style="width:80%;max-width:150px;max-height:150px;" viewBox="0 0 24 24">
                                <path
                                    fill="#ececec"
                                    d="M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H8V4H20M12.5,15A2.5,2.5 0 0,0 15,12.5V7H18V5H14V10.5C13.58,10.19 13.07,10 12.5,10A2.5,2.5 0 0,0 10,12.5A2.5,2.5 0 0,0 12.5,15M4,6H2V20A2,2 0 0,0 4,22H18V20H4"
                                />
                            </svg>
                            <p style="width: 60%; text-align: center">Ops, nessun album trovato.</p>
                        </v-container>
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <cardContainerArtisti
                        v-if="artisti.length != 0"
                        :arrayRisultati="artisti"
                        :mode="mode"
                    ></cardContainerArtisti>
                    <div v-else class="d-flex justify-center">
                        <v-container
                            class="d-inline-flex justify-center flex-column align-center"
                            style="border-radius: 50%; height:400px;width:400px; margin:10px"
                        >
                            <svg style="width:80%;max-width:150px;max-height:150px;" viewBox="0 0 24 24">
                                <path
                                    fill="#ececec"
                                    d="M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H8V4H20M12.5,15A2.5,2.5 0 0,0 15,12.5V7H18V5H14V10.5C13.58,10.19 13.07,10 12.5,10A2.5,2.5 0 0,0 10,12.5A2.5,2.5 0 0,0 12.5,15M4,6H2V20A2,2 0 0,0 4,22H18V20H4"
                                />
                            </svg>
                            <p style="width: 60%; text-align: center">
                                Ops, nessun artista trovato.
                            </p>
                        </v-container>
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <usersContainer
                        v-if="utenti.length != 0"
                        :arrayRisultati="utenti"
                    ></usersContainer>
                    <div v-else class="d-flex justify-center">
                        <v-container
                            class="d-inline-flex justify-center flex-column align-center"
                            style="border-radius: 50%; height:400px;width:400px; margin:10px"
                        >
                            <svg style="width:80%;max-width:150px;max-height:150px;" viewBox="0 0 24 24">
                                <path
                                    fill="#ececec"
                                    d="M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H8V4H20M12.5,15A2.5,2.5 0 0,0 15,12.5V7H18V5H14V10.5C13.58,10.19 13.07,10 12.5,10A2.5,2.5 0 0,0 10,12.5A2.5,2.5 0 0,0 12.5,15M4,6H2V20A2,2 0 0,0 4,22H18V20H4"
                                />
                            </svg>
                            <p style="width: 60%; text-align: center">
                                Ops, nessun utente trovato.
                            </p>
                        </v-container>
                    </div>
                </v-tab-item>
            </v-tabs>
        </div>
    </div>
</template>

<script>
import cardContainer from '../components/cardcontainer'
import usersContainer from '../components/usersContainer'
import cardContainerArtisti from '../components/cardcontainerartisti'
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'
import firebase from 'firebase'
export default {
    name: 'search',
    data() {
        return {
            tab: null,
            centered: true,
            grow: true,
            albums: [],
            artisti: [],
            utenti: [],
            bottom: false,
            start: 0,
            end: 25,
            stop: false,
            lastCycle: false,
            loading: true,
            mode: 'ricerca',
        }
    },
    created: function() {
        this.$emit('brand', "Ricerca")
        this.scrollToTop()
        window.addEventListener('scroll', () => {
            this.bottom = this.bottomVisible()
        })
        this.updateInfoArtisti()
    },
    components: {
        cardContainer,
        cardContainerArtisti,
        usersContainer,
    },
    methods: {
        snackMsg(msg) {
            this.$emit('login', msg)
        },
        scrollToTop() {
            window.scrollTo(0, 0)
        },
        checkDuplicati(albumId) {
            var trovato = false
            for (var j = 0; j < this.albums.length; j++) {
                if (this.albums != null) {
                    if (this.albums[j] != undefined) {
                        if (this.albums[j].albumId == albumId) {
                            trovato = true
                        }
                    }
                }
            }
            return trovato
        },
        bottomVisible() {
            const scrollY = window.scrollY
            const visible = document.documentElement.clientHeight
            const pageHeight = document.documentElement.scrollHeight - 200
            const bottomOfPage = visible + scrollY >= pageHeight
            return bottomOfPage || pageHeight < visible
        },
        //chiamata API agli artisti che coincidono con il parametro della route
        updateInfoArtisti() {
            var q = this.$route.params.q
            axios({
                url: 'https://api.deezer.com/search/artist?q=' + q + '&output=jsonp',
                adapter: jsonpAdapter,
            })
                .then(response => {
                    for (var x = 0; x < 12; x++) {
                        if (response.data.data[x] != undefined) {
                            var risultati2 = {
                                artistId: response.data.data[x].id,
                                name: response.data.data[x].name,
                                artistImage: response.data.data[x].picture_medium,
                            }
                            this.artisti.push(risultati2)
                        }
                    }
                })
                .catch(error => console.log(error))
                .finally(() => this.updateInfoAlbum())
        },
        //chiamata API agli album che coincidono con il parametro della route con scroll infinito
        updateInfoAlbum() {
            var q = this.$route.params.q
            if (this.stop == false) {
                axios({
                    url:
                        'https://api.deezer.com/search/album?q=' +
                        q +
                        '&index=' +
                        this.start +
                        '&output=jsonp',
                    adapter: jsonpAdapter,
                })
                    .then(response => {
                        var tmp = false
                        for (var i = 0; i < 25; i++) {
                            if (response.data.data[i] != undefined) {
                                var risultati = {
                                    id: i,
                                    title: response.data.data[i]['title'],
                                    cover: response.data.data[i]['cover_medium'],
                                    artist: response.data.data[i].artist['name'],
                                    albumId: response.data.data[i]['id'],
                                    albumLink: response.data.data[i]['link'], //questo non servirà poi, è solo per testare ora
                                    explicit: response.data.data[i]['explicit_lyrics'],
                                }
                                tmp = this.checkDuplicati(risultati.albumId)
                                if (tmp == false) {
                                    this.albums.push(risultati)
                                }
                            }
                        }
                        this.start = this.end
                        if (this.lastCycle == true) {
                            this.stop = true
                        } else {
                            if (response.data.total > this.end + 25) {
                                this.end += 25
                            } else {
                                this.end = response.data.total - 1
                                this.lastCycle = true
                            }
                        }
                    })
                    .catch(error => console.log(error))
                    .finally(() => this.updateInfoUsers())
            }
        },
        //preleva da firebase gli utenti trovati
        updateInfoUsers() {
            var q = this.$route.params.q
            var db = firebase.firestore()
            var userData = db.collection('utenti')
            var arr = this.utenti
            userData
                .where('username', '==', q)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        var usr = {
                            username: doc.data().username,
                            email: doc.id,
                        }
                        arr.push(usr)
                    })
                })
                .catch(function(error) {
                    console.log('Error getting documents: ', error)
                })
                .finally(() => (this.loading = false))
        },
    },
    watch: {
        bottom(bottom) {
            if (bottom && !this.loading) {
                this.updateInfoAlbum()
            }
        },
    },
}
</script>
