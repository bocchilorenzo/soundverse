<template>
    <div>
        <v-container class="fill-width" fluid>
            <div v-if="this.loading">
                <v-row>
                    <v-col>
                        <v-sheet>
                            <v-skeleton-loader
                                class="mx-3"
                                width="200"
                                type="card"
                            ></v-skeleton-loader>
                        </v-sheet>
                    </v-col>
                    <v-col>
                        <v-sheet>
                            <v-skeleton-loader
                                class="mx-3"
                                width="200"
                                type="card"
                            ></v-skeleton-loader>
                        </v-sheet>
                    </v-col>
                    <v-col>
                        <v-sheet>
                            <v-skeleton-loader
                                class="mx-3"
                                width="200"
                                type="card"
                            ></v-skeleton-loader>
                        </v-sheet>
                    </v-col>
                    <v-col>
                        <v-sheet>
                            <v-skeleton-loader
                                class="mx-3"
                                width="200"
                                type="card"
                            ></v-skeleton-loader>
                        </v-sheet>
                    </v-col>
                    <v-col>
                        <v-sheet>
                            <v-skeleton-loader
                                class="mx-3"
                                width="200"
                                type="card"
                            ></v-skeleton-loader>
                        </v-sheet>
                    </v-col>
                    <v-col>
                        <v-sheet>
                            <v-skeleton-loader
                                class="mx-3"
                                width="200"
                                type="card"
                            ></v-skeleton-loader>
                        </v-sheet>
                    </v-col>
                    <v-col>
                        <v-sheet>
                            <v-skeleton-loader
                                class="mx-3"
                                width="200"
                                type="card"
                            ></v-skeleton-loader>
                        </v-sheet>
                    </v-col>
                    <v-col>
                        <v-sheet>
                            <v-skeleton-loader
                                class="mx-3"
                                width="200"
                                type="card"
                            ></v-skeleton-loader>
                        </v-sheet>
                    </v-col>
                    <v-col>
                        <v-sheet>
                            <v-skeleton-loader
                                class="mx-3"
                                width="200"
                                type="card"
                            ></v-skeleton-loader>
                        </v-sheet>
                    </v-col>
                    <v-col>
                        <v-sheet>
                            <v-skeleton-loader
                                class="mx-3"
                                width="200"
                                type="card"
                            ></v-skeleton-loader>
                        </v-sheet>
                    </v-col>
                    <v-col>
                        <v-sheet>
                            <v-skeleton-loader
                                class="mx-3"
                                width="200"
                                type="card"
                            ></v-skeleton-loader>
                        </v-sheet>
                    </v-col>
                    <v-col>
                        <v-sheet>
                            <v-skeleton-loader
                                class="mx-3"
                                width="200"
                                type="card"
                            ></v-skeleton-loader>
                        </v-sheet>
                    </v-col>
                    <v-col>
                        <v-sheet>
                            <v-skeleton-loader
                                class="mx-3"
                                width="200"
                                type="card"
                            ></v-skeleton-loader>
                        </v-sheet>
                    </v-col>
                    <v-col>
                        <v-sheet>
                            <v-skeleton-loader
                                class="mx-3"
                                width="200"
                                type="card"
                            ></v-skeleton-loader>
                        </v-sheet>
                    </v-col>
                </v-row>
            </div>
            <div v-else>
                <div v-if="nonLoggato">
                    <p>Non sei loggato</p>
                </div>
                <div v-else>
                    <cardContainer :arrayRisultati="albumArray"></cardContainer>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
import firebase from 'firebase'
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'
import cardContainer from '../components/cardcontainer'

export default {
    name: 'ascoltati',
    data() {
        return {
            albumArray: [],
            idArray: [],
            loading: true,
            nonLoggato: false,
            user: this.$store.state.user,
            bottom: false,
            start: 0,
            end: 30,
            stop: false,
            lastCycle: false,
        }
    },
    components: {
        cardContainer,
    },
    created: function() {
        window.addEventListener('scroll', () => {
            this.bottom = this.bottomVisible()
        })
        if (this.user == null) {
            this.nonLoggato = true
            this.loading = false
        } else {
            var db = firebase.firestore()
            var userData = db
                .collection('utenti')
                .doc(this.user.email)
                .collection('ascoltati')
            var arr = this.idArray
            userData
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, ' => ', doc.data())
                        var album = {
                            albumId: doc.id,
                        }
                        arr.push(album)
                    })
                })
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })
                .then(() => this.addAlbums())
        }
    },
    methods: {
        addAlbums() {
            if (this.stop == false) {
                for (var i = this.start; i < this.end; i++) {
                    if (this.idArray[i] != undefined) {
                        axios({
                            url:
                                'https://api.deezer.com/album/' +
                                this.idArray[i].albumId +
                                '&output=jsonp',
                            adapter: jsonpAdapter,
                        })
                            .then(response => {
                                var album = {
                                    id: i,
                                    title: response.data.title,
                                    cover: response.data.cover_medium,
                                    artist: response.data.artist.name,
                                    albumId: response.data.id,
                                    albumLink: response.data.link, //questo non servirà poi, è solo per testare ora
                                }
                                this.albumArray.push(album)
                                this.start = this.end
                                if (this.lastCycle == true) {
                                    this.stop = true
                                } else {
                                    if (this.idArray.length > this.end + 30) {
                                        this.end += 30
                                    } else {
                                        this.end = this.idArray.length - 1
                                        this.lastCycle = true
                                    }
                                }
                            })
                            .catch(error => {
                                console.log(error)
                            })
                            .finally(() => (this.loading = false))
                    }
                }
            }
        },
        bottomVisible() {
            const scrollY = window.scrollY
            const visible = document.documentElement.clientHeight
            const pageHeight = document.documentElement.scrollHeight
            const bottomOfPage = visible + scrollY >= pageHeight
            return bottomOfPage || pageHeight < visible
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
