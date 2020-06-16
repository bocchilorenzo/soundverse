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
            <div v-else-if="vuoto[0] != undefined" class="d-flex justify-center">
                <v-container
                    class="d-inline-flex justify-center flex-column align-center grey lighten-4"
                    style="border-radius: 50%; height:400px;width:400px; margin:10px"
                >
                    <svg style="width:150px;height:150px;" viewBox="0 0 24 24">
                        <path
                            fill="#3949AB"
                            d="M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H8V4H20M12.5,15A2.5,2.5 0 0,0 15,12.5V7H18V5H14V10.5C13.58,10.19 13.07,10 12.5,10A2.5,2.5 0 0,0 10,12.5A2.5,2.5 0 0,0 12.5,15M4,6H2V20A2,2 0 0,0 4,22H18V20H4"
                        />
                    </svg>
                    <p style="width: 60%; text-align: center">
                        Tutti gli album che aggiungerai verrano visualizzati qui
                    </p>
                </v-container>
            </div>
            <div v-else>
                <div v-if="nonLoggato" class="d-flex justify-center">
                    <v-container
                        class="d-inline-flex justify-center flex-column align-center grey lighten-4"
                        style="border-radius: 50%; height:400px;width:400px; margin:10px"
                    >
                        <svg style="width:150px;height:150px;" viewBox="0 0 24 24">
                            <path
                                fill="#3949AB"
                                d="M20 12V7H22V13H20M20 17H22V15H20M10 13C12.67 13 18 14.34 18 17V20H2V17C2 14.34 7.33 13 10 13M10 4A4 4 0 0 1 14 8A4 4 0 0 1 10 12A4 4 0 0 1 6 8A4 4 0 0 1 10 4M10 14.9C7.03 14.9 3.9 16.36 3.9 17V18.1H16.1V17C16.1 16.36 12.97 14.9 10 14.9M10 5.9A2.1 2.1 0 0 0 7.9 8A2.1 2.1 0 0 0 10 10.1A2.1 2.1 0 0 0 12.1 8A2.1 2.1 0 0 0 10 5.9Z"
                            />
                        </svg>
                        <p style="width: 60%; text-align: center">
                            Per visualizzare il contenuto di questa sezione effettua il login
                        </p>
                    </v-container>
                </div>
                <div v-else>
                    <cardContainer
                        :arrayRisultati="albumArray"
                        v-on:delete="rimuoviElemento"
                    ></cardContainer>
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
            vuoto: [],
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
            var empty = this.vuoto
            userData
                .get()
                .then(function(querySnapshot) {
                    if (querySnapshot.empty == true) {
                        empty.push({ vero: true })
                    } else {
                        querySnapshot.forEach(function(doc) {
                            // doc.data() is never undefined for query doc snapshots
                            var album = {
                                albumId: doc.id,
                            }
                            arr.push(album)
                        })
                    }
                })
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })
                .then(() => this.addAlbums())
        }
    },
    methods: {
        rimuoviElemento(id) {
            var i = 0
            while (i < this.albumArray.length) {
                if (this.albumArray[i].albumId == id) {
                    this.albumArray.splice(i, i + 1)
                    i = 0
                    if (this.albumArray.length == 0) {
                        this.vuoto.push({ vero: true })
                    }
                } else {
                    i++
                }
            }
            var x = 0
            while (i < this.idArray.length) {
                if (this.idArray[x].albumId == id) {
                    this.idArray.splice(x, x + 1)
                    x = 0
                } else {
                    x++
                }
            }
        },
        addAlbums() {
            if (this.vuoto[0] == undefined) {
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
            } else {
                this.loading = false
            }
        },
        bottomVisible() {
            const scrollY = window.scrollY
            const visible = document.documentElement.clientHeight
            const pageHeight = document.documentElement.scrollHeight - 200
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
