<template>
    <v-hover v-slot:default="{ hover }">
        <v-card class="ma-2" max-width="400" :elevation="hover ? 16 : 2">
            <v-img class="align-end" :src="albumArray.cover"> </v-img>

            <v-card-subtitle class="pb-0">
                {{ albumArray.artist }}
            </v-card-subtitle>

            <v-card-text class="text--primary"
                >{{ albumArray.title }}
            </v-card-text>

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
                            <v-list-item-title>hayyy</v-list-item-title>
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
