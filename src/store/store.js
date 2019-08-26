import Vue from 'vue'
import Vuex from 'vuex'
import SortUtil from '../services/SortUtil'

Vue.use(Vuex)

var su = new SortUtil()

export default new Vuex.Store({
    state: {
        buttons: [],
        lines: 0,
        size: 0,
        showLabels: true,
        playerName: '',
        presses: 0,
        gameStarted: false,
        time: 0,
        timer: null,
        ranking: [],
        gameWon: false
    },
    getters: {
        getButtonToggle: (state) => (payload) => {
            return state.buttons[payload].toggled
        },
        getToggledButtons(state) {
            let amount = 0
            state.buttons.forEach(button => {
                if (button.toggled) {
                    amount++
                }
            })
            return amount
        },
        getShowLabels(state) {
            return state.showLabels
        },
        getButtonAmount(state) {
            return state.size
        },
        getLines(state) {
            return state.lines
        },
        getPlayerName(state) {
            return state.playerName
        },
        getGameStarted(state) {
            return state.gameStarted
        },
        getButtons(state) {
            return state.buttons
        },
        getPresses(state) {
            return state.presses
        },
        getTime(state) {
            return state.time
        },
        getRanking(state) {
            return state.ranking.slice().sort(su.dynamicSort('presses'))
        },
        getGameWon(state) {
            return state.gameWon
        }
    },
    mutations: {
        addButtons(state, payload) {
            state.lines = payload
            let size = payload*payload
            for (let i = 0; i < size; i++) {
                state.buttons.push({
                    id: i,
                    toggled: false
                })
            }
            state.size = size
        },
        setButtonToggle(state, payload) {
            state.buttons[payload].toggled = !state.buttons[payload].toggled
        },
        toggleShowLabel(state) {
            state.showLabels = !state.showLabels
        },
        setPlayerName(state, payload) {
            state.playerName = payload
        },
        setGameState(state, payload) {
            state.gameStarted = payload
        },
        addPress(state) {
            state.presses++
        },
        clearStats(state) {
            state.buttons = []
            state.presses = 0
            state.time = 0
        },
        setTime(state) {
            state.time++
        },
        startTimer(state) {
            state.timer = setInterval(state.setTime, 1000)
        },
        stopTimer(state) {
            state.timer.clearInterval()
        },
        setRankings(state, payload) {
            state.ranking = payload
        },
        pushRanking(state, payload) {
            state.ranking.push(payload)
        },
        setGameWon(state, payload) {
            state.gameWon = payload
        }
    },
    actions: {
        addRanking(context, payload) {
            context.commit('pushRanking', payload)
        },
        loadRanking(context, payload) {
            context.commit('setRankings', payload)
        },
        gameStart(context, payload) {
            context.commit('setPlayerName', payload.name)
            context.commit('addButtons', payload.size)
            context.commit('setGameState', true)
        },
        quitGame(context) {
            context.commit('setGameState', false)
            context.commit('clearStats')
        },
        changeShowLabel(context) {
            context.commit('toggleShowLabel')
        },
        buttonOverseer(context, payload) {
            context.commit('setButtonToggle', payload)
            context.commit('addPress')
            let id = payload
            let lines = context.getters.getLines
            if (id === 0) {
                context.commit('setButtonToggle', lines)
                context.commit('setButtonToggle', 1)
            }
            else if (id === (lines-1)) {
                context.commit('setButtonToggle', lines - 2)
                context.commit('setButtonToggle', lines * 2 - 1)
            }
            else if (id === (lines ** 2)-1) {
                context.commit('setButtonToggle', lines ** 2 - 2)
                context.commit('setButtonToggle', lines * (lines - 1) - 1)
            }
            else if (id === lines * (lines - 1)) {
                context.commit('setButtonToggle', lines * (lines - 1) + 1)
                context.commit('setButtonToggle', lines * (lines - 2))
            }
            else if (id < lines) {
                context.commit('setButtonToggle', id - 1)
                context.commit('setButtonToggle', id + 1)
                context.commit('setButtonToggle', id + lines)
            }
            else if ((id > lines * (lines - 1)) && id < (lines ** 2) - 1) {
                context.commit('setButtonToggle', id - 1)
                context.commit('setButtonToggle', id + 1)
                context.commit('setButtonToggle', id - lines)
            }
            else if (id % lines === 0) {
                context.commit('setButtonToggle', id + 1)
                context.commit('setButtonToggle', id + lines)
                context.commit('setButtonToggle', id - lines)
            }
            else if (id % lines === (lines-1)) {
                context.commit('setButtonToggle', id - 1)
                context.commit('setButtonToggle', id + lines)
                context.commit('setButtonToggle', id - lines)
            }
            else {
                context.commit('setButtonToggle', id - 1)
                context.commit('setButtonToggle', id + 1)
                context.commit('setButtonToggle', id + lines)
                context.commit('setButtonToggle', id - lines)
            }
            if (context.getters.getToggledButtons === context.getters.getButtonAmount) {
                context.commit('setGameWon', true)
            }
        }
    }
})