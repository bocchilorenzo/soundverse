<template>
    <v-row align="center">
        <v-col v-for="user in arrayRisultati" :key="user.username" cols="12" sm="4" lg="2" xl="2">
            <v-row justify="center">
                <userList
                    :dati="user"
                />
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import userList from './userList'

export default {
    name: 'usersContainer',
    props: { arrayRisultati: Array },
    components: { userList },
}
</script>

<style></style>
