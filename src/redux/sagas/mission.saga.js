import { takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* postMission (action) {
    console.log(action.type);
}



function* missionSaga () {
    yield takeLatest('POST_MISSION_DATA', postMission)
}

export default missionSaga;