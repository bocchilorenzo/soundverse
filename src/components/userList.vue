<template>
    <v-hover>
            <router-link
                :to="{
                    name: 'utente',
                    path: '/utente/:username',
                    params: { username: dati.username },
                    props: true,
                }"
            >
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>{{dati.username}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </router-link>
    </v-hover>
</template>

<script>
export default {
    name: 'userList',
    props: { dati: Object },
}
</script>