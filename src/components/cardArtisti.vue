<template>
    <div class="d-flex flex-column ma-2" style="align-items: center; max-width: 200px">
        <v-hover v-slot:default="{ hover }">
            <v-img
                :src="artistArray.artistImage"
                style="border-radius:50%"
                :elevation="hover ? 10 : 2"
            ></v-img>
        </v-hover>

        <p class="text-center text--primary ma-2">
            {{ artistArray.name }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'artistCard',
    props: { artistArray: Object },
    data() {
        return {
            offsety: true,
        }
    },
}
</script>
<style scoped></style>
