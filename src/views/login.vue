<template>
    <div>
        <v-container v-if="type == 'login'" class="fill-height" fluid>
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
                            <p class="mx-2">
                                <small>
                                    Non hai un account?
                                    <a @click="signup()">Registrati</a>
                                </small>
                            </p>
                            <v-spacer />
                            <v-btn class="mx-2 mb-2" color="primary" @click="loginFirebase()">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-else class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="4">
                    <v-card class="elevation-12">
                        <v-toolbar color="primary" dark flat>
                            <v-toolbar-title>Registrazione</v-toolbar-title>
                            <v-spacer />
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    label="E-mail*"
                                    required
                                    prepend-icon="mdi-email"
                                />
                                <v-text-field
                                    v-model="username"
                                    :rules="[() => !!username || 'Username richiesto']"
                                    label="Username*"
                                    required
                                    prepend-icon="mdi-account"
                                ></v-text-field>

                                <v-text-field
                                    type="password"
                                    v-model="password"
                                    :rules="passRules"
                                    label="Password*"
                                    required
                                    prepend-icon="mdi-lock"
                                />
                                <v-file-input
                                    id="proPic"
                                    :rules="rules"
                                    accept="image/jpeg"
                                    placeholder="Scegli una foto"
                                    chips
                                    prepend-icon="mdi-camera"
                                    label="Foto profilo"
                                ></v-file-input>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <p class="mx-2">
                                <small>
                                    Hai già un account?
                                    <a @click="login()">Accedi</a>
                                </small>
                            </p>
                            <v-spacer />
                            <v-btn
                                class="mx-2 mb-2"
                                color="primary"
                                @click="modUsername()"
                            >Registrati</v-btn>
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
            username: '',
            passRules: [v => !!v || 'Password obbligatoria'],
            emailRules: [
                v => !!v || 'E-mail obbligatoria',
                v => /.+@.+\..+/.test(v) || 'La mail deve essere valida',
            ],
            type: this.$route.name,
            rules: [
                value =>
                    !value ||
                    value.size < 1000000 ||
                    "Le dimensioni dell'immagine non devono superare 1 MB",
            ],
        }
    },
    created: function() {
        this.$emit('toggleBurger', 'freccia')
        this.$emit('brand', '')
    },
    methods: {
        //Reindirizza alla registrazione
        signup() {
            this.$router.replace({ name: 'signup' })
        },
        //Esegue il login
        async loginFirebase() {
            try {
                await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                this.$emit('login', 'Login effettuato')
                localStorage.setItem('user', JSON.stringify(firebase.auth().currentUser))
                this.setUsername()
                this.$router.replace({ name: 'home' })
            } catch (err) {
                alert('Oops. ' + err.message)
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
        //Reindirizza al login
        login() {
            this.$router.replace({ name: 'login' })
        },
        //Esegue la registrazione
        async signUpFirebase() {
            try {
                await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                this.$emit('login', 'Registrazione effettuata')
                var db = firebase.firestore()
                var usr = this.username
                localStorage.setItem('user', JSON.stringify(firebase.auth().currentUser))
                var user = JSON.parse(localStorage.getItem('user'))
                var email = user.email
                var userData = db.collection('utenti').doc(email)
                userData
                    .set({
                        username: usr,
                    })
                    .then(function() {
                        localStorage.setItem('username', usr)
                    })
                    .catch(function(error) {
                        console.log('Qualcosa è andato storto, riprova')
                        console.log(error)
                    })

                var storage = firebase.storage()
                var pathReference = storage.ref('profile')
                var file = document.getElementById('proPic').files[0]
                var metadata = {
                    contentType: 'image/jpeg',
                    name: 'profile',
                }
                pathReference
                    .child('/' + usr + '/' + 'profile.jpg')
                    .put(file, metadata)
                    .then(() => this.fine())
            } catch (err) {
                alert('Oops. ' + err.message)
            }
        },
        fine() {
            this.$router.replace({ name: 'home' })
        },
        //Metodo che controlla se l'username è vuoto o meno e se è già presente nel db
        async modUsername() {
            if (this.username == '' || this.username[0] == ' ') {
                alert('Il campo username non deve essere vuoto')
            } else {
                var db = firebase.firestore()
                var usr = this.username
                var userData = db.collection('utenti')
                var isPresent = false
                userData
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            if (doc.data().username == usr) {
                                isPresent = true
                            }
                        })
                    })
                    .catch(function(error) {
                        console.log('Error getting document:', error)
                    })
                    .then(() => this.setUsernameSignup(isPresent))
            }
        },
        //Metodo che se l'username è in uso non lo setta, altrimenti lo setta
        setUsernameSignup(isPresent) {
            if (isPresent) {
                alert('Username già in uso')
            } else {
                this.signUpFirebase()
            }
        },
    },
}
</script>
