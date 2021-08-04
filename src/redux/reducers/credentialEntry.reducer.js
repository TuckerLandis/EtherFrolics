const credentialEntry = 
    (state = {
        licensingBoard: '', 
        credentialName: '', 
        licenseNumber: '', 
        dateInitial: '', 
        dateRenewed: '', 
        dateExpiring: '', 
        credentialImageKey: ''
    }, action) => {

    switch (action.type) {
        case 'SET_CREDENTIAL_ENTRY_UPDATE':
            
            return action.payload;

        case 'RESET_CREDENTIAL_ENTRY':
            
            return action.payload;   
        default:
            return state;
    }
}

export default credentialEntry;