<template>
    <div class="profile">
        <v-sheet style="margin:2em auto" class="pa-2" width="80%">
            <v-row v-if="user != null">
                <v-col class="col-9 centrata">
                    <h2>Informazioni account</h2>
                </v-col>
                <v-col class="col-9 centrata">
                    <p>Mail: {{ user.email }}</p>
                </v-col>
                <v-col class="col-9 centrata">
                    <p>Username: {{ username }}</p>
                </v-col>
                <v-col class="col-9 centrata">
                    <p>Follower: {{ followers[0].num }}</p>
                </v-col>
                <v-col class="col-9 centrata">
                    <p>Seguiti: {{ following[0].num }}</p>
                </v-col>
                <v-col class="col-9 centrata">
                    <v-form ref="form">
                        <v-btn color="danger" @click="logout()">Logout</v-btn>
                    </v-form>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row v-if="user != null">
                <v-col class="col-9 centrata">
                    <h2>Modifica informazioni</h2>
                </v-col>
                <v-col class="col-9 centrata">
                    <v-text-field v-model="newUsername" label="Modifica username"></v-text-field>
                </v-col>
                <v-col class="col-9 centrata">
                    <v-form ref="form">
                        <v-btn color="secondary" @click="modUsername()">Modifica</v-btn>
                    </v-form>
                </v-col>
            </v-row>
            <!--    <v-row align="center" justify="center" class="flex-column">
            <v-form ref="form">
                <v-btn v-if="!seguito" color="primary" @click="segui('f')">Follow</v-btn>
                <v-btn v-else color="danger" @click="segui('u')">Unfollow</v-btn>
            </v-form>
            </v-row>-->
        </v-sheet>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'profile',
    data() {
        return {
            user: this.$store.state.user,
            usernameDB: this.$store.state.username,
            username: '',
            newUsername: '',
            following: [{ num: 0, users: [] }],
            followers: [{ num: 0, users: [] }],
            seguito: false,
        }
    },
    created: function() {
        if (this.user == null) {
            this.$router.replace({ name: 'login' })
        } else {
            var db = firebase.firestore()
            var mail = this.user.email
            this.getUsername()
            var userData1 = db
                .collection('utenti')
                .doc(mail)
                .collection('followers')
            var userData2 = db
                .collection('utenti')
                .doc(mail)
                .collection('following')

            var followers = this.followers
            var following = this.following

            userData1
                .get()
                .then(function(querySnapshot) {
                    if (querySnapshot.empty == true) {
                        console.log('no followers')
                    } else {
                        querySnapshot.forEach(function(doc) {
                            console.log(doc.id, ' => ', doc.data())
                            var follower = {
                                email: doc.id,
                            }
                            followers[0].users.push(follower)
                            followers[0].num += 1
                        })
                    }
                })
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })

            userData2
                .get()
                .then(function(querySnapshot) {
                    if (querySnapshot.empty == true) {
                        console.log('no following')
                    } else {
                        querySnapshot.forEach(function(doc) {
                            console.log(doc.id, ' => ', doc.data())
                            var followin = {
                                email: doc.id,
                            }
                            following[0].users.push(followin)
                            following[0].num += 1
                        })
                    }
                })
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })
        }
        /*    if (this.user == null && this.$route.params.username == null) {
            this.$router.replace({ name: 'login' })
        } else if (this.usernameDB == this.$route.params.username) {
            this.getUsername()
            var email = this.user.email
            var db = firebase.firestore()
            var userData = db
                .collection('utenti')
                .doc(email)
                .collection('seguiti')
            var user2 = db
                .collection('utenti')
                .doc(email)
                .collection('follower')
            var followers = this.arrFollower
            var following = this.arrSeguiti
            var numSeguiti = this.numSeguiti
            var numFollower = this.numFollower
            userData
                .get()
                .then(function(querySnapshot) {
                    if (querySnapshot.size == 0) {
                        numSeguiti[0].n = 0
                    } else {
                        console.log(querySnapshot)
                        querySnapshot.forEach(function(doc) {
                            following.push(doc.data().mail)
                        })
                        numSeguiti[0].n = following.length
                    }
                })
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })
            user2
                .get()
                .then(function(querySnapshot) {
                    if (querySnapshot.size == 0) {
                        numFollower[0].n = 0
                    } else {
                        querySnapshot.forEach(function(doc) {
                            followers.push(doc.data().mail)
                        })
                        numFollower[0].n = followers.length
                    }
                })
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })*/
        /* .then(() => this.switchFollowButton())*/

        /* else {
            this.username = this.$route.params.username
            this.stay()
        }*/
    },
    methods: {
        modUsername() {
            //Metodo che controlla se l'username è uguale a quello di prima, se è vuoto o meno e se è già presente nel db
            if (this.newUsername == this.username) {
                alert('Username uguale al precedente')
            } else if (this.newUsername == '' || this.newUsername[0] == ' ') {
                alert('Il campo non deve essere vuoto')
            } else {
                var db = firebase.firestore()
                var usr = this.newUsername
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
                var db = firebase.firestore()
                var usr = this.newUsername
                var email = this.user.email
                var userData = db.collection('utenti').doc(email)
                userData
                    .set({
                        username: usr,
                    })
                    .then(function() {
                        alert('Username aggiornato correttamente')
                    })
                    .catch(function(error) {
                        alert('Qualcosa è andato storto, riprova')
                        console.log(error)
                    })
                    .then(() => this.updateUsername(usr))
            }
        },
        getUsername() {
            //Metodo usato all'inizio per prelevare l'username dal db
            var db = firebase.firestore()
            var email = this.user.email
            var userData = db.collection('utenti').doc(email)
            var usr = ''
            userData
                .get()
                .then(function(querySnapshot) {
                    usr = querySnapshot.data().username
                })
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })
                .then(() => this.updateUsername(usr))
        },
        updateUsername(usr) {
            //Metodo per settare correttamente l'username e aggiornare la vista
            this.username = usr
            this.$store.commit('updateUsernameSetFB')
            /*
            this.$router.replace({
                name: 'profile',
                params: { username: this.$store.state.username },
            })
            */
        },
        logoutRoute() {
            this.$router.replace({ name: 'home' })
        },
        async logout() {
            try {
                await firebase.auth().signOut()
                //alert('Logout effettuato!')
                this.$emit('login', 'Logout effettuato')
                this.$router.replace({ name: 'home' })
                this.$store.commit('updateUserFB')
                this.$store.commit('updateUsernameClearFB')
                //this.$emit('updateUser', Object)
            } catch (err) {
                alert('Oops. ' + err.message)
            }
        },
        /*    stay() {
            var db = firebase.firestore()
            var usr = this.$route.params.username
            var userData = db.collection('utenti')
            var presente = true
            userData
                .where('username', '==', usr)
                .get()
                .then(function(querySnapshot) {
                    if (querySnapshot.size == 0) {
                        presente = false
                    }
                })
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })
                .then(() => this.stay2(presente))
        },
        stay2(presente) {
            if (presente == false) {
                alert('Utente inesistente. Clicca Ok per tornare alla home.')
                setTimeout(() => this.$router.replace({ name: 'home' }), 1000)
            } else {
                this.segui('tot')
            }
        },    */
        /*    segui(mode) {
            var db = firebase.firestore()
            //var email = this.user.email
            var username = this.$route.params.username
            var emailFollow = ''
            var userData = db.collection('utenti')
            if (mode == 'f') {
                userData.where('username', '==', username)
                userData
                    .get()
                    .then(function(querySnapshot) {
                        emailFollow = querySnapshot.docs[0].id
                    })
                    .catch(function(error) {
                        console.log('Error getting document:', error)
                    })
                    .then(() => this.followUnfollow('f', emailFollow))
            } else if (mode == 'u') {
                userData.where('username', '==', username)
                userData
                    .get()
                    .then(function(querySnapshot) {
                        emailFollow = querySnapshot.docs[0].id
                    })
                    .catch(function(error) {
                        console.log('Error getting document:', error)
                    })
                    .then(() => this.followUnfollow('u', emailFollow))
            } else {
                userData.where('username', '==', username)
                userData
                    .get()
                    .then(function(querySnapshot) {
                        emailFollow = querySnapshot.docs[0].id
                    })
                    .catch(function(error) {
                        console.log('Error getting document:', error)
                    })
                    .then(() => this.fetchFollowEFollowers(emailFollow))
            }
        },
        followUnfollow(mode, emailFollow) {
            var db = firebase.firestore()
            var email = this.user.email
            var userData = db
                .collection('utenti')
                .doc(email)
                .collection('seguiti')
            var user2 = db
                .collection('utenti')
                .doc(emailFollow)
                .collection('follower')
            if (mode == 'f') {
                userData.doc().set({ mail: emailFollow })
                user2.doc().set({ mail: email })
                this.seguito = true
            } else {
                userData.where('mail', '==', emailFollow)
                userData.get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        doc.ref.delete()
                    })
                })
                user2.where('mail', '==', email)
                user2.get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        doc.ref.delete()
                    })
                })
                this.seguito = false
            }
        },   */

        /*     switchFollowButton() {
            if (this.user != null) {
                var trovato = false
                var cont = 0
                while (!trovato && cont < this.arrFollower.length) {
                    if (this.arrFollower[cont] == this.user.email) {
                        trovato = true
                        this.seguito = true
                    } else {
                        cont++
                    }
                }
            }
        },  */
    },
}
</script>

<style scoped>
.centrata {
    margin: 0 auto;
}
</style>