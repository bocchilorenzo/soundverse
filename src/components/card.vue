<template>
    <v-hover v-slot:default="{ hover }" style="max-width: 200px">
        <v-card class="ma-2" max-width="400" :elevation="hover ? 10 : 2">
            <router-link
                :to="{
                    name: 'album',
                    path: '/album/:id',
                    params: { id: albumArray.albumId },
                    props: true,
                }"
            >
                <v-img class="align-end" :src="albumArray.cover"></v-img>

                <v-card-subtitle class="pb-0">
                    {{ albumArray.artist }}
                </v-card-subtitle>

                <v-card-text class="text--primary">
                    {{ albumArray.title }}
                </v-card-text>
            </router-link>

            <v-card-actions>
                <v-menu
                    bottom
                    right
                    transition="slide-y-transition"
                    :offset-y="offsety"
                >
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item>
                            <v-list-item-title
                                >Aggiungi ai preferiti</v-list-item-title
                            >
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title
                                >Segna come ascoltato</v-list-item-title
                            >
                        </v-list-item>
                        <v-list-item>
                            <!--Non so come chiamare la watchlist-->
                            <v-list-item-title
                                >Aggiungi alla "watchlist"</v-list-item-title
                            >
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-card-actions>
        </v-card>
    </v-hover>
</template>

<script>
export default {
    name: 'albumCard',
    props: { albumArray: Object },
    data() {
        return {
            offsety: true,
        }
    },
}
</script>
<style scoped></style>
