const administrators = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ADMIN':
            return action.payload[0];
        default:
            return state;
    }
};

export default administrators;