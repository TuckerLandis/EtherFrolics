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

    switch (action.payload) {
        case 'SET_CREDENTIAL_ENTRY_UPDATE':
            
            return action.payload;
    
        default:
            return state;
    }
}

export default credentialEntry;