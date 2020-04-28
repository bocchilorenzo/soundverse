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
            <searchBar />
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
import searchBar from './components/searchbar'

export default {
    name: 'App',
    props: {
        source: String,
    },
    components: { searchBar },
    data() {
        return {
            drawer: false,
        }
    },
}
</script>
