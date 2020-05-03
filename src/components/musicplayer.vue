<template>
    <!--mettere npm i vuetify-audio per utilizzarlo-->
    <vuetify-audio
        :file="file"
        color="indigo"
        :autoPlay="autoPlay"
        :ended="audioFinish"
        v-on:hide="audioFinish"
    ></vuetify-audio>
</template>

<script>
import VuetifyAudio from 'vuetify-audio'
export default {
    name: 'musicPlayer',
    components: { VuetifyAudio },
    props: { file: String },
    data() {
        return {
            autoPlay: true,
            hidePlayer: false,
        }
    },
    methods: {
        audioFinish() {
            this.$emit('hide', this.hidePlayer)
        },
    },
}
</script>

<style></style>
