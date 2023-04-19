export default {
    initlist(state, newlist) {
        state.listtype_annees = newlist
    },
    initheader(state, newlist) {
        state.headertype_annees = newlist
    },
    initdetail(state, newtype_annee) {
        state.detailtype_annee = newtype_annee
    },
    removeItem(state,payload) {
        state.listtype_annees = state.listtype_annees.filter(item => item.id != payload)
    }
}