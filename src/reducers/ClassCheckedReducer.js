export default (state = null, action) => {
    switch (action.type) {
        case 'select_class':
            return action.payload;
        default:
            return state;
    }
};