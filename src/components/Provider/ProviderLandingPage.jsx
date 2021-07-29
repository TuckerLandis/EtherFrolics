import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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

    //bring in the provider name from the reducer
    const provider = useSelector( store => store.providers);

    return(
        <div>
            <h2>Welcome, {provider.firstName} {provider.lastName} </h2>
        </div>


    )
}

export default ProviderLandingPage;

