import { takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* postMission (action) {
    console.log(action.payload);
    try {
    yield axios.post('api/admin/mission', action.payload)

    } catch (err) {
        console.log('Error in the post mission saga');
    }
}



function* missionSaga () {
    yield takeLatest('POST_MISSION_DATA', postMission)
}

export default missionSaga;