const missionHistoryReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_MISSION_HISTORY_ITEM':
            return [...state, action.payload];
        default:
            return state;
    }
};

export default missionHistoryReducer;