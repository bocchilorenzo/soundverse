<template>
    <v-container>
        <v-sheet color="sheet" class="pa-2 centraRadius" width="80%">
            <v-row>
                <v-col class="col-9 centrata">
                    <span>Cambia colore del tema</span>
                    <v-btn class="mx-2 mb-2" color="primary" @click="cambiaTema()">Tema {{temaBtn}}</v-btn>
                </v-col>
                <v-col class="col-10 centrata">
                    <h3>
                        Informazioni
                    </h3>
                </v-col>
                <v-col class="col-9 centrata">
                    <h4>
                        Progetto per il corso di
                        <a
                            target="_blank"
                            href="https://www.esse3.unitn.it/Guide/PaginaADErogata.do?ad_er_id=2018*N0*N0*S2*42805*90191&ANNO_ACCADEMICO=2018&mostra_percorsi=S"
                        >Informatica ed elementi di programmazione II</a>
                    </h4>
                </v-col>
                <v-col class="col-9 centrata">
                    <span>Gruppo di:</span>
                    <ul>
                        <li>
                            <a
                                target="_blank"
                                href="https://github.com/bocchilorenzo"
                            >Bocchi Lorenzo</a>
                        </li>
                        <li>
                            <a
                                target="_blank"
                                href="https://github.com/valefras"
                            >Frasnelli Valentino</a>
                        </li>
                    </ul>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
                <v-col class="col-9 centrata">
                    <span>Tecnologie utilizzate:</span>
                    <ul>
                        <li>
                            <a target="_blank" href="https://vuejs.org/">Vue JS</a>
                        </li>
                        <li>
                            <a target="_blank" href="https://vuetifyjs.com/en/">Vuetify</a>
                        </li>
                        <li>
                            <a target="_blank" href="https://developers.deezer.com/api">Deezer API</a>
                        </li>
                        <li>
                            <a target="_blank" href="https://www.last.fm/api/">Last.fm API</a>
                        </li>
                        <li>
                            <a target="_blank" href="https://firebase.google.com/">Firebase</a>
                        </li>
                    </ul>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
    <!--
    <div class="about mx-2">
        <h1>Progetto per il corso di <a target="_blank" href="https://www.esse3.unitn.it/Guide/PaginaADErogata.do?ad_er_id=2018*N0*N0*S2*42805*90191&ANNO_ACCADEMICO=2018&mostra_percorsi=S">Informatica ed elementi di programmazione II</a></h1>
        Gruppo di:
        <ul>
            <li><a target="_blank" href="https://github.com/bocchilorenzo">Bocchi Lorenzo</a></li>
            <li><a target="_blank" href="https://github.com/valefras">Frasnelli Valentino</a></li>
        </ul>
        Tecnologie utilizzate:
        <ul>
            <li><a target="_blank" href="https://vuejs.org/">Vue JS</a></li>
            <li><a target="_blank" href="https://vuetifyjs.com/en/">Vuetify</a></li>
            <li><a target="_blank" href="https://developers.deezer.com/api">Deezer API</a></li>
            <li><a target="_blank" href="https://firebase.google.com/">Firebase</a></li>
        </ul>
    </div>
    -->
</template>

<script>
export default {
    name: 'impostazioni',
    data() {
        return {
            generiArray: [],
            loading: true,
            start: 0,
            end: 25,
            stop: false,
            tema: this.$vuetify.theme.dark,
            temaBtn: '',
        }
    },
    created: function() {
        this.$emit('toggleBurger', 'home')
        this.$emit('brand', "Impostazioni")
        if (this.tema == true) {
            this.temaBtn = 'chiaro'
        } else {
            this.temaBtn = 'scuro'
        }
    },
    methods: {
        cambiaTema() {
            if (this.tema == true) {
                this.temaBtn = 'scuro'
            } else {
                this.temaBtn = 'chiaro'
            }
            this.$emit('tema')
            this.tema = this.$vuetify.theme.dark
        },
    },
}
</script>

<style scoped>
.centrata {
    margin: 0 auto;
}

.centraRadius{
    margin: 2em auto;
    border-radius: 1em;
}
</style>
