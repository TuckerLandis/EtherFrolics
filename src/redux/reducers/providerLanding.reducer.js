const providerLandingReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PROVIDER_LANDING':
            return action.payload[0];
        case 'REGISTRATION_IN_PROGRESS':
            return {registrationComplete: false};
        case 'RESET_PROVIDER_LANDING_OBJ':
            return {};
        default:
            return state;
    }
}

export default providerLandingReducer