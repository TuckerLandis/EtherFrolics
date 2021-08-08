const providerInformationReducer = (state = {}, action) => {
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

const credentialExpirationReducer = (state = {}, action) => {
    switch (action.type) {
        case 'EXPIRING_WARNING':
            return {...state, [action.payload.index]: action.payload.expiringWarning};
        case 'EXPIRING_URGENT':
                return {...state, [action.payload.credId]: action.payload.expiringUrgent};
        default:
            return state;
    }
}

export default combineReducers({
    providerInformationReducer,
    credentialExpirationReducer
});