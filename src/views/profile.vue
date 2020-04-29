<template>
    <div class="profile">
        <v-row v-if="user != null" align="center" justify="center">
            <p style="text-align:center">Mail: {{user.email}}</p>
            <v-form ref="form">
                <v-btn color="danger" @click="logout()">Logout</v-btn>
            </v-form>
        </v-row>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'profile',
    data() {
        return {
            user: firebase.auth().currentUser,
        }
    },
    methods: {
        logoutRoute() {
            this.$router.replace({ name: 'home' })
        },
        async logout() {
            try {
                await firebase.auth().signOut()
                alert('Logout effettuato!')
                this.$router.replace({ name: 'home' })
            } catch (err) {
                alert('Oops. ' + err.message)
            }
        },
    },
    created: function() {
        if (this.user == null) {
            this.$router.replace({ name: 'login' })
        }
    },
}
</script>