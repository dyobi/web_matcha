const detail = {
    data: {},
    tag1: [],
    tag2: [],
}

const detailReducer = (state = detail, action) => {
    switch (action.type) {
        case 'DETAIL_DATA':
            return Object.assign({}, state, {
                data: action.payload
            });
        case 'DETAIL_TAG1':
            return Object.assign({}, state, {
                tag1: action.payload
            });
        case 'DETAIL_TAG2':
            return Object.assign({}, state, {
                tag2: action.payload
            });
        default:
            return state;
    }
}

export default detailReducer;