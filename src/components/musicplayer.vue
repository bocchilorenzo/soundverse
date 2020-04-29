<template>
    <!--mettere npm i vuetify-audio per utilizzarlo-->
    <vuetify-audio
        :file="file"
        color="success"
        :ended="audioFinish"
        :autoPlay="autoPlay"
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
        }
    },
}
</script>

<style></style>
