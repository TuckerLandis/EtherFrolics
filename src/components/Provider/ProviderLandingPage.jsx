import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ProviderGenItem from './ProviderGenItem';
import ProviderCredItem from './ProviderCredItem';

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

    const user = useSelector(store => store.user);
    //bring in the provider data from the reducer
    // const provider = useSelector(store => store.selectedProvider)

    const provider = useSelector(store => store.providerLandingReducer) // < ---- changed reducer to new provider landing reducer
    //bring in the credential data from the reducer

    // useEffect( () => {
    //     dispatch({
    //         type: 'SELECT_PROVIDER',
    //         payload: user.id
    //     })
    // }, []);

    // tl - new dispatch 
    useEffect( () => {
        dispatch({
            type: 'GET_PROVIDER_LANDING'
            // uses req.user.id
        })
    }, []);


    //create a function so that the provider can view upcoming missions
    const viewMissions = () => {
        history.push('/missions')
    }

    //create a function so that the provider can register
    const providerRegister = () => {
        history.push('/generalInfo')
    }


    

    return (
        <div>
            <h2>Welcome,  {user.username} </h2>

            {provider[0]?.registrationComplete ? (
                <Button
                    variant="contained"
                    onClick={viewMissions}>View Missions</Button>
            ) : (
                <Button
                    variant="contained"
                    onClick={providerRegister}>Register</Button>
            )}

            {provider[0]?.registrationComplete ? (  // <------ even though the new reducer is an object, this [0] doesn't bug, i think we can remove this though?
            <div>
            <h2>General Info</h2>
                
               


            {provider.map (() => {
                 return (<ProviderGenItem provider={provider}/>)
            })}

            <Button
            variant="contained">Edit General Info</Button>
            </div>
            ) : (
                <h3>Please register to view upcoming missions</h3>
            )}

            {provider[0]?.registrationComplete ? (
            <div>
            <h2>Credential Info</h2>
        
            {provider.map (() => {
                 return (<ProviderCredItem provider={provider}/>)
            })}
            <Button
            variant="contained">Edit Credentials</Button>
            </div>
            ) : (
            <p></p>

            )}  
        </div>
    )
}

export default ProviderLandingPage;

