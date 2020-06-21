<template>
    <div
        v-if="mode == 'artista'"
        class="d-flex flex-column"
        style="margin: 0 auto; align-items: center; max-width: 100px"
    >
        <v-hover v-slot:default="{ hover }">
            <v-img
                :src="artistArray.artistImage"
                style="border-radius:50%"
                :elevation="hover ? 10 : 2"
            ></v-img>
        </v-hover>

        <p class="text-center text--primary ma-2">{{ artistArray.name }}</p>
    </div>
    <div
        v-else
        class="d-flex flex-column"
        style="margin: 0 auto; align-items: center; max-width: 150px"
    >
        <v-hover v-slot:default="{ hover }">
            <v-img
                :src="artistArray.artistImage"
                style="border-radius:50%"
                :elevation="hover ? 10 : 2"
            ></v-img>
        </v-hover>

        <p class="text-center text--primary ma-2">{{ artistArray.name }}</p>
    </div>
</template>

<script>
export default {
    name: 'artistCard',
    props: { artistArray: Object, mode: String },
    data() {
        return {
            offsety: true,
        }
    },
}
</script>
<style scoped></style>
