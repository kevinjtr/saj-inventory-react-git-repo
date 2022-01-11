import api from '../../axios/Api';
import jwt_decode from "jwt-decode";

export default {
  name: "user",
  getReducer: () => {

    const initialState = {
        user: '',
        'x-access-token-expiration':'',
        auth:'',
    }

    return (state = initialState, { type, payload }) => {
        switch (type) {
            case 'GET_USER_LVL':
            case 'SET_USER_LVL':
            case 'SET_USER_LVL_FROM_LOCAL':
              return Object.assign({}, state, payload);
            default:
          }

      return state;
    }
    },
    doFetchUserLevel: (val, cascade, silent) => ({ dispatch, store }) => {
    console.log('userDataCALL')
    api.get('user').then((response) => response.data).then((data) => {
        dispatch({
            type: "GET_USER_LVL",
            payload: {
                user: data.status != 400 ? data.level : 'user',
              }
          });  
    });
    },
    doLogin: (val, cascade, silent) => ({ dispatch, store }) => {
      api
        .get(`login`)
        .then((response) => {
          //const decoded_token = jwt_decode(response.data.token)
          //console.log(decoded_token)
         // const {iat} = decoded_token
          localStorage.setItem('auth', response.data.token);
          localStorage.setItem('user', response.data.user);
          localStorage.setItem('x-access-token-expiration', response.data.exp);//15min token duration.
          
          dispatch({
            type: "SET_USER_LVL",
            payload: {
                user: response.data.user ? response.data.user : 'user',
                auth: response.data.token,
                'x-access-token-expiration': response.data.exp
            }
          });  
        })
        .catch((err) => Promise.reject('Authentication Failed!'));
    },
    doLogout: (val, cascade, silent) => ({ dispatch, store }) => {

          localStorage.setItem('auth', '');
          localStorage.setItem('user', '');
          localStorage.setItem('x-access-token-expiration', Date.now());//15min token duration.
          
          dispatch({
            type: 'SET_USER_LVL_FROM_LOCAL',
            payload: {
                user: localStorage.getItem('user')
            }
          });

    },
    doSetUserFromLocalStorage: (val, cascade, silent) => ({ dispatch, store }) => {
      if(store.selectIsLoggedIn()){
        dispatch({
          type: 'SET_USER_LVL_FROM_LOCAL',
          payload: {
              user: localStorage.getItem('user')
          }
        });
      }
    },
    // getUserByID: (val, cascade, silent) => ({ dispatch, store }) => {
    //     console.log('userDataCALL')
    //     this.userData = api.get(`user/${val}`).then((response) => response.data).then((data) => {
    //         dispatch({
    //             type: "GET_USER_BY_ID",
    //             payload: {
    //                 user: data.status != 400 ? data.values : data,
    //             }
    //         });  
    //     });  
    // },
  selectUser: state => {
    return state.user.user;
  },
  selectIsLoggedIn: state => {
    console.log(localStorage.getItem('x-access-token-expiration'),localStorage.getItem('auth') , localStorage.getItem('user') , localStorage.getItem('x-access-token-expiration') > Math.floor(Date.now() / 1000))
    return localStorage.getItem('auth') && localStorage.getItem('user') && localStorage.getItem('x-access-token-expiration') > Math.floor(Date.now() / 1000);
  },
  init: store => {
    // export function isAuthenticated() {
    //   return localStorage.getItem('auth') && localStorage.getItem('x-access-token-expiration') > Date.now();
    // }
    
    // action creators are bound and attached to store as methods
    //if(false){
      // if(!store.selectIsLoggedIn()) {
      //   store.doLogin()
      //   return
      // }

      store.doSetUserFromLocalStorage()

    //} else {
      //console.log(localStorage.getItem('user'))
      //store.doSetUserFromLocalStorage()
    //}    
  }
};
