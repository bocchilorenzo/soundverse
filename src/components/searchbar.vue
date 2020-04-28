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
            arrayRisultati: [],
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
                    .get('https://api.deezer.com/search/album?q=' + q)
                    .then(response => {
                        for (var i = 0; i < 12; i++) {
                            var risultati = {
                                id: i,
                                title: response.data.data[i]['title'],
                                cover: response.data.data[i]['cover_medium'],
                                artist: response.data.data[i].artist['name'],
                                albumId: response.data.data[i]['id'],
                                albumLink: response.data.data[i]['link'], //questo non servirà poi, è solo per testare ora
                                explicit:
                                    response.data.data[i]['explicit_lyrics'],
                            }
                            this.arrayRisultati.push(risultati)
                        }
                        this.$emit('update', this.arrayRisultati)
                        this.arrayRisultati = []
                    })
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
