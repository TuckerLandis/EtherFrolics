// ## Checklist

// - [ ]  Search bar
//     - [ ]  Filter by
//         - [ ]  verified
//         - [ ]  unverified
// - [ ]  Function to attach flag icon button (stretch)
// - [ ]  Provider List
//     - [ ]  get route to all providers
//     - [ ]  map over to list them out
//     - [ ]  Flag icon
//         - [ ]  for expiring certs
//     - [ ]  Star icon
//         - [ ]  for verified providers
// - [ ]  On-Click fn
//     - [ ]  Clicking provider name sends user to 2.4.1b along with provider info

// # Component(s)

// - [ ]  Provider Management System
//     - [ ]  List of Providers

// # Route(s)

// - [ ]  GET - Provider table
//     - [ ]  SELECT all from user
//     - [ ]  JOIN all our other tables

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// css
import './ProviderManagementGeneral.css';

function ProviderManagementGeneral() {

    const dispatch = useDispatch();
    const history = useHistory();

    const providers = useSelector(store => store.providers);

    useEffect(() => {
        dispatch({ type: 'GET_PROVIDERS' });
    }, []);

    return(

        <p>In Provider Mgmt (Gen)</p>

    )

} // end ProviderManagementGeneral

export default ProviderManagementGeneral