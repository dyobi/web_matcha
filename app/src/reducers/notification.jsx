const notification = {
    list: [],
    count: 0,
}

const notificationReducer = (state = notification, action) => {
    switch (action.type) {
        case 'NOTIFICATION_LIST':
            return Object.assign({}, state, {
                list: action.payload
            });
        case 'NOTIFICATION_COUNT':
            return Object.assign({}, state, {
                count: action.payload
            });
        default:
            return state;
    }
}

export default notificationReducer;