import { takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* postProvider(action) {
    try {

      yield axios.post('/api/provider', action.payload);

    } catch (error) {
      console.log('Error in providerRegistration saga', error);
    }
  }
  
  function* providerRegistrationSaga() {
    yield takeLatest('POST_PROVIDER_GENERAL', postProvider);
   
  }
  
  export default providerRegistrationSaga;