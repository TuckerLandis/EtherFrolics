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
        console.log(action.payload);
        const response = yield axios.get(`/api/provider/ind/${action.payload}`);

        yield put({
            type: 'SEND_PROVIDER',
            payload: response.data
        });

        // yield put({ type: 'GET_PROVIDERS' });
    }
    catch (err) {
        console.log('Error selecting individual provider', err);
    }
} // end selectProvider fn*

function* getProviderLanding(action){

    try{
        console.log('in providerLanding function');
    
    const response = yield axios.get('/api/provider/landing')

    yield put({
        type: 'SET_PROVIDER_LANDING',
        payload: response.data
    });

    }
     catch (error) {
        console.log('error in getProviderLanding Function', error);
        
    }
}

function* providerSaga() {
    yield takeLatest('GET_PROVIDERS', getProviders);
    yield takeLatest('SELECT_PROVIDER', selectProvider);
    yield takeLatest('GET_PROVIDER_LANDING', getProviderLanding);
}

export default providerSaga;