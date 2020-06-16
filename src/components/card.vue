<template>
    <v-hover v-slot:default="{ hover }">
        <v-card class="ma-1" :elevation="hover ? 10 : 2" max-width="200" height="100%">
            <router-link
                :to="{
                    name: 'album',
                    path: '/album/:id',
                    params: { id: albumArray.albumId },
                    props: true,
                }"
            >
                <v-img class="align-end" :src="albumArray.cover"></v-img>

                <v-card-subtitle class="pb-0">{{ albumArray.artist }}</v-card-subtitle>

                <v-card-text class="text--primary">{{ albumArray.title }}</v-card-text>
            </router-link>

            <v-card-actions>
                <v-menu bottom right transition="slide-y-transition" :offset-y="offsety">
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on" @click="check()">
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
                            <v-list-item-title v-if="ascoltato.isAscoltato">
                                Rimuovi dagli album ascoltati
                            </v-list-item-title>
                            <v-list-item-title v-else>Segna come ascoltato</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="toListen()">
                            <v-list-item-title v-if="daAscoltare.isDaAscoltare">
                                Rimuovi dagli album da ascoltare
                            </v-list-item-title>
                            <v-list-item-title v-else>Aggiungi ai da ascoltare</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-card-actions>
        </v-card>
    </v-hover>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'albumCard',
    props: { albumArray: Object },
    data() {
        return {
            offsety: true,
            preferito: { isPreferito: false },
            ascoltato: { isAscoltato: false },
            daAscoltare: { isDaAscoltare: false },
            user: this.$store.state.user,
        }
    },
    methods: {
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
            if (this.ascoltato.isAscoltato == true) {
                userData.delete()
                if (this.$route.name == 'ascoltati') {
                    this.$emit('deletThis', this.albumArray.albumId)
                }
                this.ascoltato.isAscoltato = false
            } else {
                userData.set({ titolo: title, rating: 0 })
                this.ascoltato.isAscoltato = true
            }
        },
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
            if (this.daAscoltare.isDaAscoltare == true) {
                userData.delete()
                if (this.$route.name == 'daAscoltare') {
                    this.$emit('deletThis', this.albumArray.albumId)
                }
                this.daAscoltare.isDaAscoltare = false
            } else {
                userData.set({ titolo: title })
                this.daAscoltare.isDaAscoltare = true
            }
        },
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
            if (this.preferito.isPreferito == true) {
                userData.delete()
                if (this.$route.name == 'preferiti') {
                    this.$emit('deletThis', this.albumArray.albumId)
                }
                this.preferito.isPreferito = false
            } else {
                userData.set({ titolo: title })
                this.preferito.isPreferito = true
            }
        },
    },
}
</script>
<style scoped></style>
