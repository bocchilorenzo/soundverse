<template>
    <v-row no-gutters>
        <v-col v-for="n in albumArray.length" :key="n" cols="12" sm="2">
            <albumCard :albumArray="albumArray[n]" :n="n" />
        </v-col>
    </v-row>
</template>

<script>
import albumCard from './card'

export default {
    name: 'cardContainer',
    props: { albumArray: Array },
    components: { albumCard },
}
</script>

<style></style>
