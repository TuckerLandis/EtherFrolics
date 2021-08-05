const providerLandingReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROVIDER_LANDING':
            return action.payload[0];
        default:
            return state;
    }
}

export default providerLandingReducer;