<template>
    <div class="signup">
        <h1 style="text-align:center">Registrazione</h1>
        <v-row align="center" justify="center">
            <v-form ref="form">
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                ></v-text-field>
                <v-text-field v-model="username" label="Username" required></v-text-field>
                <v-text-field
                    type="password"
                    v-model="password"
                    :rules="passRules"
                    label="Password"
                    required
                ></v-text-field>
                <v-btn @click="modUsername()">Registrati</v-btn>
            </v-form>
        </v-row>
        <v-row align="center" justify="center" class="mt-3">
            <p>
                Hai già un account?
                <a @click="login()">Accedi</a>
            </p>
        </v-row>
    </div>
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
                alert('Account creato!')
                this.$store.commit('updateUserFB')
                var db = firebase.firestore()
                var usr = this.username
                var user = this.$store.state.user
                var email = user.email
                var userData = db.collection('utenti').doc(email)
                userData
                    .set({
                        username: usr,
                    })
                    .then(function() {
                        this.$store.commit('updateUsernameSetFB')
                    })
                    .catch(function(error) {
                        alert('Qualcosa è andato storto, riprova')
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
