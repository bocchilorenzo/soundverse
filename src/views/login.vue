<template>
    <div class="login">
        <h1 style="text-align:center">Login</h1>
        <v-row align="center" justify="center">
            <v-form ref="form">
                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                <v-text-field
                    type="password"
                    v-model="password"
                    :rules="passRules"
                    label="Password"
                    required
                ></v-text-field>
                <v-btn @click="loginFirebase()">Accedi</v-btn>
            </v-form>
        </v-row>
        <v-row align="center" justify="center" class="mt-3">
            <p>
                Non hai un account?
                <a @click="signup()">Registrati</a>
            </p>
        </v-row>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    props: {
        user: Object,
    },
    name: 'login',
    data() {
        return {
            email: '',
            password: '',
            password2: '',
            passRules: [v => !!v || 'Password obbligatoria'],
            emailRules: [
                v => !!v || 'E-mail obbligatoria',
                v => /.+@.+\..+/.test(v) || 'La mail deve essere valida',
            ],
        }
    },
    methods: {
        signup() {
            this.$router.replace({ name: 'signup' })
        },
        async loginFirebase() {
            try {
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(this.email, this.password)
                alert('Login effettuato')
                this.$router.replace({ name: 'home' })
                this.user = firebase.auth().currentUser //modifico il prop diretto
            } catch (err) {
                alert('Oops. ' + err.message)
            }
        },
    },
}
</script>