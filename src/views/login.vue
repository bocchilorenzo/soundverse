<template>
    <div>
        <v-container v-if="type == 'login'" class="fill-height" fluid>
            <formLogin v-on:login="emitta" />
        </v-container>
        <v-container v-else class="fill-height" fluid>
            <formSignup v-on:login="emitta" />
        </v-container>
    </div>
</template>

<script>
import formLogin from '../components/formLogin'
import formSignup from '../components/formSignup'
export default {
    name: 'login',
    data() {
        return {
            type: this.$route.name,
        }
    },
    created: function() {
        this.$emit('toggleBurger', 'freccia')
        this.$emit('brand', '')
    },
    components: {
        formLogin,
        formSignup,
    },
    methods: {
        emitta(msg) {
            this.$emit('login', msg)
        },
    },
}
</script>
