<template>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>Login</v-toolbar-title>
                    <v-spacer />
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form">
                        <v-text-field
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                            prepend-icon="mdi-email"
                        />

                        <v-text-field
                            type="password"
                            v-model="password"
                            :rules="passRules"
                            label="Password"
                            required
                            prepend-icon="mdi-lock"
                            @keyup.enter="loginFirebase()"
                        />
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <p class="mx-2">
                        <small>
                            Non hai un account?
                            <a @click="signup()">Registrati</a>
                        </small>
                    </p>
                    <v-spacer />
                    <v-btn
                        rounded
                        class="mx-2 mb-2"
                        color="primary"
                        @click="loginFirebase()"
                        name="Pulsante login"
                        :loading="loadBtn"
                    >Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import stripHtml from 'string-strip-html'
export default {
    name: 'formLogin',
    data() {
        return {
            email: '',
            password: '',
            passRules: [v => !!v || 'Password obbligatoria'],
            emailRules: [
                v => !!v || 'E-mail obbligatoria',
                v => /.+@.+\..+/.test(v) || 'E-mail non valida',
            ],
            loadBtn: false,
        }
    },
    methods: {
        //Reindirizza alla registrazione
        signup() {
            this.$router.replace({ name: 'signup' })
        },
        //Esegue il login
        async loginFirebase() {
            if (this.$refs.form.validate()) {
                this.loadBtn = true
                var cleanEmail = ''
                var cleanPass = ''
                try {
                    cleanEmail = stripHtml(this.email)
                    cleanPass = stripHtml(this.password)
                    await firebase.auth().signInWithEmailAndPassword(cleanEmail, cleanPass)
                    this.$emit('login', 'Login effettuato')
                    localStorage.setItem('user', JSON.stringify(firebase.auth().currentUser))
                    this.setUsername()
                    this.fine()
                } catch (err) {
                    this.loadBtn = false
                    this.$emit('login', 'Email o password errati. Riprova')
                }
            } else {
                this.$emit('login', 'Uno o più campi non validi. Riprova')
            }
        },
        //Imposta l'username localmente
        setUsername() {
            var db = firebase.firestore()
            var email = JSON.parse(localStorage.getItem('user')).email
            var userData = db.collection('utenti').doc(email)
            var usr = ''
            userData
                .get()
                .then(function(querySnapshot) {
                    usr = querySnapshot.data().username
                    localStorage.setItem('username', usr)
                })
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })
        },
        fine() {
            this.loadBtn = false
            this.$router.replace({ name: 'home' })
        },
    },
}
</script>
