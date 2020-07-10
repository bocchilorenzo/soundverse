<template>
    <v-container class="fill-width" fluid>
        <div v-if="this.loading">
            <div class="centrata" style="width: 80%">
                <v-row class="ma-2">
                    <div
                        v-if="
                            this.$vuetify.breakpoint.name == 'xs' ||
                                this.$vuetify.breakpoint.name == 'sm'
                        "
                        class="centrata"
                        style="width: 100%"
                    >
                        <v-skeleton-loader
                            ref="skeleton"
                            type="image"
                            width="100%"
                            max-width="300px"
                            class="mx-0"
                        ></v-skeleton-loader>
                    </div>
                    <div v-else class="d-flex flex-row">
                        <v-skeleton-loader ref="skeleton" type="image" width="300px" class="mx-0"></v-skeleton-loader>
                        <v-row class="ml-3 pt-2 d-flex flex-row" align="center">
                            <v-col class="ma-2 col-12">
                                <v-skeleton-loader
                                    ref="skeleton"
                                    type="heading"
                                    width="100%"
                                    class="mx-0"
                                ></v-skeleton-loader>
                            </v-col>
                            <v-col
                                v-for="n in 5"
                                :key="n"
                                xl="2"
                                lg="2"
                                md="3"
                                sm="4"
                                class="pb-3 px-1 col-6"
                                style="margin:0 auto"
                            >
                                <v-skeleton-loader
                                    type="image"
                                    style="border-radius: 100%;"
                                    height="100px"
                                    width="100px"
                                ></v-skeleton-loader>
                            </v-col>
                        </v-row>
                    </div>
                </v-row>
                <v-row class="ma-2">
                    <v-skeleton-loader ref="skeleton" type="heading" width="50em" class="mx-0"></v-skeleton-loader>
                </v-row>
                <v-row class="ma-2">
                    <v-skeleton-loader ref="skeleton" type="heading" width="50em" class="mx-0"></v-skeleton-loader>
                </v-row>
                <br />
                <v-row
                    class="ma-2"
                    v-if="
                        this.$vuetify.breakpoint.name == 'xs' ||
                            this.$vuetify.breakpoint.name == 'sm'
                    "
                >
                    <v-col class="col-12 pa-0">
                        <v-skeleton-loader type="list-item"></v-skeleton-loader>
                    </v-col>
                </v-row>
                <br
                    v-if="
                        this.$vuetify.breakpoint.name == 'xs' ||
                            this.$vuetify.breakpoint.name == 'sm'
                    "
                />
                <v-row class="ma-2">
                    <v-skeleton-loader ref="skeleton" type="text" width="100px" class="mx-0"></v-skeleton-loader>
                </v-row>
                <v-row align="center" no-gutters>
                    <v-col v-for="n in 6" :key="n" lg="2" md="3" sm="4" class="pb-3 px-1 col-6">
                        <v-skeleton-loader class="mr-1" type="card"></v-skeleton-loader>
                    </v-col>
                </v-row>
                <br />
                <br />
            </div>
        </div>
        <div v-else-if="esiste.esiste == false" class="d-flex justify-center">
            <v-container
                class="d-inline-flex justify-center flex-column align-center"
                style="border-radius: 50%; height:400px;width:400px; margin:10px"
            >
                <svg style="width:80%;max-width:150px;max-height:150px" viewBox="0 0 24 24">
                    <path
                        fill="#2d96c8"
                        d="M15,14C17.67,14 23,15.33 23,18V20H7V18C7,15.33 12.33,14 15,14M15,12A4,4 0 0,1 11,8A4,4 0 0,1 15,4A4,4 0 0,1 19,8A4,4 0 0,1 15,12M5,9.59L7.12,7.46L8.54,8.88L6.41,11L8.54,13.12L7.12,14.54L5,12.41L2.88,14.54L1.46,13.12L3.59,11L1.46,8.88L2.88,7.46L5,9.59Z"
                    />
                </svg>
                <p style="width: 60%; text-align: center">Artista inesistente</p>
            </v-container>
        </div>
        <v-row v-else>
            <v-col sm="10" md="9" class="centrata">
                <v-row>
                    <v-col lg="3" sm="4" md="3">
                        <v-img
                            class="align-center rounded centrata"
                            :src="artistInfo[0].picture"
                            width="90%"
                            alt="Immagine artista"
                            :title="artistInfo[0].name"
                        ></v-img>
                        <div
                            v-if="
                                this.$vuetify.breakpoint.name != 'xs' &&
                                    this.$vuetify.breakpoint.name != 'sm'
                            "
                            class="centrata"
                            style="width:90%"
                        >
                            <h1>{{ artistInfo[0].name }}</h1>
                            <ul class="info-list">
                                <li class="infoAlbumMain">
                                    Numero album:
                                    {{ artistInfo[0].albumNumber }}
                                </li>
                            </ul>
                            <a target="_blank" :href="artistInfo[0].share">
                                <v-img
                                    v-if="this.$vuetify.theme.dark"
                                    src="../assets/light.png"
                                    class="align-center"
                                    style="margin:1em auto 0;"
                                    width="40%"
                                    min-width="18px"
                                    alt="Ascolta su Deezer"
                                    title="Ascolta su Deezer"
                                ></v-img>
                                <v-img
                                    v-else
                                    src="../assets/dark.png"
                                    class="align-center"
                                    style="margin:1em auto 0;"
                                    width="40%"
                                    min-width="18px"
                                    alt="Ascolta su Deezer"
                                    title="Ascolta su Deezer"
                                ></v-img>
                            </a>
                        </div>
                    </v-col>
                    <v-col
                        v-if="
                            this.$vuetify.breakpoint.name == 'xs' ||
                                this.$vuetify.breakpoint.name == 'sm'
                        "
                        lg="5"
                        sm="3"
                        md="5"
                        class="d-flex justify-end align-start flex-column col-12"
                    >
                        <h1>{{ artistInfo[0].name }}</h1>
                        <ul class="info-list">
                            <li class="infoAlbumMain">
                                Numero album:
                                {{ artistInfo[0].albumNumber }}
                            </li>
                        </ul>
                    </v-col>
                    <v-col
                        v-if="
                            this.$vuetify.breakpoint.name != 'xs' &&
                                this.$vuetify.breakpoint.name != 'sm' &&
                                caricatiSimili == true
                        "
                        lg="9"
                        sm="8"
                        md="9"
                        align-self="center"
                    >
                        <h2>Artisti simili</h2>
                        <cardContainerArtisti :arrayRisultati="simili" :mode="mode" />
                    </v-col>
                </v-row>
            </v-col>
            <v-col
                v-if="
                    this.$vuetify.breakpoint.name == 'xs' ||
                        (this.$vuetify.breakpoint.name == 'sm' && caricatiSimili == true)
                "
                sm="10"
                md="9"
                class="col-12 centrata"
            >
                <v-row no-gutters justify="center">
                    <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-header>Artisti simili</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-col class="col-12">
                                    <cardContainerArtisti :arrayRisultati="simili" :mode="mode" />
                                </v-col>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-row>
            </v-col>
            <v-col sm="10" md="9" class="centrata">
                <v-row v-if="this.$vuetify.breakpoint.name == 'xs'" no-gutters justify="center">
                    <h2>Album</h2>
                    <v-col class="col-12">
                        <cardContainer :arrayRisultati="albums" v-on:login="snackMsg" />
                    </v-col>
                </v-row>
                <v-row v-else no-gutters>
                    <h2 class="px-1">Album</h2>
                    <v-col class="col-12">
                        <cardContainer :arrayRisultati="albums" v-on:login="snackMsg" />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'
