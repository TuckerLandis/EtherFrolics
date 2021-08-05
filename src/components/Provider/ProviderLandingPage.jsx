import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import ProviderGenItem from './ProviderGenItem';
import ProviderCredItem from './ProviderCredItem';
import ProviderCredEntry from '../Provider/ProviderCredEntry';

/*
CHECKLIST

    [] UseEffect
        [] GET route for relevant info to provider 
            [] Route: /api/provider/:id (where id === req.user.id)
            [] ^^ This will set the provider profile info from DB to the Provider profile reducer state

    [] Page Navigation
        [] REGISTER button
            [] Navigates to Provider Registration form -- path: /providerregistration
        [] View Missions button (Conditionally rendered AFTER a provider has gone through registration)
            [] Navigates to the Provider Mission Table -- path: /mission
            
    [] Provider Profile info display
        [] Conditional rendering
            If a provider has finished the provider registration form:
                [] display provider info obtained from GET route in the UseEffect
            If a provider has not finished provider registration
                [] display a message to indicate registration must be completed by navigating to registration page via Register button
    
    [] EDIT button (Makes all fields on the profile editable)
        [] SAVE button (Rendered after EDIT is clicked)    
            [] Upon clicking save:
                [] dispatch updated info to Provider profile Saga
                [] PUT route will update entire Provider object
    
            
        

*/


function ProviderLandingPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { path, url } = useRouteMatch();

    const user = useSelector(store => store.user);
    //bring in the provider data from the reducer
    // const provider = useSelector(store => store.selectedProvider)

    const provider = useSelector(store => store.providerLandingReducer) // < ---- changed reducer to new provider landing reducer
    //bring in the credential data from the reducer

    const credentialEntry = useSelector(store => store.credentialEntry);

    useEffect( () => {
        dispatch({
            type: 'GET_PROVIDER_LANDING'
        })
    }, []);

    const updateInputConfig = {
        credentialUpdate: [
            {
                inputLabel: 'Credential Taxonomy',
                inputName: 'credentialTaxonomy',
                inputType: 'text'
            },
            {
                inputLabel: 'Licensing Board',
                inputName: 'licensingBoard',
                inputType: 'text'
            },
            {
                inputLabel: 'License Number',
                inputName: 'licenseNumber',
                inputType: 'text'
            },
            {
                inputLabel: 'Date Received',
                inputName: 'dateReceived',
                inputType: 'date'
            },  
            {
                inputLabel: 'Date Renewed',
                inputName: 'dateRenewed',
                inputType: 'date'
            },  
            {
                inputLabel: 'Date Expired',
                inputName: 'dateExpired',
                inputType: 'date'
            }                                  
        ]
    }

    //create a function so that the provider can view upcoming missions
    const viewMissions = () => {
        history.push('/missions')
    }

    //create a function so that the provider can register
    const providerRegister = () => {
        history.push('/generalInfo')
    }

    // function to navigate to add credential page
    const addCredentialNav = () => {
        dispatch({
            type: 'RESET_CREDENTIAL_ENTRY',
            payload: {
                credentialName: '',
                licensingBoard: '',
                licenseNumber: '',
                dateInitial: '',
                dateRenewed: '',
                dateExpiring: '',
                credentialImageKey: ''
            }
        })

        history.push(`${path}/add`)
    }

    console.log(url + '/edit');
    return (
        <div>
            <Typography variant="h3">{user.username}'s Profile</Typography>

            {provider?.registrationComplete ? (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={viewMissions}>View Missions</Button>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={providerRegister}>Register</Button>
            )}
            <Switch>
                <Route exact path={path}>
                    {provider?.registrationComplete ? ( 
                    <div>
                    <Typography align="center" variant="h5">General Info</Typography>
                        
                    <ProviderGenItem provider={provider}/>
                    </div>
                    ) : (
                        <Typography variant="h4">Please register to view upcoming missions</Typography>
                    )}

                    {provider?.registrationComplete ? (
                    <div>
                    <Typography align="center" variant="h5">Credential Info</Typography>
                    <ProviderCredItem provider={provider}/>
                    <Button
                    variant="contained" color="primary" onClick={addCredentialNav} >Add New Credential</Button>
                    </div>
                    ) : (
                    <p></p>
                    )}  
                </Route>
                        
                <Route exact path={`${path}/edit`}>
                    <ProviderCredEntry entryType="edit" provider={ provider } inputConfig={updateInputConfig.credentialUpdate} credentialEntry={credentialEntry} />
                </Route> 
                <Route exact path={`${path}/add`}>
                    <ProviderCredEntry  entryType="add" provider={ provider } inputConfig={updateInputConfig.credentialUpdate} credentialEntry={credentialEntry}/> 
                </Route>
            </Switch>
        </div>
    )
}

export default ProviderLandingPage;