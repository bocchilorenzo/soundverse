<template>
    <v-card class="mx-auto" max-width="400">
        <v-img
            class="white--text align-end"
            height="200px"
            src="albumArray[n].album.cover"
        >
            <v-card-title>{{ albumArray[n].album.title }}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

        <v-card-text class="text--primary">
            {{ albumArray[n].album.artist }}
        </v-card-text>

        <v-card-actions>
            <v-btn color="orange" text>
                Share
            </v-btn>

            <v-btn color="orange" text>
                Explore
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'albumCard',
    props: { albumArray: Array, n: Number },
}
</script>
