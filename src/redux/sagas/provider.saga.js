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

function* providerSaga() {
    yield takeLatest('GET_PROVIDERS', getProviders);
}

export default providerSaga;