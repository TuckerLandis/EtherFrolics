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
import ImageViewer from '../ImageComponents/ImageViewer';

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
    }, [params.id])
    // params.id in this array so that when it changes, the page refreshes^

    console.log('Selected provider: ', selectedProvider);

    const soloProviderStatus = () => {

        // don't need ?
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

    // dispatch uses useParams() to get id of selected provider (uses same action.type as ProviderManagementGeneral line 55)
    // bring it back with useSelector, save to variable selectedProvider, line 48
    // map over selectedProvider array (should be just the one provider object inside the array), line 82
    // ^ since there's only ever one selected provider, is there a more efficient way to append their info to the DOM besides mapping over an array?
    // started to create sections to put provider info into, lines 90, 106, 109, 112, 115, 118
    // need to create edit button, work on functionality to conditionally render inputs and populate their values with preexisting data
    // need to set up dispatch for put routes to update provider object
    // need DISABLE functionality for admin - which db column will this change and how?

    // test concat for image path
    const resumePath = `/api/image/ind/${selectedProvider[0]?.resumeKey}`

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

                        {/* test of image get from s3 */}
                        <h1>Provider Resume</h1>
                        {/* works! can make this a light box, also only works atm if a provider has a resume image key, will bug otherwise, need to require the resume submission */}
                        <ImageViewer imagePath={resumePath} />

                        <div>
                            <h1>Provider Credentials</h1>
                            {provider.credential_array.map(credential => {
                                return <p>{credential.credentialName}</p> // needs to be flesched out, but gets data back
                            })}
                        </div>
                        <div>
                            <h1>Provider Work History</h1>
                            {provider.work_experience_array.map(workHistory => {
                                return <p>{workHistory.workplace}</p> // needs to be flesched out, but gets data back
                            })}
                        </div>
                        <div>
                            <h1>Provider Mission History</h1>
                            {provider.mission_experience_array.map(missionExp => {
                                return <p>{missionExp.location}</p> // needs to be flesched out, but gets data back
                            })}
                        </div>
                        <div>
                            <h1>Provider Education</h1>
                            {provider.education_array.map(education => {
                                return <p>{education.institution}</p> // needs to be flesched out, but gets data back
                            })}
                        </div>
                        <div>
                            <h1>Provider Insurance</h1>
                            {provider.insurance_array.map(insurance => {
                                return <p>{insurance.insuranceProvider}</p> // needs to be flesched out, but gets data back
                            })}
                        </div>
                    </div>

                )
            })}
        </div>

    )

}

export default ProviderManagementIndividual;