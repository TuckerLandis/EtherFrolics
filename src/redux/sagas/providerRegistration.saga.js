import { takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* postProvider(action) {
    try {
      yield axios.post('/api/provider', action.payload);
    } catch (error) {
      console.log('Error in providerRegistration saga', error);
    }
  }
  

function* putProviderAddress(action) {
  try {
    yield axios.put('/api/provider/address', action.payload)
  } catch (error) {
    console.log('Error in providerRegistration saga, putProviderAddress', error);
  }
}

function* addWorkHistoryItem(action) {
  try {
    yield axios.post('/api/provider/workhistoryitem', action.payload)
  } catch (error) {
    console.log('Error in providerRegistration saga, addWorkHistoryItem', error);
  }
}

function* putWorkHistory(action) {
  try {
    yield axios.put('/api/provider/workhistory', action.payload)
  } catch (error) {
    console.log('Error in providerRegistration saga, addWorkHistory', error);
  }
}

function* addEducationHistoryItem(action) {
  try {
    yield axios.post('/api/provider/educationhistoryitem', action.payload)
  } catch (error) {
    console.log('Error in providerRegistration saga, addWorkHistory', error);
  }
}

function* putLastMission(action) {
  try{
    yield axios.put('/api/provider/lastmission', action.payload)
  } catch (error) {
    console.log('Error in providerRegistration saga, putLastMission', error);
  }
}

function* addMissionHistoryItem(action){
  try{
    yield axios.post('/api/provider/missionhistoryitem', action.payload)
  } catch (error) {
    console.log('Error in providerRegistration saga, addMissionHistoryItem', error);
    
  }
}



  function* providerRegistrationSaga() {
    yield takeLatest('POST_PROVIDER_GENERAL', postProvider);
    yield takeLatest('PUT_PROVIDER_ADDRESS', putProviderAddress);
    yield takeLatest('ADD_WORK_HISTORY_ITEM', addWorkHistoryItem);
    yield takeLatest('PUT_WORK_HISTORY', putWorkHistory);
    yield takeLatest('ADD_EDUCATION_HISTORY_ITEM', addEducationHistoryItem);
    yield takeLatest('PUT_LAST_MISSION', putLastMission);
    yield takeLatest('ADD_MISSION_HISTORY_ITEM', addMissionHistoryItem)
   
  }
  
  export default providerRegistrationSaga;