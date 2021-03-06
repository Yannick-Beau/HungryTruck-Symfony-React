import { combineReducers } from 'redux';

// on importe tous les reducers
import createUserReducer from './createUserReducer';
import editUserReducer from './editUserReducer';
import logInReducer from './logInReducer';
import newFoodTruckReducer from './newFoodTruckReducer';
import searchReducer from './searchReducer';
import toolsReducer from './toolsReducer';
import contactUs from './ContactReducer';
import newTimeReducer from './NewTimeReducer';
import deleteReducer from './deleteReducer';
import mapReducer from './mapReducer';
import faqReducer from './faqReducer';
// etc

// le reducer principal, qui regroupe les autres
// combineReducers prend en argument un objet qui indique un nom pour
// chaque reducer
const rootReducer = combineReducers({
  createUser: createUserReducer,
  logIn: logInReducer,
  search: searchReducer,
  tools: toolsReducer,
  newFT: newFoodTruckReducer,
  contactUs: contactUs,
  newTime: newTimeReducer,
  editUser: editUserReducer,
  deleteReducer: deleteReducer,
  map: mapReducer,
  faq: faqReducer,
  // etc
});

export default rootReducer;
