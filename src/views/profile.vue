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
        logout() {
            firebase
                .auth()
                .signOut()
                .then(
                    function() {
                        alert('Logout effettuato!')
                    },
                    function(error) {
                        alert('RIP. ' + error.message)
                    }
                )
        },
    },
    created: function(){
        if (this.user == null){
            this.$router.replace({ name: 'login' })
        }
    }
}
</script>

<style scoped>
</style>