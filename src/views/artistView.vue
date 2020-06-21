<template>
    <!--
    <v-app id="inspire">
        <v-content class="pa-0">
            <v-container class="fill-height" fluid>
                <v-row v-if="this.loading" align="center" justify="center">
                    <v-col
                        cols="1"
                        class="text-center"
                        style="height: 100vh; display: flex; align-items:center;"
                    >
                        <v-progress-circular :size="70" :width="7" color="indigo" indeterminate></v-progress-circular>
                    </v-col>
                </v-row>
                <v-row v-else>
                    <v-col cols="2">
                        <v-row id="sticky">
                            <v-img
                                class="align-end"
                                :src="artistInfo[0].picture"
                                contain
                                style="width:200px"
                            ></v-img>
                            <h1 display="inline-block">{{ artistInfo[0].name }}</h1>
                            <p display="inline-block">
                                Numero album:
                                {{ artistInfo[0].albumNumber }}
                            </p>
                        </v-row>
                    </v-col>
                    <v-col cols="8">
                        <v-row align="center">
                            <v-col
                                v-for="album in albums"
                                :key="album.albumId"
                                cols="12"
                                sm="4"
                                lg="3"
                                xl="2"
                            >
                                <v-row justify="center">
                                    <albumCard :albumArray="album" :id="album.albumId" />
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="2" v-if="caricatiSimili == true">
                        <v-row no-gutters justify="center">
                            <v-col v-for="artista in simili" :key="artista.artistId">
                                <router-link
                                    :to="{
                                        name: 'artist',
                                        path: '/artist/:artista',
                                        params: { artista: artista.artistId },
                                        props: true,
                                    }"
                                >
                                    <artistCard :artistArray="artista" :id="artista.artistId" />
                                </router-link>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
    -->
    <v-container class="fill-width" fluid>
        <div v-if="this.loading">
            <div class="centrata" style="width: 80%">
                <v-row class="ma-2">
                    <div
                        v-if="this.$vuetify.breakpoint.name == 'xs' || this.$vuetify.breakpoint.name == 'sm'"
                        class="centrata"
                        style="width: 300px"
                    >
                        <v-skeleton-loader ref="skeleton" type="image" width="300px" class="mx-0"></v-skeleton-loader>
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
        <v-row v-else>
            <v-col sm="10" md="9" class="centrata">
                <v-row>
                    <v-col lg="3" sm="4" md="3">
                        <v-img
                            class="align-center rounded centrata"
                            :src="artistInfo[0].picture"
                            width="90%"
                        ></v-img>
                        <div
                            v-if="this.$vuetify.breakpoint.name != 'xs' && this.$vuetify.breakpoint.name != 'sm'"
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
                        </div>
                    </v-col>
                    <v-col
                        v-if="this.$vuetify.breakpoint.name == 'xs' || this.$vuetify.breakpoint.name == 'sm'"
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
                        v-if="this.$vuetify.breakpoint.name != 'xs' && this.$vuetify.breakpoint.name != 'sm' && caricatiSimili == true"
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
                v-if="this.$vuetify.breakpoint.name == 'xs' || this.$vuetify.breakpoint.name == 'sm' && caricatiSimili == true"
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
                        <cardContainer :arrayRisultati="albums" />
                    </v-col>
                </v-row>
                <v-row v-else no-gutters>
                    <h2 class="px-1">Album</h2>
                    <v-col class="col-12">
                        <cardContainer :arrayRisultati="albums" />
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
        }
    },
    components: {
        cardContainerArtisti,
        cardContainer,
    },
    created: function() {
        this.scrollToTop()
        this.id = this.$route.params.artista
        window.addEventListener('scroll', () => {
            this.bottom = this.bottomVisible()
        })
        this.updateInfoArtista()
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0, 0)
        },
        aggiorna() {
            this.id = this.$route.params.artista
            this.updateInfoArtista()
        },
        bottomVisible() {
            const scrollY = window.scrollY
            const visible = document.documentElement.clientHeight
            const pageHeight = document.documentElement.scrollHeight - 200
            const bottomOfPage = visible + scrollY >= pageHeight
            return bottomOfPage || pageHeight < visible
        },
        updateInfoArtista() {
            if (this.stop == false) {
                axios({
                    url: 'https://api.deezer.com/artist/' + this.id + '&output=jsonp',
                    adapter: jsonpAdapter,
                })
                    .then(response => {
                        var artistData = {
                            name: response.data.name,
                            picture: response.data.picture_big,
                            albumNumber: response.data.nb_album,
                        }
                        this.artistInfo.push(artistData)
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
                                for (var i = 0; i < 5; i++) {
                                    var artistData2 = {
                                        name: response.data.artist.similar.artist[i].name,
                                    }
                                    this.simili.push(artistData2)
                                }
                            })
                            .catch(error => console.log(error))
                            .finally(() => this.updateSimili())
                    })
                    .catch(error => console.log(error))
                    .finally(() => this.updateInfoAlbum())
            }
        },
        updateSimili() {
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
        },
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
                        for (var i = 0; i < 25; i++) {
                            if (response.data.data[i] != undefined) {
                                var albumsData = {
                                    title: response.data.data[i].title,
                                    cover: response.data.data[i].cover_medium,
                                    artist: this.artistInfo.name,
                                    albumId: response.data.data[i].id,
                                    albumLink: response.data.data[i].link, //questo non servirà poi, è solo per testare ora
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
