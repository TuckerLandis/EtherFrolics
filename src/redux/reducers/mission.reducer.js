const mission = (state = [], action) => {
    switch (action.type) {
        case 'SET_MISSIONS':
            return action.payload;
        default:
            return state;
    }
}

export default mission;