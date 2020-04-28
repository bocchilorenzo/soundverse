<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
            <v-list dense>
                <router-link to="/">
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Home</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
                <router-link to="/about">
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>mdi-contact-mail</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Contact</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="indigo" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title class="mr-5">Application</v-toolbar-title>
            <v-spacer />
            <v-text-field
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Cerca album o artisti"
                v-model="input"
                @keyup.enter="cerca()"
            />
        </v-app-bar>

        <v-content>
            <router-view></router-view>
        </v-content>
        <v-footer color="indigo" app>
            <span class="white--text">&copy; 2019</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    props: {
        source: String,
    },
    data() {
        return {
            drawer: false,
            input: '',
            prevInput: '',
        }
    },
    methods: {
        cerca() {
            if (this.input != '' && this.prevInput != this.input) {
                this.prevInput = this.input
                this.$router.push({ name: 'search', params: { q: this.input } })
            } else {
                console.log('Query vuota')
            }
        },
    },
}
</script>
