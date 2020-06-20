<template>
    <router-link
        :to="{
            name: 'user',
            path: '/user/:username',
            params: { username: dati.username, email: dati.email },
            props: true,
        }"
    >
        <v-list-item>
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
}
</script>
