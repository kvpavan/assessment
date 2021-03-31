import initialState from '../store/initialState';
import { SUBMIT_LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, SIGNOUT_SUCCESS } from '../actions/actionTypes';

export default function auth(state = initialState, action) {
  let newState = Object.assign({}, {...state})

  switch (action.type) {
    case SUBMIT_LOGIN:
      newState.isLoading = true
      return newState

    case LOGIN_FAILURE:
      //console.log(action.json.error)
      newState.isLoading = false
      if(action.json.error){
        newState.loginError = "There was an issue signing you in, please check that email and password are correct."
      }else{
        newState.loginError = action.json.message
      }
      return newState;

    case LOGIN_SUCCESS:
      newState.isLoading = false
      newState.loginError = null
      return newState

    case SIGNOUT_SUCCESS:
      return state;

    default:
      return state;
  }
}
