<template>
    <v-text-field
        v-if="!collapseSearch"
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Cerca
    album, artisti o utenti"
        v-model="input"
        @keyup.enter="search()"
    />
    <v-text-field
        v-else
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Cerca
    album, artisti o utenti"
        v-model="input"
        @keyup.enter="search()"
        :class="{ collapsed: collapse, notCollapsed: !collapse }"
        @focus="collapse = false"
        @blur="collapse = true"
    />
</template>

<script>
import stripHtml from 'string-strip-html'
export default {
    name: 'searchBar',
    data() {
        return {
            input: '',
            prevInput: '',
            collapse: false,
        }
    },
    props: { collapseSearch: Boolean },
    created() {
        this.collapse = this.collapseSearch
    },
    methods: {
        //Avvia la ricerca
        search() {
            var query = ''
            var pathName = this.$route.name
            //se la query è valida aggiorna la view con parametro l'input dell'utente
            if (pathName != 'search') {
                if (this.input != '' && this.input.length > 1) {
                    query = stripHtml(this.input)
                    this.$router.push({
                        name: 'search',
                        params: { q: query },
                    })
                    this.prevInput = this.input
                } else {
                    console.log('Query non valida o campo vuoto. Riprova')
                }
            } else {
                if (this.input != '' && this.prevInput != this.input && this.input.length > 1) {
                    query = stripHtml(this.input)
                    this.$router.replace({
                        name: 'search',
                        params: { q: query },
                    })
                    this.prevInput = query
                } else {
                    console.log('Query non valida o campo vuoto. Riprova')
                }
            }
        },
    },
}
</script>

<style>
.collapsed {
    width: 35%;
}
.notCollapsed {
    width: 100%;
}
</style>
