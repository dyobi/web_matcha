const ui = {
    color: '#F44336',
    landing: 0,
    nav: 0,
}

const uiReducer = (state = ui, action) => {
    switch (action.type) {
        case 'UI_COLOR':
            return Object.assign({}, state, {
                color: action.payload
            });
        case 'UI_LANDING':
            return Object.assign({}, state, {
                landing: action.payload
            });
        case 'UI_NAV':
            return Object.assign({}, state, {
                nav: action.payload
            });
        default:
            return state;
    }
}

export default uiReducer;