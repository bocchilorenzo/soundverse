<template>
    <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Cerca album o artisti"
        v-model="input"
        @keyup.enter="
            search()
            $emit('update', arrayRisultati)
        "
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
                this.prevInput = this.input
                this.$router.push({ name: 'search', params: { q: this.input } })
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
