<template>
    <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Cerca album o artisti"
        v-model="input"
        @keyup.enter="cerca()"
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
        cerca() {
            if (this.input != '' && this.prevInput != this.input) {
                this.prevInput = this.input
                this.$router.push({ name: 'search', params: { q: this.input } })
                this.path = this.$route.params.q
            } else {
                console.log('Query vuota')
            }
        },
    },
}
</script>

<style></style>
