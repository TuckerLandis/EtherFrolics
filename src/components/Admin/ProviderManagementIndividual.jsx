// ## Checklist

// - [ ]  UseEffect to get provider info
// - [ ]  Provider info (possible GET route to provider table)
//     - [ ]  Name
//     - [ ]  Email
//     - [ ]  Most recent mission
//     - [ ]  Credentials (possible separate GET route)
//         - [ ]  List all creds
//     - [ ]  Availability date range
// - [ ]  Deactivate button
//     - [ ]  Deactivates provider in db
//     - [ ]  Put
// - [ ]  Approve
//     - [ ]  Verifies provider in db
//     - [ ]  Put

// # Component(s)

// - [ ]  Display all info for specific provider (using id sent from provider management page)
// - [ ]  Deactivate Button
//     - [ ]  deactivate function lives inside
//     - [ ]  takes id of provider
//     - [ ]  sends put route to update their verified boolean (false) column in Provider table
// - [ ]  Verify Button
//     - [ ]  handle verify function lives inside
//     - [ ]  takes id of provider
//     - [ ]  sends put route to update their verified boolean (true) column in Provider table

// # Route(s)

// - [ ]  GET - specific provider (using id sent from provider management page)
//     - [ ]  SELECT all for specific user
// - [ ]  PUT - Provider table
//     - [ ]  deactivate
// - [ ]  PUT - Provider table
//     - [ ]  verify

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function ProviderManagementIndividual() {

    const dispatch = useDispatch();
    const history = useHistory();

    const selectedProvider = useSelector(store => store.selectedProvider);

    const params = useParams();

    useEffect(() => {
        dispatch({
            type: 'SELECT_PROVIDER',
            payload: params.id
        })
    }, [])

    console.log('Selected provider: ', selectedProvider);

    const soloProviderStatus = () => {
        if (selectedProvider[0]?.soloProvider == true) {
            return(
                <p>Yes</p>
            )
        } else {
            return(
                <p>No</p>
            )
        }
    } // end soloProviderStatus

    return (

        <div>
            {selectedProvider?.map((provider) => {
                return (

                    <div key={provider?.provider_id}>
                        <div>
                            <h1>Provider General Information</h1>
                            <h2>Name: {provider?.firstName} {provider?.lastName}</h2>
                            <p>{provider?.DOB}</p>
                            <h3>Contact Info</h3>
                            <p>{provider?.emailAddress}</p>
                            <p>{provider?.streetAddress}</p>
                            <p>{provider?.city}</p>
                            <p>{provider?.state}</p>
                            <p>{provider?.zipCode}</p>
                            <h3>Provider Role</h3>
                            <p>{provider?.providerRole}</p>
                            <h3>Comfortable Filling a Solo Provider Role?</h3>
                            {soloProviderStatus()}
                            
                        </div>
                        <div>
                            <h1>Provider Credentials</h1>
                        </div>
                        <div>
                            <h1>Provider Work History</h1>
                        </div>
                        <div>
                            <h1>Provider Mission History</h1>
                        </div>
                        <div>
                            <h1>Provider Education</h1>
                        </div>
                        <div>
                            <h1>Provider Insurance</h1>
                        </div>
                    </div>

                )
            })}
        </div>

    )

}

export default ProviderManagementIndividual;