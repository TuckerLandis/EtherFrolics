import { takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* getMissions () {
    
    try {
        const missions = yield axios.get('/api/admin/mission');
        console.log('get all', missions.data);
        yield put ({type: 'SET_MISSIONS', payload: missions.data });

    } catch (err) {
        console.log('Error in the get mission saga')
    }
}

function* postMission (action) {
    console.log(action.payload);
    try {
    yield axios.post('api/admin/mission', action.payload)

    } catch (err) {
        console.log('Error in the post mission saga');
    }
}



function* missionSaga () {
    yield takeLatest('FETCH_MISSIONS', getMissions)
    yield takeLatest('POST_MISSION_DATA', postMission)
}

export default missionSaga;