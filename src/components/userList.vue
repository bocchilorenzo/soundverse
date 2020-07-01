<template>
    <router-link
        v-if="!profiloMio"
        :to="{
            name: 'user',
            path: '/user/:username',
            params: { username: dati.username, email: dati.email },
            props: true,
        }"
    >
        <v-list-item class="mx-2">
            <v-list-item-avatar>
                <v-img :src="src.src" alt="Immagine utente"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>{{ dati.username }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </router-link>
    <router-link v-else :to="{
            name: 'profile',
        }">
        <v-list-item class="mx-2">
            <v-list-item-avatar>
                <v-img :src="src.src" alt="Immagine utente"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>{{ dati.username }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </router-link>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'userList',
    props: { dati: Object },
    data() {
        return {
            utente: JSON.parse(localStorage.getItem('user')),
            profiloMio: false,
            src: { src: '' },
        }
    },
    created: function() {
        if (this.utente != null) {
            if (this.dati.email == this.utente.email) {
                this.profiloMio = true
            }
        }
        this.updateImgUser()
    },
    methods: {
        //Preleva l'immagine dell'utente cercato
        updateImgUser() {
            var storage = firebase.storage()
            var pathReference = storage.ref('profile')
            var src = this.src
            var q = this.dati.username
            pathReference
                .child('/' + q + '/profile.jpg')
                .getDownloadURL()
                .then(function(url) {
                    src.src = url
                })
                .catch(() => this.setDefaultPic(storage, src))
        },
        //Se l'utente non ha un'immagine, imposta quella di default
        setDefaultPic(storage, src) {
            var pathReference = storage.ref('profile')
            pathReference
                .child('/default.jpg')
                .getDownloadURL()
                .then(function(url) {
                    src.src = url
                })
        },
    },
}
</script>
