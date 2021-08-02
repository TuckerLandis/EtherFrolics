const selectedProvider = (state = {}, action) => {
    switch(action.type) {
        case 'SEND_PROVIDER':
            console.log('individual provider reducer: ', action.payload);
            
            return action.payload[0];
        default:
            return state;
    }
};

export default selectedProvider;