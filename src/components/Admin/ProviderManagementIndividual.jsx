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

function 