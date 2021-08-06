const administrators = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ADMIN':
            return action.payload[0];
        case 'RESET_ADMIN':
            return {};
        default:
            return state;
    }
};

export default administrators;