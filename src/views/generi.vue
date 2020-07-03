<template>
    <div>
        <v-container class="fill-width" fluid>
            <div v-if="this.loading">
                <v-row align="center" no-gutters>
                    <v-col v-for="n in 20" :key="n" lg="2" md="3" sm="4" class="pb-3 px-1 col-6">
                        <v-skeleton-loader class="mr-1" type="image"></v-skeleton-loader>
                    </v-col>
                </v-row>
            </div>
            <div v-else>
                <v-row align="center" no-gutters>
                    <v-col
                        v-for="genre in generiArray"
                        :key="genre.id"
                        lg="2"
                        md="3"
                        sm="4"
                        class="pb-3 px-1 col-6"
                    >
                        <v-card class="mx-auto" max-width="400" @click="selezionaGenere(genre.id)">
                            <v-img
                                class="white--text align-end"
                                height="200px"
                                :src="genre.picture"
                                alt="Immagine genere"
                                title="Immagine genere"
                            >
                                <v-card-title>{{ genre.name }}</v-card-title>
                            </v-img>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'

export default {
    name: 'generi',
    data() {
        return {
            generiArray: [],
            loading: true,
            start: 0,
            end: 25,
            stop: false,
        }
    },
    created: function() {
        this.$emit('toggleBurger', 'home')
        this.scrollToTop()
        this.addGenres()
        this.$emit('brand', 'Generi')
    },
    methods: {
        //Ricolloca lo scrolling all'inizio
        scrollToTop() {
            window.scrollTo(0, 0)
        },
        //Preleva i generi dalle API
        addGenres() {
            if (this.stop == false) {
                axios({
                    url: 'https://api.deezer.com/editorial?index=' + this.start + '&output=jsonp',
                    adapter: jsonpAdapter,
                })
                    .then(response => {
                        for (var i = 0; i < response.data.data.length; i++) {
                            if (response.data.data[i] != undefined) {
                                var genere = {
                                    id: response.data.data[i].id,
                                    name: response.data.data[i].name,
                                    picture: response.data.data[i].picture_medium,
                                }
                                this.generiArray.push(genere)
                            }
                        }
                        this.start = this.end
                        if (this.generiArray.length == 25) {
                            this.end += 25
                        } else {
                            this.stop = true
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.addGenres())
            } else {
                this.loading = false
            }
        },
        //Esegue la route al genere selezionato
        selezionaGenere(id) {
            this.$router.push({
                name: 'genere',
                params: { id: id },
            })
        },
    },
}
</script>
