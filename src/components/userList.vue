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
            <v-list-item-content>
                <v-list-item-title>{{ dati.username }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </router-link>
    <router-link v-else :to="{
            name: 'profile',
        }">
        <v-list-item class="mx-2">
            <v-list-item-content>
                <v-list-item-title>{{ dati.username }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </router-link>
</template>

<script>
export default {
    name: 'userList',
    props: { dati: Object },
    data() {
        return {
            utente: JSON.parse(localStorage.getItem('user')),
            profiloMio: false,
        }
    },
    created: function() {
        if (this.utente != null) {
            if (this.dati.email == this.utente.email) {
                this.profiloMio = true
            }
        }
    },
}
</script>
