export default function credentialHistoryReducer(state = [], action){
    switch (action.type) {
        case 'ADD_CREDENTIAL_OBJECT':
            return [...state, action.payload];
    
        default:
            return state;
    };
}