import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* getMissions () {
    try {
        const missions = yield axios.get('/api/admin/mission');
        yield put ({ type: 'SET_MISSIONS', payload: missions.data });

    } catch (err) {
        console.log('Error in the get mission saga')
    }
}

function* postMission (action) {
    try {
    yield axios.post('api/admin/mission', action.payload)
    yield put({type: 'FETCH_MISSIONS'})
    } catch (err) {
        console.log('Error in the post mission saga');
    }
}

function* updateMission (action) {
    try{
        yield axios.put(`api/admin/mission/${action.payload.mission_id}`, action.payload);
        yield put({type: 'FETCH_MISSIONS'})
    } catch (err) {
        console.log('Error in the update mission saga', err);
    }
}



function* missionSaga () {
    yield takeLatest('FETCH_MISSIONS', getMissions)
    yield takeLatest('POST_MISSION_DATA', postMission)
    yield takeLatest('UPDATE_MISSION', updateMission)
}

export default missionSaga;