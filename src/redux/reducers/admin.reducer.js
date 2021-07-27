const administrators = (state = [], action) => {
    switch (action.type) {
        case 'SET_ADMIN':
            return action.payload;
        default:
            return state;
    }
};

export default administrators;