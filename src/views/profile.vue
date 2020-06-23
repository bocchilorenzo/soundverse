<template>
    <v-container>
        <v-sheet v-if="loading" style="margin:2em auto" class="pa-2" width="80%">
            <v-row>
                <v-col class="col-9 centrata">
                    <v-skeleton-loader
                        ref="skeleton"
                        type="heading"
                        max-width="100%"
                        width="50em"
                        class="my-2"
                    ></v-skeleton-loader>
                </v-col>
                <v-col class="col-9 centrata">
                    <v-skeleton-loader
                        ref="skeleton"
                        type="text"
                        width="100px"
                        class="my-2"
                    ></v-skeleton-loader>
                </v-col>
                <v-col class="col-9 centrata">
                    <v-skeleton-loader
                        ref="skeleton"
                        type="text"
                        width="100px"
                        class="my-2"
                    ></v-skeleton-loader>
                </v-col>
                <v-col class="col-9 centrata">
                    <v-skeleton-loader
                        ref="skeleton"
                        type="text"
                        width="100px"
                        class="my-2"
                    ></v-skeleton-loader>
                </v-col>
                <v-col class="col-9 centrata">
                    <v-skeleton-loader
                        ref="skeleton"
                        type="text"
                        width="100px"
                        class="my-2"
                    ></v-skeleton-loader>
                </v-col>
                <v-col class="col-9 centrata">
                    <v-skeleton-loader
                        ref="skeleton"
                        type="button"
                        class="my-2"
                    ></v-skeleton-loader>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
                <v-col class="col-9 centrata">
                    <v-skeleton-loader
                        ref="skeleton"
                        type="heading"
                        max-width="100%"
                        width="50em"
                        class="my-2"
                    ></v-skeleton-loader>
                </v-col>
                <v-col class="col-9 centrata">
                    <v-skeleton-loader
                        ref="skeleton"
                        type="text"
                        width="100px"
                        class="my-2"
                    ></v-skeleton-loader>
                </v-col>
                <v-col class="col-9 centrata">
                    <v-skeleton-loader
                        ref="skeleton"
                        type="button"
                        class="my-2"
                    ></v-skeleton-loader>
                </v-col>
            </v-row>
        </v-sheet>
        <v-sheet v-else style="margin:2em auto" class="pa-2" width="80%">
            <!--Magari spostare in un componente il dialog, così ne usiamo uno solo ed è più ordinato-->
            <v-dialog v-model="dialogSeguiti" scrollable max-width="300px">
                <v-card>
                    <v-card-title>Seguiti</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text style="height: 300px;" class="pt-3">
                        <usersContainer
                            v-if="following[0].users.length != 0"
                            :arrayRisultati="following[0].users"
                        ></usersContainer>
                        <!--EMPTY STATE NON TESTATO-->
                        <div v-else class="d-flex justify-center">
                            <v-container
                                class="d-inline-flex justify-center flex-column align-center"
                                style="border-radius: 50%; height:400px;width:400px; margin:10px"
                            >
                                <svg style="width:150px;height:150px;" viewBox="0 0 24 24">
                                    <path
                                        fill="#ececec"
                                        d="M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H8V4H20M12.5,15A2.5,2.5 0 0,0 15,12.5V7H18V5H14V10.5C13.58,10.19 13.07,10 12.5,10A2.5,2.5 0 0,0 10,12.5A2.5,2.5 0 0,0 12.5,15M4,6H2V20A2,2 0 0,0 4,22H18V20H4"
                                    />
                                </svg>
                                <p style="width: 80%; text-align: center">Nessun utente seguito</p>
                            </v-container>
                        </div>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn color="danger" text @click="dialogSeguiti = false">Close</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogFollower" scrollable max-width="300px">
                <v-card>
                    <v-card-title>Follower</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text style="height: 300px;" class="pt-3">
                        <usersContainer
                            v-if="followers[0].users.length != 0"
                            :arrayRisultati="followers[0].users"
                        ></usersContainer>
                        <!--EMPTY STATE NON TESTATO-->
                        <div v-else class="d-flex justify-center">
                            <v-container
                                class="d-inline-flex justify-center flex-column align-center"
                                style="border-radius: 50%; height:400px;width:400px; margin:10px"
                            >
                                <svg style="width:150px;height:150px;" viewBox="0 0 24 24">
                                    <path
                                        fill="#ececec"
                                        d="M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H8V4H20M12.5,15A2.5,2.5 0 0,0 15,12.5V7H18V5H14V10.5C13.58,10.19 13.07,10 12.5,10A2.5,2.5 0 0,0 10,12.5A2.5,2.5 0 0,0 12.5,15M4,6H2V20A2,2 0 0,0 4,22H18V20H4"
                                    />
                                </svg>
                                <p style="width: 80%; text-align: center">Nessun Follower</p>
                            </v-container>
                        </div>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn color="danger" text @click="dialogFollower = false">Close</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
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
                <v-col class="col-9 centrata" @click="dialogFollower = true">
                    <p>
                        <a>Follower: {{ followers[0].num }}</a>
                    </p>
                </v-col>
                <v-col class="col-9 centrata" @click="dialogSeguiti = true">
                    <p>
                        <a>Seguiti: {{ following[0].num }}</a>
                    </p>
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
    </v-container>
</template>

<script>
import firebase from 'firebase'
import usersContainer from '../components/usersContainer'
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
            loading: true,
            loaded: [{ step: 0 }],
            dialogSeguiti: false,
            dialogFollower: false,
        }
    },
    components: {
        usersContainer,
    },
    created: function() {
        this.scrollToTop()
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
            var caricato = this.loaded

            userData1
                .get()
                .then(function(querySnapshot) {
                    if (querySnapshot.empty == true) {
                        console.log('no followers')
                        caricato[0].step = caricato[0].step + 1
                    } else {
                        querySnapshot.forEach(function(doc) {
                            console.log(doc.id, ' => ', doc.data())
                            var follower = {
                                email: doc.id,
                                username: doc.data().username,
                            }
                            followers[0].users.push(follower)
                            followers[0].num += 1
                        })
                        caricato[0].step = caricato[0].step + 1
                    }
                })
                .then(() => this.endLoading())
                .catch(function(error) {
                    console.log('Error getting document:', error)
                })

            userData2
                .get()
                .then(function(querySnapshot) {
                    if (querySnapshot.empty == true) {
                        console.log('no following')
                        caricato[0].step = caricato[0].step + 1
                    } else {
                        querySnapshot.forEach(function(doc) {
                            console.log(doc.id, ' => ', doc.data())
                            var followin = {
                                email: doc.id,
                                username: doc.data().username,
                            }
                            following[0].users.push(followin)
                            following[0].num += 1
                        })
                        caricato[0].step = caricato[0].step + 1
                    }
                })
                .then(() => this.endLoading())
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
        scrollToTop() {
            window.scrollTo(0, 0)
        },
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
        endLoading() {
            if (this.loaded[0].step == 2) {
                this.loading = false
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
