<template>
    <v-container>
        <v-sheet v-if="loading" class="pa-2 centraRadius" width="80%" color="sheet">
            <v-row>
                <v-col class="col-9 centrata">
                    <v-skeleton-loader
                        ref="skeleton"
                        type="image"
                        max-width="250px"
                        min-width="100px"
                        class="my-2"
                    ></v-skeleton-loader>
                </v-col>
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
                    <v-skeleton-loader ref="skeleton" type="text" width="100px" class="my-2"></v-skeleton-loader>
                </v-col>
                <v-col class="col-9 centrata">
                    <v-skeleton-loader ref="skeleton" type="text" width="100px" class="my-2"></v-skeleton-loader>
                </v-col>
                <v-col class="col-9 centrata">
                    <v-skeleton-loader ref="skeleton" type="text" width="100px" class="my-2"></v-skeleton-loader>
                </v-col>
                <v-col class="col-9 centrata">
                    <v-skeleton-loader ref="skeleton" type="text" width="100px" class="my-2"></v-skeleton-loader>
                </v-col>
                <v-col class="col-9 centrata">
                    <v-skeleton-loader ref="skeleton" type="button" class="my-2"></v-skeleton-loader>
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
                    <v-skeleton-loader ref="skeleton" type="text" width="100px" class="my-2"></v-skeleton-loader>
                </v-col>
                <v-col class="col-9 centrata">
                    <v-skeleton-loader ref="skeleton" type="text" width="100px" class="my-2"></v-skeleton-loader>
                </v-col>
                <v-col class="col-9 centrata">
                    <v-skeleton-loader ref="skeleton" type="button" class="my-2"></v-skeleton-loader>
                </v-col>
            </v-row>
        </v-sheet>
        <v-sheet
            v-else
            class="pa-2 centraRadius"
            :class="{ small: wide, large: !wide }"
            color="sheet"
        >
            <v-dialog
                v-model="dialogSeguiti"
                scrollable
                max-width="300px"
                overlay-color="secondary"
            >
                <v-card>
                    <v-card-title>Seguiti</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text style="height: 300px;" class="pt-3">
                        <usersContainer
                            v-if="following[0].users.length != 0"
                            :arrayRisultati="following[0].users"
                        ></usersContainer>
                        <div v-else class="d-flex justify-center">
                            <v-container
                                class="d-inline-flex justify-center flex-column align-center"
                                style="border-radius: 50%; margin:10px"
                            >
                                <svg style="width:150px;height:150px;" viewBox="0 0 24 24">
                                    <path
                                        fill="2d96c8"
                                        d="M12,4A4,4 0 0,1 16,8C16,9.95 14.6,11.58 12.75,11.93L8.07,7.25C8.42,5.4 10.05,4 12,4M12.28,14L18.28,20L20,21.72L18.73,23L15.73,20H4V18C4,16.16 6.5,14.61 9.87,14.14L2.78,7.05L4.05,5.78L12.28,14M20,18V19.18L15.14,14.32C18,14.93 20,16.35 20,18Z"
                                    />
                                </svg>
                                <p style="width: 80%; text-align: center">Nessun utente seguito.</p>
                            </v-container>
                        </div>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn
                            color="danger"
                            text
                            @click="dialogSeguiti = false"
                            name="Chiudi dialog"
                        >Chiudi</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog
                v-model="dialogFollower"
                scrollable
                max-width="300px"
                overlay-color="secondary"
            >
                <v-card>
                    <v-card-title>Follower</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text style="height: 300px;" class="pt-3">
                        <usersContainer
                            v-if="followers[0].users.length != 0"
                            :arrayRisultati="followers[0].users"
                        ></usersContainer>
                        <div v-else class="d-flex justify-center">
                            <v-container
                                class="d-inline-flex justify-center flex-column align-center"
                                style="border-radius: 50%;  margin:10px"
                            >
                                <svg style="width:150px;height:150px;" viewBox="0 0 24 24">
                                    <path
                                        fill="2d96c8"
                                        d="M12,4A4,4 0 0,1 16,8C16,9.95 14.6,11.58 12.75,11.93L8.07,7.25C8.42,5.4 10.05,4 12,4M12.28,14L18.28,20L20,21.72L18.73,23L15.73,20H4V18C4,16.16 6.5,14.61 9.87,14.14L2.78,7.05L4.05,5.78L12.28,14M20,18V19.18L15.14,14.32C18,14.93 20,16.35 20,18Z"
                                    />
                                </svg>
                                <p style="width: 80%; text-align: center">Nessun follower.</p>
                            </v-container>
                        </div>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn
                            color="danger"
                            text
                            @click="dialogFollower = false"
                            name="Chiudi dialog"
                        >Chiudi</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-row v-if="user != null">
                <v-col class="col-9 centrata">
                    <v-img
                        alt="Immagine profilo"
                        height="250"
                        width="250"
                        style="margin: 0!important"
                        :src="src.src"
                        title="Immagine profilo"
                    ></v-img>
                </v-col>
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
                    <v-form ref="logout">
                        <v-btn
                            rounded
                            color="danger"
                            @click="logout()"
                            name="Effettua logout"
                        >Logout</v-btn>
                    </v-form>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row v-if="user != null">
                <v-col class="col-9 centrata">
                    <h2>Modifica informazioni</h2>
                </v-col>
                <!--
                <v-col class="col-9 centrata">
                    <v-text-field v-model="newUsername" label="Modifica username"></v-text-field>
                </v-col>
                -->
                <v-col class="col-9 centrata">
                    <v-form ref="form">
                        <v-file-input
                            id="proPic"
                            :rules="rules"
                            accept="image/jpeg"
                            placeholder="Modifica l'immagine"
                            chips
                            prepend-icon="mdi-camera"
                            label="Foto profilo"
                        ></v-file-input>
                        <v-btn
                            rounded
                            color="primary"
                            @click="modifica()"
                            name="Modifica informazioni"
                        >Modifica</v-btn>
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
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import usersContainer from '../components/usersContainer'
export default {
    name: 'profile',
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user')),
            usernameDB: localStorage.getItem('username'),
            username: '',
            //newUsername: '',
            following: [{ num: 0, users: [] }],
            followers: [{ num: 0, users: [] }],
            seguito: false,
            loading: true,
            loaded: [{ step: 0 }],
            dialogSeguiti: false,
            dialogFollower: false,
            src: { src: '' },
            rules: [
                value =>
                    !value ||
                    value.size < 1000000 ||
                    "Le dimensioni dell'immagine non devono superare 1 MB",
            ],
            wide: false,
        }
    },
    components: {
        usersContainer,
    },
    created: function() {
        this.$emit('toggleBurger', 'freccia')
        this.$emit('brand', '')
        this.scrollToTop()
        if (this.user == null) {
            this.$router.replace({ name: 'login' })
        } else {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs':
                    this.wide = true
                    break
                case 'sm':
                    this.wide = true
                    break
                case 'md':
                    this.wide = false
                    break
                case 'lg':
                    this.wide = false
                    break
                case 'xl':
                    this.wide = false
                    break
            }
            //preleva l'immagine profilo dell'utente attualmente loggato dallo storage di firebase, i follower e i seguiti
            var storage = firebase.storage()
            var pathReference = storage.ref('profile')
            var src = this.src
            var username = this.usernameDB
            pathReference
                .child('/' + username + '/profile.jpg')
                .getDownloadURL()
                .then(function(url) {
                    src.src = url
                })
                .catch(() => this.setDefaultPic(storage, src))

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
                        //console.log('no followers')
                        caricato[0].step = caricato[0].step + 1
                    } else {
                        querySnapshot.forEach(function(doc) {
                            //console.log(doc.id, ' => ', doc.data())
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
                        //console.log('no following')
                        caricato[0].step = caricato[0].step + 1
                    } else {
                        querySnapshot.forEach(function(doc) {
                            // console.log(doc.id, ' => ', doc.data())
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
    },
    methods: {
        //funzione per settare l'immagine profilo di default nel caso in cui l'utente non ne ha impostata una
        setDefaultPic(storage, src) {
            var pathReference = storage.ref('profile')
            pathReference
                .child('/default.jpg')
                .getDownloadURL()
                .then(function(url) {
                    src.src = url
                })
        },
        //Ricolloca lo scrolling all'inizio
        scrollToTop() {
            window.scrollTo(0, 0)
        },
        //Modifica l'immagine di profilo, prima modificava anche l'username ma avremmo avuto problemi con lo storage
        modifica() {
            //var db = firebase.firestore()
            if (this.$refs.form.validate()) {
                var storage = firebase.storage()
                var pathReference = storage.ref('profile')
                if (document.getElementById('proPic').files[0] == undefined) {
                    this.$emit('login', 'Niente da modificare')
                } else {
                    let file = document.getElementById('proPic').files[0]
                    let metadata = {
                        contentType: 'image/jpeg',
                        name: 'profile',
                    }
                    let usr1 = this.username
                    pathReference
                        .child('/' + usr1 + '/' + 'profile.jpg')
                        .put(file, metadata)
                        .then(() => this.set(/*true, 'img'*/))
                }
            } else {
                this.$emit('login', 'Errore: immagine troppo grande')
            }
            /*
            //Metodo che controlla se l'username è uguale a quello di prima, se è vuoto o meno e se è già presente nel db
            if (this.newUsername == this.username) {
                alert('Username uguale al precedente')
            } else {
                if (this.newUsername == '' || this.newUsername[0] == ' ') {
                    if (document.getElementById('proPic').files[0] == undefined) {
                        alert('Niente da modificare')
                    } else {
                        let file = document.getElementById('proPic').files[0]
                        let metadata = {
                            contentType: 'image/jpeg',
                            name: 'profile',
                        }
                        let usr1 = this.username
                        pathReference
                            .child('/' + usr1 + '/' + 'profile.jpg')
                            .put(file, metadata)
                            .then(() => this.set(true, 'img'))
                        //inserire snackbar di successo
                    }
                } else {
                    if (document.getElementById('proPic').files[0] == undefined) {
                        let usr = this.newUsername
                        let userData = db.collection('utenti')
                        let isPresent = false
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
                            .then(() => this.set(isPresent, 'username'))
                    } else {
                        let file = document.getElementById('proPic').files[0]
                        let metadata = {
                            contentType: 'image/jpeg',
                            name: 'profile',
                        }
                        let usr1 = this.username
                        pathReference
                            .child('/' + usr1 + '/' + 'profile.jpg')
                            .put(file, metadata)
                            .then(() => this.set(true, 'img'))
                        //inserire snackbar di successo
                        let usr = this.newUsername
                        let userData = db.collection('utenti')
                        let isPresent = false
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
                            .then(() => this.set(isPresent, 'username'))
                    }
                }
            }
            */
        },
        //Imposta la nuova src per l'immagine
        set(/*isPresent, mode*/) {
            var storage = firebase.storage()
            var pathReference = storage.ref('profile')
            var src = this.src
            var username = this.usernameDB
            pathReference
                .child('/' + username + '/profile.jpg')
                .getDownloadURL()
                .then(function(url) {
                    src.src = url
                })
                .then(() => this.update('', 'img'))
        },
        //Metodo usato all'inizio per prelevare l'username dal db
        getUsername() {
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
                .then(() => this.update(usr, 'initial'))
        },
        //Aggiorna l'username all'inizio e poi esegue un emit per la snackbar in caso di cambio immagine
        update(usr, mode) {
            if (mode == 'img') {
                this.scrollToTop()
                this.$emit('login', 'Immagine modificata correttamente')
            } else {
                this.username = usr
                localStorage.setItem('username', this.username)
            }
        },
        //Esegue il logout
        async logout() {
            try {
                await firebase.auth().signOut()
                //alert('Logout effettuato!')
                this.$emit('login', 'Logout effettuato')
                this.$router.replace({ name: 'home' })
                localStorage.removeItem('user')
                localStorage.removeItem('username')
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
    },
}
</script>

<style scoped>
.centrata {
    margin: 0 auto;
}

.centraRadius {
    margin: 2em auto;
    border-radius: 1em;
}
.large {
    width: 80%;
}
.small {
    width: 100%;
}
</style>
