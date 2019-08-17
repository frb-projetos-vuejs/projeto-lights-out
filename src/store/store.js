import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        buttons: [],
        presses: 0,
        time: 0
    },
    getters: {
        getButtonToggle: (state) => (payload) => {
            return state.buttons[payload].toggled
        },
        getToggledButtons(state) {
            let amount = 0
            state.buttons.forEach(button => {
                if (button.toggle) {
                    amount++
                }
            });
            return amount
        }
    },
    mutations: {
        setButtonToggle(state, payload) {
            state.buttons[payload].toggled = !state.buttons[payload].toggled
        }
    },
    actions: {
        toggleOverseer(context, payload) {

        }
    }
})