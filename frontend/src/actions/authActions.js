import * as types from './actionTypes';
// import { history } from '../helpers/history'

const request = () => {
  return { type: types.SUBMIT_LOGIN }
}

const failure = json => {
  return { type: types.LOGIN_FAILURE, json: json }
}

const success = json => {
  return { type: types.LOGIN_SUCCESS, json: json }
}


export function submitLogin(email, password, history, action = 'login'){
  return dispatch => {
    dispatch(request())

    
    fetch("http://"+process.env.REACT_APP_HOST+"/api/"+action,{
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(json => {
      //console.log(json)
      if(json.status === 'error' ){
        dispatch(failure(json))
      }else{
        dispatch(success(json))
        localStorage.setItem('user', JSON.stringify(json));
        history.push('/dashboard')
        window.location.reload();
      }
    })
    .catch(error => {
      console.error('Error during loading:', error);
    });
  };
}

export function signOut(history){
  localStorage.removeItem('user');
  history.push('/login')
  window.location.reload();
  return { type: types.SIGNOUT_SUCCESS }
}


