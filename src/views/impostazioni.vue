<template>
    <v-container>
        <v-sheet color="sheet" class="pa-2 centraRadius" :class="{ small: wide, large: !wide }">
            <v-row>
                <v-col class="col-9 centrata">
                    <span>Cambia colore del tema</span>
                    <v-btn
                        rounded
                        class="mx-2 mb-2"
                        color="primary"
                        @click="cambiaTema()"
                        name="Cambia tema"
                        >Tema {{ temaBtn }}</v-btn
                    >
                </v-col>
                <v-col class="col-10 centrata">
                    <h3>Informazioni</h3>
                </v-col>
                <v-col class="col-9 centrata">
                    <h4>
                        Progetto per il corso di
                        <a
                            target="_blank"
                            href="https://www.esse3.unitn.it/Guide/PaginaADErogata.do?ad_er_id=2018*N0*N0*S2*42805*90191&ANNO_ACCADEMICO=2018&mostra_percorsi=S"
                            >Informatica ed elementi di programmazione II</a
                        >
                    </h4>
                </v-col>
                <v-col class="col-9 centrata">
                    <span>Gruppo di:</span>
                    <ul>
                        <li>
                            <a target="_blank" href="https://github.com/bocchilorenzo"
                                >Bocchi Lorenzo</a
                            >
                        </li>
                        <li>
                            <a target="_blank" href="https://github.com/valefras"
                                >Frasnelli Valentino</a
                            >
                        </li>
                    </ul>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
                <v-col class="col-9 centrata">
                    <span>API utilizzate:</span>

                    <ul>
                        <li>
                            <v-img
                                v-if="this.$vuetify.theme.dark"
                                src="../assets/Deezer_Logo_RVB_White.svg"
                                width="100px"
                                alt="Logo Deezer White"
                                title="Logo Deezer White"
                            ></v-img>
                            <v-img
                                v-else
                                src="../assets/Deezer_Logo_RVB_Black.svg"
                                width="100px"
                                alt="Logo Deezer Black"
                                title="Logo Deezer Black"
                            ></v-img>
                        </li>
                        <li>
                            <a target="_blank" href="https://www.last.fm/api/">Last.fm API</a>
                        </li>
                    </ul>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
                <v-col class="col-9 centrata">
                    <span>Altre tecnologie:</span>
                    <ul>
                        <li>
                            <a target="_blank" href="https://vuejs.org/">Vue JS</a>
                        </li>
                        <li>
                            <a target="_blank" href="https://vuetifyjs.com/en/">Vuetify</a>
                        </li>
                        <li>
                            <a target="_blank" href="https://firebase.google.com/">Firebase</a>
                        </li>
                    </ul>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
                <v-col class="col-9 centrata">
                    <span>Logo/favicon disegnato da <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> e scaricato da <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></span>
                </v-col>
            </v-row>
        </v-sheet>
    </v-container>
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
            wide: false,
        }
    },
    created: function() {
        switch (this.$vuetify.breakpoint.name) {
            case 'xs':
                this.wide = true
                break
            case 'sm':
                this.wide = true
                break
            case 'md':
                this.wide = false
                break
            case 'lg':
                this.wide = false
                break
            case 'xl':
                this.wide = false
                break
        }
        this.$emit('toggleBurger', 'home')
        this.$emit('brand', 'Impostazioni')
        if (this.tema == true) {
            this.temaBtn = 'chiaro'
        } else {
            this.temaBtn = 'scuro'
        }
    },
    methods: {
        //Modifica il tema
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

.centraRadius {
    margin: 2em auto;
    border-radius: 1em;
}
.large {
    width: 80%;
}
.small {
    width: 100%;
}
</style>
