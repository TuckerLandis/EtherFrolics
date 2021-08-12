import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import ProviderGenItem from './ProviderGenItem';
import ProviderCredItem from './ProviderCredItem';
import ProviderCredEntry from '../Provider/ProviderCredEntry';

import './ProviderLanding.css';

function ProviderLandingPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { path } = useRouteMatch();

    const user = useSelector(store => store.user);
    //bring in the provider data from the reducer
    // const provider = useSelector(store => store.selectedProvider)

    const provider = useSelector(store => store.providerLandingReducer)
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

    const today = new Date()

    const threeMonthsFromToday = new Date(today.getFullYear(),today.getMonth() + 3, today.getDate());

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

    return (
        <div className="providerProfile">
            <div className="profileContainer">
                <div className="profileHeader">
                    <Typography variant="h3">{user.username}'s Profile</Typography>
                    <hr></hr>
                </div>

                {provider?.registrationComplete ? (
                    <div className="registeredProfile">
                        <Button
                        variant="contained"
                        color="secondary"
                        onClick={viewMissions}>View Missions</Button>

                        <Switch>
                            <Route exact path={path}>
                                <div>
                                    <Typography align="center" variant="h5">General Info</Typography>
                                
                                    <ProviderGenItem provider={provider}/>
                                </div>

                                <div className="credSection">
                                    <Typography align="center" variant="h5">Credential Info</Typography>
                                    <ProviderCredItem provider={provider} threeMonthsFromToday={threeMonthsFromToday} />
                                    <Button
                                    variant="contained" color="primary" size="large" onClick={addCredentialNav} >Add New Credential</Button>
                                </div>

                            </Route>
                                
                            <Route exact path={`${path}/edit`}>
                                <ProviderCredEntry entryType="edit" provider={ provider } inputConfig={updateInputConfig.credentialUpdate} credentialEntry={credentialEntry} />
                            </Route> 
                            <Route exact path={`${path}/add`}>
                                <ProviderCredEntry  entryType="add" provider={ provider } inputConfig={updateInputConfig.credentialUpdate} credentialEntry={credentialEntry}/> 
                            </Route>
                        </Switch>
                    </div>
                ) : (
                <div className="general-form-display">
                    <div className="unregisteredProfile">
                    <Typography variant="h4" align="center" >Please register to view upcoming missions</Typography>
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={providerRegister}>Register</Button>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default ProviderLandingPage;