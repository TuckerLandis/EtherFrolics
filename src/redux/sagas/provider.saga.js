import { takeLatest } from '@redux-saga/core/effects';
import axios from 'axios';
import { put } from 'redux-saga/effects';

function* getProviders() {
    try{
        const response = yield axios.get('/api/provider');

        yield put({
            type: 'SET_PROVIDERS',
            payload: response.data
        })
    }
    catch (err) {
        console.log('Error getting provider info', err); 
    }
} // end getProviders fn*

function* selectProvider(action){
    try{

        const response = yield axios.get(`/api/provider/ind/${action.payload}`);

        yield put({
            type: 'SEND_PROVIDER',
            payload: response.data
        });

    }
    catch (err) {
        console.log('Error selecting individual provider', err);
    }
} // end selectProvider fn*

function* getProviderLanding(){

    try{
    
    const response = yield axios.get('/api/provider/landing')

    if (response.data[0] === undefined) {

        yield put({
            type: 'REGISTRATION_IN_PROGRESS'
        });

    } else {

        yield put({
            type: 'SET_PROVIDER_LANDING',
            payload: response.data
        });

    }

    }
    catch (error) {
        console.log('error in getProviderLanding Function', error);
        
    }
}// end getProviderLanding fn*

function* updateProvider(action) {

    try {

        if (action.payload.table === 'credential') {

           yield axios.put(`/api/provider/update/credential/${action.payload.userId}/${action.payload.credentialId}`, action.payload);

        } else {

            yield axios.put(`/api/provider/update/${action.payload.userId}/${action.payload.providerId}`, action.payload);

        }

        yield put({
            type: 'GET_PROVIDER_LANDING'
        })
        
    } 
    
    catch (error) {
        
        console.error(`Error in editProvider saga ${error}`);

    }
}// end updateProvider fn*

function* verifyProvider(action) {

    try {

        yield axios.put(`api/provider/verify/${action.payload}`);

    }
    catch (error) {

        console.error('Error verifying provider: ', error);

    }
}// end verifyProvider fn*

function* disableProvider(action) {

    try {

        yield axios.put(`api/provider/disable/${action.payload}`);

    }
    catch (error) {

        console.error('Error disabling provider: ', error);

    }
}// end disableProvider fn*

function* providerSaga() {
    yield takeLatest('GET_PROVIDERS', getProviders);
    yield takeLatest('SELECT_PROVIDER', selectProvider);
    yield takeLatest('GET_PROVIDER_LANDING', getProviderLanding);
    yield takeLatest('UPDATE_PROVIDER', updateProvider);
    yield takeLatest('VERIFY_PROVIDER', verifyProvider);
    yield takeLatest('DISABLE_PROVIDER', disableProvider);
}

export default providerSaga;