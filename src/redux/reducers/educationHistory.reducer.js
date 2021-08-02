const educationHistoryReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_EDUCATION_HISTORY_ITEM':
            return [...state, action.payload];
        default:
            return state;
    }
};

export default educationHistoryReducer;