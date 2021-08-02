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

// function* addWorkHistoryItem(action) {
//   try {
//     yield axios.post('/api/provider/workhistoryitem', action.payload)
//   } catch (error) {
//     console.log('Error in providerRegistration saga, addWorkHistoryItem', error);
//   }
// }

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

function* addInsuranceItem (action) {
  console.log(action.payload);
  try {
    yield axios.post('/api/provider/insuranceitem', action.payload)
  } catch (error) {
    console.log('Error in providerRegistration saga, addInsuranceItem', error);
  }
}



function* completeRegistration (action) {
  console.log('completing registration');

  try {
    yield axios.put('/api/provider/completeregistration')
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
    // yield takeLatest('ADD_WORK_HISTORY_ITEM', addWorkHistoryItem);
    yield takeLatest('PUT_WORK_HISTORY', putWorkHistory);
    yield takeLatest('ADD_EDUCATION_HISTORY_ITEM', addEducationHistoryItem);
    yield takeLatest('PUT_LAST_MISSION', putLastMission);
    yield takeLatest('ADD_MISSION_HISTORY_ITEM', addMissionHistoryItem);

    yield takeLatest('ADD_CREDENTIAL_HISTORY_DATA', addCredentialHistoryData);
    yield takeLatest('ADD_INSURANCE_ITEM', addInsuranceItem);
    yield takeLatest('COMPLETE_REGISTRATION', completeRegistration)
   

    yield takeLatest('POST_IMAGE_TO_DB', postImageDB)
  }
  
  export default providerRegistrationSaga;