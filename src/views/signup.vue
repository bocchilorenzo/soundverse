<template>
    <v-container class="fill-height" fluid>
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
                                label="E-mail"
                                required
                                prepend-icon="mdi-email"
                            />
                            <v-text-field
                                v-model="username"
                                label="Username"
                                required
                                prepend-icon="mdi-account"
                            ></v-text-field>

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
                                Hai già un account?
                                <a @click="login()">Accedi</a>
                            </small>
                        </p>
                        <v-spacer />
                        <v-btn color="primary" @click="modUsername()">Registrati</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'signup',
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
        }
    },
    methods: {
        login() {
            this.$router.replace({ name: 'login' })
        },
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
                        //this.$store.commit('updateUsernameSetFB')
                    })
                    .catch(function(error) {
                        console.log('Qualcosa è andato storto, riprova')
                        console.log(error)
                    })
                this.$router.replace({ name: 'home' })
                //this.$emit('updateUser', firebase.auth().currentUser)
            } catch (err) {
                alert('Oops. ' + err.message)
            }
        },
        async modUsername() {
            //Metodo che controlla se l'username è vuoto o meno e se è già presente nel db
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
                            // doc.data() is never undefined for query doc snapshots
                            if (doc.data().username == usr) {
                                isPresent = true
                            }
                        })
                    })
                    .catch(function(error) {
                        console.log('Error getting document:', error)
                    })
                    .then(() => this.setUsername(isPresent))
            }
        },
        setUsername(isPresent) {
            //Metodo che se l'username è in uso non lo setta, altrimenti lo setta
            if (isPresent) {
                alert('Username già in uso')
            } else {
                this.signUpFirebase()
            }
        },
    },
}
</script>
