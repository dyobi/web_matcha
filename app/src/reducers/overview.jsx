const overview = {
    graph: [],
    followers: [],
    following: [],
    blocks: [],
}

const overviewReducer = (state = overview, action) => {
    switch (action.type) {
        case 'OVERVIEW_GRAPH':
            return Object.assign({}, state, {
                graph: action.payload
            });
        case 'OVERVIEW_FOLLOWERS':
            return Object.assign({}, state, {
                followers: action.payload
            });
        case 'OVERVIEW_FOLLOWING':
            return Object.assign({}, state, {
                following: action.payload
            });
        case 'OVERVIEW_BLOCKS':
            return Object.assign({}, state, {
                blocks: action.payload
            });
        default:
            return state;
    }
}

export default overviewReducer;