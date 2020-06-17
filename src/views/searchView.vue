<template>
    <div>
        <div v-if="loading == true">
            <v-tabs
                v-model="tab"
                background-color="indigo"
                class="elevation-2"
                dark
                :centered="centered"
                :grow="grow"
            >
                <v-tabs-slider></v-tabs-slider>
                <v-tab>Album</v-tab>
                <v-tab>Artisti</v-tab>
                <v-tab>Utenti</v-tab>
                <v-tab-item style="background-color: none">
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
                        <v-col v-for="n in 6" :key="n" class="pb-3 px-1 col-12">
                            <v-skeleton-loader class="mx-2" type="list-item"></v-skeleton-loader>
                        </v-col>
                    </v-row>
                </v-tab-item>
            </v-tabs>
        </div>
        <div v-else>
            <v-tabs
                v-model="tab"
                background-color="indigo"
                class="elevation-2"
                dark
                :centered="centered"
                :grow="grow"
            >
                <v-tabs-slider></v-tabs-slider>
                <!--Per ogni tab-item mettere lo stato empty-->
                <v-tab>Album</v-tab>
                <v-tab>Artisti</v-tab>
                <v-tab>Utenti</v-tab>
                <v-tab-item>
                    <cardContainer :arrayRisultati="albums"></cardContainer>
                </v-tab-item>
                <v-tab-item>
                    <cardContainerArtisti :arrayRisultati="artisti"></cardContainerArtisti>
                </v-tab-item>
                <v-tab-item>
                    <usersContainer :arrayRisultati="utenti"></usersContainer>
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
        }
    },
    created: function() {
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