import cardContainerArtisti from '../components/cardcontainerartisti'
import cardContainer from '../components/cardcontainer'
export default {
    name: 'artistView',
    data() {
        return {
            artistInfo: [],
            albums: [],
            id: '',
            bottom: false,
            start: 0,
            end: 25,
            stop: false,
            lastCycle: false,
            loading: true,
            simili: [],
            caricatiSimili: false,
            mode: 'artista',
            esiste: { esiste: true },
        }
    },
    components: {
        cardContainerArtisti,
        cardContainer,
    },
    created: function() {
        this.$emit('toggleBurger', 'freccia')
        this.$emit('brand', '')
        this.scrollToTop()
        this.id = this.$route.params.artista
        //EventListener per attivare lo scrolling infinito
        window.addEventListener('scroll', () => {
            this.bottom = this.bottomVisible()
        })
        this.updateInfoArtista()
    },
    methods: {
        snackMsg(msg) {
            this.$emit('login', msg)
        },
        //Ricolloca lo scrolling all'inizio
        scrollToTop() {
            window.scrollTo(0, 0)
        },
        //Controllo se si è arrivati o meno alla fine della pagina
        bottomVisible() {
            const scrollY = window.scrollY
            const visible = document.documentElement.clientHeight
            const pageHeight = document.documentElement.scrollHeight - 200
            const bottomOfPage = visible + scrollY >= pageHeight
            return bottomOfPage || pageHeight < visible
        },
        //Preleva le informazioni dell'artista dalle API
        updateInfoArtista() {
            if (this.stop == false) {
                axios({
                    url: 'https://api.deezer.com/artist/' + this.id + '&output=jsonp',
                    adapter: jsonpAdapter,
                })
                    .then(response => {
                        if (response.data.error == undefined) {
                            var artistData = {
                                name: response.data.name,
                                picture: response.data.picture_big,
                                albumNumber: response.data.nb_album,
                                share: response.data.share,
                            }
                            this.artistInfo.push(artistData)
                            //Vecchio metodo per prelevare i correlati dalle api, restituisce CORS quindi abbiamo deciso di usare altre API
                            /*
                            axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
                            axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
                            axios
                                .get(
                                    'https://api.deezer.com/artist/' + this.id + '/related&output=jsonp'
                                )
                                .then(response2 => {
                                    for (var i = 0; i < 5; i++) {
                                        var artistData2 = {
                                            artistId: response2.data.data[i].id,
                                            name: response2.data.data[i].name,
                                            artistImage: response2.data.data[i].picture_medium,
                                        }
                                        this.simili.push(artistData2)
                                    }
                                })
                                .catch(error => console.log(error))
                                .finally(() => (this.caricatiSimili = true))
                            */
                            var nome = this.artistInfo[0].name
                            nome = encodeURIComponent(nome.trim())
                            axios
                                .get(
                                    'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' +
                                        nome +
                                        '&api_key=008dd2405a84da9505c1b2dd4dffd5e4&format=json'
                                )
                                .then(response => {
                                    if (response.data.artist.similar.artist.length != 0) {
                                        for (var i = 0; i < 5; i++) {
                                            var artistData2 = {
                                                name: response.data.artist.similar.artist[i].name,
                                            }
                                            this.simili.push(artistData2)
                                        }
                                    }
                                })
                                .catch(error => console.log(error))
                                .finally(() => this.updateSimili())
                        } else {
                            this.esiste.esiste = false
                        }
                    })
                    .catch(error => console.log(error))
                    .finally(() => this.updateInfoAlbum())
            }
        },
        //Preleva le informazioni per gli artisti simili dalle API, confronta i dati delle due API per sapere se tenere o meno un artista
        updateSimili() {
            if (this.simili.length != 0) {
                axios
                    .all([
                        axios({
                            url:
                                'https://api.deezer.com/search/artist?q=' +
                                this.simili[0].name +
                                '&output=jsonp',
                            adapter: jsonpAdapter,
                        }),
                        axios({
                            url:
                                'https://api.deezer.com/search/artist?q=' +
                                this.simili[1].name +
                                '&output=jsonp',
                            adapter: jsonpAdapter,
                        }),
                        axios({
                            url:
                                'https://api.deezer.com/search/artist?q=' +
                                this.simili[2].name +
                                '&output=jsonp',
                            adapter: jsonpAdapter,
                        }),
                        axios({
                            url:
                                'https://api.deezer.com/search/artist?q=' +
                                this.simili[3].name +
                                '&output=jsonp',
                            adapter: jsonpAdapter,
                        }),
                        axios({
                            url:
                                'https://api.deezer.com/search/artist?q=' +
                                this.simili[4].name +
                                '&output=jsonp',
                            adapter: jsonpAdapter,
                        }),
                    ])
                    .then(
                        axios.spread(
                            (
                                firstResponse,
                                secondResponse,
                                thirdResponse,
                                fourthResponse,
                                fifthResponse
                            ) => {
                                for (let h = 0; h < 25; h++) {
                                    if (firstResponse.data.data[h] != undefined) {
                                        if (
                                            this.simili[0].name.toUpperCase() ==
                                            firstResponse.data.data[h].name.toUpperCase()
                                        ) {
                                            this.simili[0].artistId = firstResponse.data.data[h].id
                                            this.simili[0].artistImage =
                                                firstResponse.data.data[h].picture_medium
                                            break
                                        }
                                    }
                                }
                                for (let h = 0; h < 25; h++) {
                                    if (secondResponse.data.data[h] != undefined) {
                                        if (
                                            this.simili[1].name.toUpperCase() ==
                                            secondResponse.data.data[h].name.toUpperCase()
                                        ) {
                                            this.simili[1].artistId = secondResponse.data.data[h].id
                                            this.simili[1].artistImage =
                                                secondResponse.data.data[h].picture_medium
                                            break
                                        }
                                    }
                                }
                                for (let h = 0; h < 25; h++) {
                                    if (thirdResponse.data.data[h] != undefined) {
                                        if (
                                            this.simili[2].name.toUpperCase() ==
                                            thirdResponse.data.data[h].name.toUpperCase()
                                        ) {
                                            this.simili[2].artistId = thirdResponse.data.data[h].id
                                            this.simili[2].artistImage =
                                                thirdResponse.data.data[h].picture_medium
                                            break
                                        }
                                    }
                                }
                                for (let h = 0; h < 25; h++) {
                                    if (fourthResponse.data.data[h] != undefined) {
                                        if (
                                            this.simili[3].name.toUpperCase() ==
                                            fourthResponse.data.data[h].name.toUpperCase()
                                        ) {
                                            this.simili[3].artistId = fourthResponse.data.data[h].id
                                            this.simili[3].artistImage =
                                                fourthResponse.data.data[h].picture_medium
                                            break
                                        }
                                    }
                                }
                                for (let h = 0; h < 25; h++) {
                                    if (fifthResponse.data.data[h] != undefined) {
                                        if (
                                            this.simili[4].name.toUpperCase() ==
                                            fifthResponse.data.data[h].name.toUpperCase()
                                        ) {
                                            this.simili[4].artistId = fifthResponse.data.data[h].id
                                            this.simili[4].artistImage =
                                                fifthResponse.data.data[h].picture_medium
                                            break
                                        }
                                    }
                                }
                            }
                        )
                    )
                    .then(() => this.rimuoviVuoti())
                    .catch(error => console.log(error))
                    .finally(() => (this.caricatiSimili = true))
            }
        },
        //Se un artista non è stato trovato su Deezer, viene rimosso dall'array
        rimuoviVuoti() {
            var i = 0
            while (i < this.simili.length) {
                if (this.simili[i].artistId == undefined) {
                    this.simili.splice(i, i + 1)
                    i = 0
                } else {
                    i++
                }
            }
        },
        //Chiama gli album dell'artista con scroll infinito
        updateInfoAlbum() {
            if (this.stop == false) {
                axios({
                    url:
                        'https://api.deezer.com/artist/' +
                        this.id +
                        '/albums?index=' +
                        this.start +
                        '&output=jsonp',
                    adapter: jsonpAdapter,
                })
                    .then(response => {
                        var artist = this.artistInfo[0]
                        for (var i = 0; i < 25; i++) {
                            if (response.data.data[i] != undefined) {
                                var albumsData = {
                                    title: response.data.data[i].title,
                                    cover: response.data.data[i].cover_medium,
                                    artist: artist.name,
                                    albumId: response.data.data[i].id,
                                    albumLink: response.data.data[i].link,
                                }
                                this.albums.push(albumsData)
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
                    .finally(() => (this.loading = false))
            }
        },
    },
    //Ogni volta che si raggiunge il fondo vengono aggiunti altri album
    watch: {
        bottom(bottom) {
            if (bottom) {
                this.updateInfoAlbum()
            }
        },
    },
}
</script>
<style scoped>
#sticky {
    position: sticky;
    top: 64px;
}
.info-list {
    list-style: none;
    direction: ltr;
    margin: 0;
    padding: 0;
}
.infoAlbum,
.infoAlbumMain {
    display: inline-block;
}
.infoAlbum::before {
    content: '·';
    margin: 0 4px;
}
.rounded {
    border-radius: 0.5em;
}
.centrata {
    margin: 0 auto;
}
.zeroMargine {
    margin-bottom: 0;
}
</style>
