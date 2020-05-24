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
            console.log(this.user.email)
            var db = firebase.firestore()
            var userData = db.collection('utenti').doc(this.user.email)
            var arr = this.idArray
            userData
                .get()
                .then(function(doc) {
                    if (doc.exists && doc.data().ascoltati.length != 0) {
                        console.log('Document data:', doc.data().ascoltati)
                        for (let i = 0; i < doc.data().ascoltati.length; i++) {
                            var album = {
                                albumId: doc.data().ascoltati[i].idAlbum,
                            }
                            arr.push(album)
                        }
                    } else if (doc.data().ascoltati.length == 0) {
                        console.log('Non hai album ascoltati')
                    } else {
                        console.log('No such document!')
                    }
                })
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })
                .then(() => this.addAlbums())
            /*   var db = firebase.firestore()
            var ascoltatiColl = db.collection('ascoltati')
            var arr = this.idArray
            //aspettare la creazione dell'indice su firestore
            //pensare se meglio ordinare per titolo o timestamp
            ascoltatiColl
                .where('mail', '==', this.user.email)
                .orderBy('titolo')
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        var album = {
                            albumId: doc.data().idAlbum,
                        }
                        arr.push(album)
                    })
                })
                .catch(function(error) {
                    console.log('Impossibile recuperare i documenti: ', error)
                })
                .then(() => this.addAlbums())  */
            //Questo sarà per scrivere, lo lascio qua per ora
            /*
            ascoltatiColl.doc('SF').set({
                name: 'San Francisco',
                state: 'CA',
                country: 'USA',
                capital: false,
                population: 860000,
                regions: ['west_coast', 'norcal'],
            })
            */
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
