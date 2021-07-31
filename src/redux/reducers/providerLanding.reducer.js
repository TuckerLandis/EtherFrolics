const providerLandingReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PROVIDER_LANDING':
            return action.payload;
        default:
            return state;
    }
}

export default providerLandingReducer;