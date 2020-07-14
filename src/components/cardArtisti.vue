<template>
    <div
        v-if="mode == 'artista'"
        class="d-flex flex-column"
        style="margin: 0 auto; align-items: center; max-width: 100px"
    >
        <div
            v-if="imageLoad.loaded"
            data-v-2a3b5576
            aria-busy="true"
            aria-live="polite"
            role="alert"
            class="imgContainer v-skeleton-loader mx-0 v-skeleton-loader--is-loading theme--dark"
        >
            <div class="imgLoad v-skeleton-loader__image v-skeleton-loader__bone"></div>
        </div>
        <v-hover v-else v-slot:default="{ hover }">
            <v-img
                :src="artistArray.artistImage"
                style="border-radius:50%"
                :elevation="hover ? 10 : 2"
                alt="Immagine artista"
                :title="artistArray.name"
            ></v-img>
        </v-hover>

        <p class="text-center text--primary ma-2">{{ artistArray.name }}</p>
    </div>
    <div
        v-else
        class="d-flex flex-column"
        style="margin: 0 auto; align-items: center; max-width: 150px"
    >
        <div
            v-if="imageLoad.loaded"
            data-v-2a3b5576
            aria-busy="true"
            aria-live="polite"
            role="alert"
            class="imgContainer v-skeleton-loader mx-0 v-skeleton-loader--is-loading theme--dark"
        >
            <div class="imgLoad v-skeleton-loader__image v-skeleton-loader__bone"></div>
        </div>
        <v-hover v-else v-slot:default="{ hover }">
            <v-img
                :src="artistArray.artistImage"
                style="border-radius:50%"
                :elevation="hover ? 10 : 2"
                alt="Immagine artista"
                :title="artistArray.name"
            ></v-img>
        </v-hover>

        <p class="text-center text--primary ma-2">{{ artistArray.name }}</p>
    </div>
</template>

<script>
import imgLoaderMixin from '../mixins/imgLoaderMixin'
export default {
    name: 'artistCard',
    props: { artistArray: Object, mode: String },
    mixins: [imgLoaderMixin],
    data() {
        return {
            offsety: true,
            imageLoad: { loaded: true },
        }
    },
    created() {
        this.waitImg(this.artistArray.artistImage, this.imageLoad)
    },
}
</script>
<style scoped>
.imgContainer {
    position: relative;
    width: 100%;
}
.imgContainer:before {
    content: '';
    display: block;
    padding-top: 100%; /* initial ratio of 1:1*/
}
.imgLoad {
    height: 100%;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
</style>
