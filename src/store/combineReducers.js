import { combineReducers } from 'redux';
import loginReducer from '../components/Login/reducer';
import routesReducer from '../components/Routes/reducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  user: loginReducer,
  routing: routerReducer,
  routes: routesReducer,
});

export default rootReducer;
