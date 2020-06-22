<template>
    <div>
        <div v-for="user in arrayRisultati" :key="user.username">
            <v-row>
                <userList style="width: 100%" :dati="user" />
            </v-row>
        </div>
    </div>
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
