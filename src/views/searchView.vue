<template>
    <div>
        <v-tabs fixed-tabs background-color="indigo" dark style="width: 100%">
            <v-tab>
                Album
            </v-tab>
            <v-tab>
                Artisti
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs">
            <v-tabs-item>
                <v-card flat>
                    <cardContainer :arrayRisultati="albumSearch" />
                </v-card>
            </v-tabs-item>
            <v-tabs-item
                ><v-card flat
                    ><p>{{ artistsSearch }}</p></v-card
                ></v-tabs-item
            >
        </v-tabs-items>
    </div>
</template>

<script>
import cardContainer from '../components/cardcontainer'
export default {
    name: 'search',
    data() {
        return {
            tabs: null,
        }
    },
    components: {
        cardContainer,
    },
    props: {
        albumSearch: Array,
        artistsSearch: Array,
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        },
    },
}
</script>
