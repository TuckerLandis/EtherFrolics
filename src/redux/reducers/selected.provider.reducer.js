const selectedProvider = (state = [], action) => {
    switch(action.type) {
        case 'SEND_PROVIDER':
            return action.payload;
        default:
            return state;
    }
};

export default selectedProvider;