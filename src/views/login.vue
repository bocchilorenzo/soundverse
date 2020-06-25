<template>
    <div>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="4">
                    <v-card class="elevation-12">
                        <v-toolbar color="primary" dark flat>
                            <v-toolbar-title>Login</v-toolbar-title>
                            <v-spacer />
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
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
                                />
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <p>
                                <small>
                                    Non hai un account?
                                    <a @click="signup()">Registrati</a>
                                </small>
                            </p>
                            <v-spacer />
                            <v-btn color="primary" @click="loginFirebase()">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
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
                console.log(this.email + " - " + this.password)
                await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                //alert('Login effettuato')
                this.$emit('login', 'Login effettuato')
                localStorage.setItem('user', JSON.stringify(firebase.auth().currentUser))
                this.setUsername()
                this.$router.replace({ name: 'home' })
                /*
                this.$store.commit('updateUserFB')
                this.$store.commit('updateUsernameSetFB')
                */
                //this.$emit('updateUser', firebase.auth().currentUser)
                //$emit('nomeEvento', datoDaPassare) => vai in app.vue nel tag router view
            } catch (err) {
                alert('Oops. ' + err.message)
            }
        },
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
        }
    },
}
</script>
