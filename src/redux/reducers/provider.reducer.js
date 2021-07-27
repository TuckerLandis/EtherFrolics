const providers = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROVIDERS':
            return action.payload;
        default:
            return state;
    }
}

export default providers;