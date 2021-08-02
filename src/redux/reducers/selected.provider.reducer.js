const selectedProvider = (state = {}, action) => {
    switch(action.type) {
        case 'SEND_PROVIDER':
            return action.payload[0];
        default:
            return state;
    }
};

export default selectedProvider;