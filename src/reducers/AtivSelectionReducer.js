export default (state = null, action) => {
    switch (action.type) {
        case 'select_atividade':
            return action.payload;
        default:
            return state;
    }
};
