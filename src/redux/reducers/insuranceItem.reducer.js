const insuranceItemReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_INSURANCE_ITEM':
            return [...state, action.payload];
        default:
            return state;
    }
};

export default insuranceItemReducer;