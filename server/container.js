const onlineUsers = [];

const addUser = ({ socketId, userId }) => {
    const existingUser = onlineUsers.find((user) => user.userId === userId);

    if(existingUser) {
        removeUser(userId);
    }

    const user = { socketId, userId };

    onlineUsers.push(user);
}

const removeUser = (id) => {
    const index = onlineUsers.findIndex((user) => user.userId === id);

    if(index !== -1) {
        return onlineUsers.splice(index, 1)[0];
    }
}

const getUser = (id) => onlineUsers.find((user) => user.userId === id);

module.exports = { addUser, removeUser, getUser };