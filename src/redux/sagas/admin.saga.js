import { takeLatest } from '@redux-saga/core/effects';
import axios from 'axios';
import { put } from 'redux-saga/effects';

function* getAdmin() {
    try {
        const response = yield axios.get('/api/admin');

        yield put({
            type: 'SET_ADMIN',
            payload: response.data
        });
    }
    catch (err) {
        console.log('Error getting admin info', err);
    }
} // end getAdmin fn*

function* adminSaga() {
    yield takeLatest('GET_ADMIN', getAdmin);
}

export default adminSaga;