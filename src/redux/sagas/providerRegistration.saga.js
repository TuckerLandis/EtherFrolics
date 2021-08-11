import { takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import { put } from "redux-saga/effects";


function* postProvider(action) {
    try {

      yield axios.post('/api/provider', action.payload);

    } catch (error) {

      console.log('Error in providerRegistration saga', error);

    }
  }
  

function* putProviderAddress(action) {
  try {

    yield axios.put('/api/provider/address', action.payload);

  } catch (error) {

    console.log('Error in providerRegistration saga, putProviderAddress', error);

  }
}

function* postWorkHistoryItems(action) {
  try {

    yield axios.post('/api/provider/workhistoryitem', action.payload);

  } catch (error) {

    console.log('Error in providerRegistration saga, addWorkHistoryItem', error);

  }
}

function* putWorkHistory(action) {
  try {

    yield axios.put('/api/provider/workhistory', action.payload);

  } catch (error) {

    console.log('Error in providerRegistration saga, addWorkHistory', error);

  }
}

function* postEducationHistoryItems(action) {
  try {

    yield axios.post('/api/provider/educationhistoryitem', action.payload);

  } catch (error) {

    console.log('Error in providerRegistration saga, addWorkHistory', error);

  }
}

function* putLastMission(action) {
  try{

    yield axios.put('/api/provider/lastmission', action.payload);

  } catch (error) {

    console.log('Error in providerRegistration saga, putLastMission', error);

  }
}

function* postMissionHistoryItems(action){
  try{

    yield axios.post('/api/provider/missionhistoryitem', action.payload);

  } catch (error) {

    console.log('Error in providerRegistration saga, addMissionHistoryItem', error);

    
  }
}

function* postInsuranceItems (action) {
  try {

    yield axios.post('/api/provider/insuranceitem', action.payload);

  } catch (error) {

    console.log('Error in providerRegistration saga, addInsuranceItem', error);

  }
}

function* completeRegistration () {
  try {

    yield axios.put('/api/provider/completeregistration');

    put({
      type: 'GET_PROVIDER_LANDING'
    })

  } catch (error) {

    console.log('error completing registration', error);

  }
}

function* addCredentialHistoryData(action){
  try {

    yield axios.post('/api/provider/credentialhistory', action.payload);

  } catch (error) {

    console.error(`Error in providerRegistration.saga, addCredentialHistoryData ${error}`);

  }
}

function* postImageDB(action) {
  try {

    yield axios.post('/api/image/db', action)

  } catch (error) {

    console.log('error in postImageSaga',error)
    
  }
}

function* providerRegistrationSaga() {
    yield takeLatest('POST_PROVIDER_GENERAL', postProvider);
    yield takeLatest('PUT_PROVIDER_ADDRESS', putProviderAddress);
    yield takeLatest('POST_WORK_HISTORY_ITEMS', postWorkHistoryItems);
    yield takeLatest('PUT_WORK_HISTORY', putWorkHistory);
    yield takeLatest('POST_EDUCATION_HISTORY_ITEMS', postEducationHistoryItems);
    yield takeLatest('PUT_LAST_MISSION', putLastMission);
    yield takeLatest('POST_MISSION_HISTORY_ITEMS', postMissionHistoryItems);
    yield takeLatest('ADD_CREDENTIAL_HISTORY_DATA', addCredentialHistoryData);
    yield takeLatest('POST_INSURANCE_ITEMS', postInsuranceItems);
    yield takeLatest('COMPLETE_REGISTRATION', completeRegistration)
    yield takeLatest('POST_IMAGE_TO_DB', postImageDB)
  }
  
  export default providerRegistrationSaga;