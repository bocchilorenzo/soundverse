<template>
    <v-app id="inspire">
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col
                        v-if="this.loading"
                        cols="1"
                        class="text-center"
                        style="height: 100vh; display: flex; align-items:center;"
                    >
                        <v-progress-circular :size="70" :width="7" color="indigo" indeterminate></v-progress-circular>
                    </v-col>
                    <v-col v-else cols="12" sm="8" md="4">
                        <!--mettere un v-if che se è undefined mostra "album non esistente", altrimenti mostra i dati dell'album-->
                        <!--dividere in un componente separato-->
                        <v-card v-if="artistInfo[0] != undefined" class="elevation-12">
                            <v-card-text>
                                <p
                                    class="text-center font-weight-bold"
                                    display="inline-block"
                                >{{ artistInfo[0].name }}</p>
                                <v-img class="align-end" :src="artistInfo[0].picture" width="100%"></v-img>
                                <p class="text-left font-weight-normal" display="inline-block">
                                    Numero album:
                                    {{ artistInfo[0].albumNumber }}
                                </p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import axios from 'axios'
export default {
    name: 'artistView',
    data() {
        return {
            artistInfo: [],
            id: "",
        }
    },
    created: function() {
        this.id = this.$route.params.artista
        this.updateInfo()
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        },
    },
    methods: {
        updateInfo() {
            this.$store.commit('toggleLoading')
            axios
                .get('https://api.deezer.com/artist/' + this.id)
                .then(response => {
                    var artistData = {
                        name: response.data.name,
                        picture: response.data.picture_medium,
                        albumNumber: response.data.nb_album,
                    }
                    this.artistInfo.push(artistData)
                    if (this.loading == true) {
                        this.$store.commit('toggleLoading')
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
        },
    },
}
</script>
