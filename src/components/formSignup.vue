<template>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>Registrazione</v-toolbar-title>
                    <v-spacer />
                </v-toolbar>
                <v-card-text>
                    <v-form ref="form">
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
                            counter="20"
                            maxlength="20"
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
                        rounded
                        class="mx-2 mb-2"
                        color="primary"
                        @click="modUsername()"
                        name="Pulsante registrazione"
                        :loading="loadBtn"
                    >Registrati</v-btn>
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
    name: 'formSignup',
    data() {
        return {
            email: '',
            password: '',
            username: '',
            passRules: [
                v => !!v || 'Password obbligatoria',
                v => (v && v.length >= 6) || 'Almeno 6 caratteri',
            ],
            emailRules: [
                v => !!v || 'E-mail obbligatoria',
                v => /.+@.+\..+/.test(v) || 'E-mail non valida',
            ],
            rules: [
                value =>
                    !value ||
                    value.size < 1000000 ||
                    "Le dimensioni dell'immagine non devono superare 1 MB",
            ],
            loadBtn: false
        }
    },
    methods: {
        //Reindirizza al login
        login() {
            this.$router.replace({ name: 'login' })
        },
        //Esegue la registrazione
        async signUpFirebase() {
            var cleanEmail = ''
            var cleanPass = ''
            try {
                cleanEmail = stripHtml(this.email)
                cleanPass = stripHtml(this.password)
                await firebase.auth().createUserWithEmailAndPassword(cleanEmail, cleanPass)
                this.$emit('login', 'Registrazione effettuata')
                var db = firebase.firestore()
                var usr = stripHtml(this.username)
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
                this.$emit('login', 'Email già utilizzata. Riprova')
            }
        },
        fine() {
            this.loadBtn = false
            this.$router.replace({ name: 'home' })
        },
        //Metodo che controlla se l'username è vuoto o meno e se è già presente nel db
        async modUsername() {
            if (this.$refs.form.validate()) {
                if (this.username == '' || this.username[0] == ' ') {
                    this.$emit('login', 'Il campo username non deve essere vuoto')
                } else {
                    this.loadBtn = true
                    var db = firebase.firestore()
                    var usr = stripHtml(this.username)
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
            } else {
                this.$emit('login', 'Uno o più campi non validi. Riprova')
            }
        },
        //Metodo che se l'username è in uso non lo setta, altrimenti lo setta
        setUsernameSignup(isPresent) {
            if (isPresent) {
                this.loadBtn = false
                this.$emit('login', 'Username già in uso')
            } else {
                this.signUpFirebase()
            }
        },
    },
}
</script>
