import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import administrators from './admin.reducer';
import providers from './provider.reducer';
import selectedProvider from './selected.provider.reducer';
import mission from './mission.reducer';
import editMission from './editMission.reducer';
import providerLandingReducer from './providerLanding.reducer';
import workHistoryReducer from './workHistory.reducer';
import missionHistoryReducer from './missionHistory.reducer';
import educationHistoryReducer from './educationHistory.reducer'
import credentialHistoryReducer from './credentialHistory.reducer';
import insuranceItemReducer from './insuranceItem.reducer';
import credentialEntry from './credentialEntry.reducer';
import homeStepper from './homeStepper.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  administrators,
  homeStepper,
  providers,
  selectedProvider,
  mission,
  editMission,
  providerLandingReducer,
  workHistoryReducer,
  missionHistoryReducer,
  educationHistoryReducer,
  credentialHistoryReducer,
  insuranceItemReducer,
  credentialEntry
});

export default rootReducer;
