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
            if (this.input != '' && this.prevInput != this.input) {
                this.$store.commit('toggleLoading')
                var path = this.$route.params.q
                if (path != undefined) {
                    this.$router.replace({
                        name: 'search',
                        params: { q: this.input },
                    })
                } else {
                    this.$router.push({
                        name: 'search',
                        params: { q: this.input },
                    })
                }
                this.prevInput = this.input
                this.path = this.$route.params.q
                //window.scrollBy(0, 1)
                if (this.loading == true) {
                    this.$store.commit('toggleLoading')
                }
            } else {
                console.log('Query vuota')
            }
            this.$emit('data', this.input)
        },
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        },
    },
}
</script>

<style></style>
