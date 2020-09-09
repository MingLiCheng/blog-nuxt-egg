export const state = () => ({
    data: {},
    headerTitle:'',
    index: false
})

export const mutations = {
    data (state, data) {
        state.data = data
    },
    isIndex (state) {
        state.index = true
    },
    setHeaderTitle (state, data) {
        state.headerTitle = data
    }
}

export const getters = {
    headerTitle (state){
        return state.headerTitle
    }
}

export const actions = {
    // 默认加载信息
    // async nuxtServerInit({ commit }, { req }) {
    //     const res = await this.$axios.get('info')
    //     commit('data', res.data.body);
    // },
}