import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#3769c8',
                primaryCard: "#7196fc",
                danger: colors.red,
                secondary: "#2d96c8",
                error: colors.red.accent3,
                sheet: "#d1ebff"
            },
            dark: {
                primary: '#3769c8',
                primaryCard: "#001a68",
                danger: colors.red,
                secondary: "#2d96c8",
                sheet: colors.grey.darken4
            },
        },
    },
})
