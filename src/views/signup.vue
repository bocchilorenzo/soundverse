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
                <v-text-field
                    type="password"
                    v-model="password"
                    :rules="passRules"
                    label="Password"
                    required
                ></v-text-field>
                <v-btn @click="signUpFirebase()">Registrati</v-btn>
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
            passRules: [v => !!v || 'Password obbligatoria'],
            emailRules: [
                v => !!v || 'E-mail obbligatoria',
                v => /.+@.+\..+/.test(v) || 'La mail deve essere valida',
            ],
        }
    },
    methods: {
        //Aggiungere metodo per settare l'username durante la registrazione, riciclando quello nella pagina del profilo per i controlli
        login() {
            this.$router.replace({ name: 'login' })
        },
        async signUpFirebase() {
            try {
                await firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.email, this.password)
                alert('Account creato!')
                this.$router.replace({ name: 'home' })
                this.$store.commit('updateUserFB')
                //this.$emit('updateUser', firebase.auth().currentUser)
            } catch (err) {
                alert('Oops. ' + err.message)
            }
        },
    },
}
</script>
