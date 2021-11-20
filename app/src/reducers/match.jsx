const match = {
    data: {}
}

const matchReducer = (state = match, action) => {
    switch (action.type) {
        case 'MATCH_DATA':
            return Object.assign({}, state, {
                data: action.payload
            });
        default:
            return state;
    }
}

export default matchReducer;