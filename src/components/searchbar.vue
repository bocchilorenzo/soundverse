<template>
    <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Cerca album o artisti"
        v-model="input"
        @keyup.enter="search()"
    />
</template>

<script>
export default {
    name: 'searchBar',
    data() {
        return {
            input: '',
            prevInput: '',
        }
    },
    methods: {
        search() {
            var pathName = this.$route.name
            if (pathName != 'search') {
                if (this.input != '' && this.input.length > 1) {
                    this.$router.push({
                        name: 'search',
                        params: { q: this.input },
                    })
                    this.prevInput = this.input
                } else {
                    console.log('Query non valida o campo vuoto. Riprova')
                }
                //window.scrollBy(0, 1)
            } else {
                if (
                    this.input != '' &&
                    this.prevInput != this.input &&
                    this.input.length > 1
                ) {
                    this.$router.replace({
                        name: 'search',
                        params: { q: this.input },
                    })
                    this.prevInput = this.input
                } else {
                    console.log('Query non valida o campo vuoto. Riprova')
                }
                //window.scrollBy(0, 1)
            }
        },
    },
}
</script>

<style></style>
