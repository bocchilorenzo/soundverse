<template>
    <div>
        <v-container v-if="type == 'ascoltati'" class="fill-width" fluid>
            <div v-if="this.loading">
                <v-row align="center" no-gutters>
                    <v-col v-for="n in 20" :key="n" lg="2" md="3" sm="4" class="pb-3 px-1 col-6">
                        <v-skeleton-loader class="mr-1" type="card"></v-skeleton-loader>
                    </v-col>
                </v-row>
            </div>
            <div v-else-if="vuoto[0] != undefined" class="d-flex justify-center">
                <v-container
                    class="d-inline-flex justify-center flex-column align-center"
                    style="border-radius: 50%; height:400px;width:400px; margin:10px"
                >
                    <svg style="width:150px;height:150px;" viewBox="0 0 24 24">
                        <path
                            fill="#ececec"
                            d="M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H8V4H20M12.5,15A2.5,2.5 0 0,0 15,12.5V7H18V5H14V10.5C13.58,10.19 13.07,10 12.5,10A2.5,2.5 0 0,0 10,12.5A2.5,2.5 0 0,0 12.5,15M4,6H2V20A2,2 0 0,0 4,22H18V20H4"
                        />
                    </svg>
                    <p
                        style="width: 60%; text-align: center"
                    >Tutti gli album che aggiungerai agli ascoltati verrano visualizzati qui.</p>
                </v-container>
            </div>
            <div v-else>
                <div v-if="nonLoggato" class="d-flex justify-center">
                    <v-container
                        class="d-inline-flex justify-center flex-column align-center"
                        style="border-radius: 50%; height:400px;width:400px; margin:10px"
                    >
                        <svg style="width:150px;height:150px;" viewBox="0 0 24 24">
                            <path
                                fill="#ececec"
                                d="M20 12V7H22V13H20M20 17H22V15H20M10 13C12.67 13 18 14.34 18 17V20H2V17C2 14.34 7.33 13 10 13M10 4A4 4 0 0 1 14 8A4 4 0 0 1 10 12A4 4 0 0 1 6 8A4 4 0 0 1 10 4M10 14.9C7.03 14.9 3.9 16.36 3.9 17V18.1H16.1V17C16.1 16.36 12.97 14.9 10 14.9M10 5.9A2.1 2.1 0 0 0 7.9 8A2.1 2.1 0 0 0 10 10.1A2.1 2.1 0 0 0 12.1 8A2.1 2.1 0 0 0 10 5.9Z"
                            />
                        </svg>
                        <p
                            style="width: 60%; text-align: center"
                        >Per visualizzare il contenuto di questa sezione effettua il login.</p>
                    </v-container>
                </div>
                <div v-else>
                    <cardContainer :arrayRisultati="albumArray" v-on:delete="rimuoviElemento"></cardContainer>
                </div>
            </div>
        </v-container>
        <v-container v-else-if="type == 'daAscoltare'" class="fill-width" fluid>
            <div v-if="this.loading">
                <v-row align="center" no-gutters>
                    <v-col v-for="n in 20" :key="n" lg="2" md="3" sm="4" class="pb-3 px-1 col-6">
                        <v-skeleton-loader class="mr-1" type="card"></v-skeleton-loader>
                    </v-col>
                </v-row>
            </div>
            <div v-else-if="vuoto[0] != undefined" class="d-flex justify-center">
                <v-container
                    class="d-inline-flex justify-center flex-column align-center"
                    style="border-radius: 50%; height:400px;width:400px; margin:10px"
                >
                    <svg style="width:150px;height:150px;" viewBox="0 0 24 24">
                        <path
                            fill="#ececec"
                            d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
                        />
                    </svg>
                    <p
                        style="width: 60%; text-align: center"
                    >Complimenti! Non hai nessun album da ascoltare.</p>
                </v-container>
            </div>
            <div v-else>
                <div v-if="nonLoggato" class="d-flex justify-center">
                    <v-container
                        class="d-inline-flex justify-center flex-column align-center"
                        style="border-radius: 50%; height:400px;width:400px; margin:10px"
                    >
                        <svg style="width:150px;height:150px;" viewBox="0 0 24 24">
                            <path
                                fill="#ececec"
                                d="M20 12V7H22V13H20M20 17H22V15H20M10 13C12.67 13 18 14.34 18 17V20H2V17C2 14.34 7.33 13 10 13M10 4A4 4 0 0 1 14 8A4 4 0 0 1 10 12A4 4 0 0 1 6 8A4 4 0 0 1 10 4M10 14.9C7.03 14.9 3.9 16.36 3.9 17V18.1H16.1V17C16.1 16.36 12.97 14.9 10 14.9M10 5.9A2.1 2.1 0 0 0 7.9 8A2.1 2.1 0 0 0 10 10.1A2.1 2.1 0 0 0 12.1 8A2.1 2.1 0 0 0 10 5.9Z"
                            />
                        </svg>
                        <p
                            style="width: 60%; text-align: center"
                        >Per visualizzare il contenuto di questa sezione effettua il login.</p>
                    </v-container>
                </div>
                <div v-else>
                    <cardContainer :arrayRisultati="albumArray" v-on:delete="rimuoviElemento"></cardContainer>
                </div>
            </div>
        </v-container>
        <v-container v-else class="fill-width" fluid>
            <div v-if="this.loading">
                <v-row align="center" no-gutters>
                    <v-col v-for="n in 20" :key="n" lg="2" md="3" sm="4" class="pb-3 px-1 col-6">
                        <v-skeleton-loader class="mr-1" type="card"></v-skeleton-loader>
                    </v-col>
                </v-row>
            </div>
            <div v-else-if="vuoto[0] != undefined" class="d-flex justify-center">
                <v-container
                    class="d-inline-flex justify-center flex-column align-center"
                    style="border-radius: 50%; height:400px;width:400px; margin:10px;"
                >
                    <svg style="width:150px;height:150px;" viewBox="0 0 24 24">
                        <path
                            fill="#ececec"
                            d="M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H8V4H20M12.5,15A2.5,2.5 0 0,0 15,12.5V7H18V5H14V10.5C13.58,10.19 13.07,10 12.5,10A2.5,2.5 0 0,0 10,12.5A2.5,2.5 0 0,0 12.5,15M4,6H2V20A2,2 0 0,0 4,22H18V20H4"
                        />
                    </svg>
                    <p
                        style="width: 60%; text-align: center"
                    >Tutti gli album che aggiungerai ai preferiti verrano visualizzati qui.</p>
                </v-container>
            </div>
            <div v-else>
                <div v-if="nonLoggato" class="d-flex justify-center">
                    <v-container
                        class="d-inline-flex justify-center flex-column align-center"
                        style="border-radius: 50%; height:400px;width:400px; margin:10px"
                    >
                        <svg style="width:150px;height:150px;" viewBox="0 0 24 24">
                            <path
                                fill="#ececec"
                                d="M20 12V7H22V13H20M20 17H22V15H20M10 13C12.67 13 18 14.34 18 17V20H2V17C2 14.34 7.33 13 10 13M10 4A4 4 0 0 1 14 8A4 4 0 0 1 10 12A4 4 0 0 1 6 8A4 4 0 0 1 10 4M10 14.9C7.03 14.9 3.9 16.36 3.9 17V18.1H16.1V17C16.1 16.36 12.97 14.9 10 14.9M10 5.9A2.1 2.1 0 0 0 7.9 8A2.1 2.1 0 0 0 10 10.1A2.1 2.1 0 0 0 12.1 8A2.1 2.1 0 0 0 10 5.9Z"
                            />
                        </svg>
                        <p
                            style="width: 60%; text-align: center"
                        >Per visualizzare il contenuto di questa sezione effettua il login.</p>
                    </v-container>
                </div>
                <div v-else>
                    <cardContainer :arrayRisultati="albumArray" v-on:delete="rimuoviElemento"></cardContainer>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
