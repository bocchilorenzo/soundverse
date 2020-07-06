<template>
    <v-hover v-slot:default="{ hover }">
        <v-card
            style="margin: 0 auto"
            :elevation="hover ? 10 : 2"
            max-width="220"
            height="100%"
            color="primaryCard"
        >
            <router-link
                :to="{
                    name: 'album',
                    path: '/album/:id',
                    params: { id: albumArray.albumId },
                    props: true,
                }"
            >
                <v-img
                    class="align-end"
                    :src="albumArray.cover"
                    alt="Cover album"
                    :title="albumArray.title"
                ></v-img>
            </router-link>
            <v-card-actions v-if="user != null" style="position: absolute; top: 0; right: 0;">
                <v-menu bottom right transition="slide-y-transition" :offset-y="offsety">
                    <template v-slot:activator="{ on }">
                        <v-btn small fab v-on="on" @click="check()" name="Pulsante menu">
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item @click="favourite()">
                            <v-list-item-title v-if="preferito.isPreferito"
                                >Rimuovi dai preferiti</v-list-item-title
                            >
                            <v-list-item-title v-else>Aggiungi ai preferiti</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="listened()">
                            <v-list-item-title v-if="ascoltato.isAscoltato"
                                >Rimuovi dagli album ascoltati</v-list-item-title
                            >
                            <v-list-item-title v-else>Segna come ascoltato</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="toListen()">
                            <v-list-item-title v-if="daAscoltare.isDaAscoltare"
                                >Rimuovi dalla coda di ascolto</v-list-item-title
                            >
                            <v-list-item-title v-else
                                >Aggiungi alla coda di ascolto</v-list-item-title
                            >
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-card-actions>
            <router-link
                :to="{
                    name: 'album',
                    path: '/album/:id',
                    params: { id: albumArray.albumId },
                    props: true,
                }"
            >
                <v-card-subtitle class="crop pb-0">{{ albumArray.artist }}</v-card-subtitle>

                <v-card-text class="crop text--primary">{{ albumArray.title }}</v-card-text>
            </router-link>
        </v-card>
    </v-hover>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
    name: 'albumCard',
    props: { albumArray: Object },
    data() {
        return {
            offsety: true,
            preferito: { isPreferito: false },
            ascoltato: { isAscoltato: false },
            daAscoltare: { isDaAscoltare: false },
            user: JSON.parse(localStorage.getItem('user')),
        }
    },
    methods: {
        //controlla se l'album è negli ascoltati, da ascoltare o preferiti dell'utente attualmente loggato
        check() {
            var id = this.albumArray.albumId
            var ascoltato = this.ascoltato
            var daAscoltare = this.daAscoltare
            var preferito = this.preferito
            var db = firebase.firestore()
            var userData = db.collection('utenti').doc(this.user.email)
            userData
                .collection('ascoltati')
                .doc(id.toString())
                .get()
                .then(function(doc) {
                    if (doc.exists) {
                        ascoltato.isAscoltato = true
                    }
                })
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })

            userData
                .collection('daAscoltare')
                .doc(id.toString())
                .get()
                .then(function(doc) {
                    if (doc.exists) {
                        daAscoltare.isDaAscoltare = true
                    }
                })
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })

            userData
                .collection('preferiti')
                .doc(id.toString())
                .get()
                .then(function(doc) {
                    if (doc.exists) {
                        preferito.isPreferito = true
                        console.log('è tra i preferiti')
                    }
                })
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })
        },
        //aggiunge l'album agli ascoltati del'utente attualmente loggato
        listened() {
            var db = firebase.firestore()
            var email = this.user.email
            var id = this.albumArray.albumId
            var userData = db
                .collection('utenti')
                .doc(email)
                .collection('ascoltati')
                .doc(id.toString())
            var title = this.albumArray.title
            var cover = this.albumArray.cover
            var artista = this.albumArray.artist
            if (this.ascoltato.isAscoltato == true) {
                userData.delete()
                if (this.$route.name == 'ascoltati') {
                    this.$emit('deletThis', this.albumArray.albumId)
                }
                this.ascoltato.isAscoltato = false
                this.$emit('snack', 'Rimosso dagli ascoltati')
            } else {
                userData.set({ titolo: title, rating: 0, cover: cover, artista: artista })
                this.ascoltato.isAscoltato = true
                this.$emit('snack', 'Aggiunto agli ascoltati')
            }
        },
        //aggiunge l'album ai da ascoltare del'utente attualmente loggato
        toListen() {
            var db = firebase.firestore()
            var email = this.user.email
            var id = this.albumArray.albumId
            var userData = db
                .collection('utenti')
                .doc(email)
                .collection('daAscoltare')
                .doc(id.toString())
            var title = this.albumArray.title
            var cover = this.albumArray.cover
            var artista = this.albumArray.artist
            if (this.daAscoltare.isDaAscoltare == true) {
                userData.delete()
                if (this.$route.name == 'daAscoltare') {
                    this.$emit('deletThis', this.albumArray.albumId)
                }
                this.daAscoltare.isDaAscoltare = false
                this.$emit('snack', 'Rimosso dalla coda di ascolto')
            } else {
                userData.set({ titolo: title, cover: cover, artista: artista })
                this.daAscoltare.isDaAscoltare = true
                this.$emit('snack', 'Aggiunto alla coda di ascolto')
            }
        },
        //aggiunge l'album ai preferiti dell'utente attualmente loggato
        favourite() {
            var db = firebase.firestore()
            var email = this.user.email
            var id = this.albumArray.albumId

            var userData = db
                .collection('utenti')
                .doc(email)
                .collection('preferiti')
                .doc(id.toString())
            var title = this.albumArray.title
            var cover = this.albumArray.cover
            var artista = this.albumArray.artist
            if (this.preferito.isPreferito == true) {
                userData.delete()
                if (this.$route.name == 'preferiti') {
                    this.$emit('deletThis', this.albumArray.albumId)
                }
                this.preferito.isPreferito = false
                this.$emit('snack', 'Rimosso dai preferiti')
            } else {
                userData.set({ titolo: title, cover: cover, artista: artista })
                this.preferito.isPreferito = true
                this.$emit('snack', 'Aggiunto ai preferiti')
            }
        },
    },
}
</script>
<style scoped>
.crop {
    overflow: hidden;
    white-space: nowrap; /* Don't forget this one */
    text-overflow: ellipsis;
}
</style>
