const workHistoryReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_WORK_HISTORY_ITEM':
            return [...state, action.payload];
        default:
            return state;
    }
};

export default workHistoryReducer;