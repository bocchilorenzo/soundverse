<template>
    <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Cerca album o artisti"
        v-model="input"
        @keyup.enter="search()"
    />
</template>

<script>
import axios from 'axios'

export default {
    name: 'searchBar',
    data() {
        return {
            input: '',
            prevInput: '',
            arrayRisultatiAlbum: [],
            arrayRisultatiArtisti: [],
        }
    },
    methods: {
        search() {
            if (this.input != '' && this.prevInput != this.input) {
                var path = this.$route.params.q
                if (path != undefined) {
                    this.$router.replace({
                        name: 'search',
                        params: { q: this.input },
                    })
                } else {
                    this.$router.push({
                        name: 'search',
                        params: { q: this.input },
                    })
                }
                this.prevInput = this.input
                this.path = this.$route.params.q
                var q = this.$route.params.q
                console.log(q)
                axios
                    .all([
                        axios.get('https://api.deezer.com/search/album?q=' + q),
                        axios.get(
                            `https://api.deezer.com/search/artist?q=` + q
                        ),
                    ])
                    .then(
                        axios.spread((firstResponse, secondResponse) => {
                            for (var i = 0; i < 12; i++) {
                                var risultati = {
                                    id: i,
                                    title: firstResponse.data.data[i]['title'],
                                    cover:
                                        firstResponse.data.data[i][
                                            'cover_medium'
                                        ],
                                    artist:
                                        firstResponse.data.data[i].artist[
                                            'name'
                                        ],
                                    albumId: firstResponse.data.data[i]['id'],
                                    albumLink:
                                        firstResponse.data.data[i]['link'], //questo non servirà poi, è solo per testare ora
                                    explicit:
                                        firstResponse.data.data[i][
                                            'explicit_lyrics'
                                        ],
                                }
                                this.arrayRisultatiAlbum.push(risultati)
                            }
                            for (var x = 0; x < 12; x++) {
                                var risultati2 = {
                                    id: x,
                                    artistId: secondResponse.data.data[x].id,
                                    name: secondResponse.data.data[x].name,
                                    artistImage:
                                        secondResponse.data.data[x]
                                            .picture_medium,
                                }
                                this.arrayRisultatiArtisti.push(risultati2)
                            }
                            this.$emit(
                                'update',
                                this.arrayRisultatiAlbum,
                                this.arrayRisultatiArtisti
                            )

                            this.arrayRisultatiAlbum = []
                            this.arrayRisultatiArtisti = []
                        })
                    )
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
            } else {
                console.log('Query vuota')
            }
        },
    },
}
</script>

<style></style>
