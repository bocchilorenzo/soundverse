import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.cyan.darken1,
                danger: colors.red,
                secondary: colors.grey.darken1,
                accent: colors.shades.black,
                error: colors.red.accent3,
                sheet: colors.cyan.lighten5
            },
            dark: {
                primary: colors.cyan.darken1,
                danger: colors.red,
                secondary: colors.cyan,
                sheet: colors.grey.darken4
            },
        },
    },
})
