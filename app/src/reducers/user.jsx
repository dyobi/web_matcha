const user = {
    data: {},
    tag1: [],
    tag2: [],
    suggest1: [],
    suggest2: [],
    isComplete: true,
}

const userReducer = (state = user, action) => {
    switch (action.type) {
        case 'USER_DATA':
            return Object.assign({}, state, {
                data: action.payload
            });
        case 'USER_TAG1':
            return Object.assign({}, state, {
                tag1: action.payload
            });
        case 'USER_TAG2':
            return Object.assign({}, state, {
                tag2: action.payload
            });
        case 'USER_SUGGEST1':
            return Object.assign({}, state, {
                suggest1: action.payload
            });
        case 'USER_SUGGEST2':
            return Object.assign({}, state, {
                suggest2: action.payload
            });
        case 'USER_ISCOMPLETE':
            return Object.assign({}, state, {
                isComplete: action.payload
            });
        default:
            return state;
    }
}

export default userReducer;