import firebase from 'firebase'
import cardContainer from '../components/cardcontainer'

export default {
    name: 'albumUtente',
    data() {
        return {
            albumArray: [],
            idArray: [],
            loading: true,
            nonLoggato: false,
            user: JSON.parse(localStorage.getItem('user')),
            bottom: false,
            start: 0,
            end: 30,
            stop: false,
            lastCycle: false,
            vuoto: [],
            type: this.$route.name,
        }
    },
    components: {
        cardContainer,
    },
    created: function() {
        this.scrollToTop()
        window.addEventListener('scroll', () => {
            this.bottom = this.bottomVisible()
        })
        if (this.user == null) {
            this.nonLoggato = true
            this.loading = false
        } else {
            /*  var coll = ''
            if (this.mode == '1') {
                coll = 'ascoltati'
            } else if (this.mode == '2') {
                coll = 'daAscoltare'
            } else {
                coll = 'preferiti'
            }   */
            var db = firebase.firestore()
            var userData = db
                .collection('utenti')
                .doc(this.user.email)
                .collection(this.type)
                .orderBy('titolo')
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
                            console.log(doc.id, ' => ', doc.data())
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
                    if (this.idArray.length < 15) {
                        this.end = this.idArray.length
                        this.lastCycle = true
                    }
                    for (var i = this.start; i < this.end; i++) {
                        if (this.idArray[i].albumId != undefined) {
                            var album = {
                                title: this.idArray[i].titolo,
                                artist: this.idArray[i].artista,
                                albumId: this.idArray[i].albumId,
                                cover: this.idArray[i].cover,
                            }
                            this.albumArray.push(album)
                        }
                    }
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
                    /*
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
                                        title: response.data.title,
                                        cover: response.data.cover_medium,
                                        artist: response.data.artist.name,
                                        albumId: response.data.id,
                                    }
                                    this.albumArray.push(album)
                                    this.albumArray.sort(this.compareValues('title'))
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                        }
                    }
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
                    */
                    this.loading = false
                }
            } else {
                this.loading = false
            }
        },
        compareValues(key, order = 'asc') {
            return function innerSort(a, b) {
                const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]
                const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key]

                let comparison = 0
                if (varA > varB) {
                    comparison = 1
                } else if (varA < varB) {
                    comparison = -1
                }
                return order === 'desc' ? comparison * -1 : comparison
            }
        },
        bottomVisible() {
            const scrollY = window.scrollY
            const visible = document.documentElement.clientHeight
            const pageHeight = document.documentElement.scrollHeight - 200
            const bottomOfPage = visible + scrollY >= pageHeight
            return bottomOfPage || pageHeight < visible
        },
        scrollToTop() {
            window.scrollTo(0, 0)
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

<style></style>
