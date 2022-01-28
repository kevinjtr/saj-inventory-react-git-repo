import api from '../../axios/Api';
import jwt_decode from "jwt-decode";
import { RepeatOneSharp } from '../../../node_modules/@material-ui/icons';

export default {
  name: "user",
  getReducer: () => {

    const initialState = {
        user: '',
        user_name:'',
        'x-access-token-expiration':'',
        auth:'',
        loginFailure: false,
        isLoggingIn: false,
        isLoggedOut: false
    }

    return (state = initialState, { type, payload }) => {
        switch (type) {
            case 'LOGIN_REQUEST':
            case 'LOGIN_SUCCESS':
            case 'LOGIN_FAILURE':
            case 'USER_LOGOUT':
            case 'SET_USER_LVL_FROM_LOCAL':
              return Object.assign({}, state, payload);
            default:
          }

      return state;
    }
    },
    // doFetchUserLevel: (val, cascade, silent) => ({ dispatch, store }) => {
    // console.log('userDataCALL')
    // api.get('user').then((response) => response.data).then((data) => {
    //     dispatch({
    //         type: "GET_USER_LVL",
    //         payload: {
    //             user: data.status != 400 ? data.level : 'user',
    //           }
    //       });  
    // });
    // },
    // doFetchLogin: (val, cascade, silent) => ({ dispatch, store }) => {
    //   let login = {sucess: false}
    //   api
    //     .get(`login`)
    //     .then((response) => {
    //       login = {...login, ...response.data, loginFailure: true}
    //     })
    //     .catch((err) => Promise.reject('Authentication Failed!'));

    //     return login
    // },
    doLogin: (val, cascade, silent) => ({ dispatch, store }) => {

      dispatch({
        type: "LOGIN_REQUEST",
        payload: {
            user: '',
            user_name:'',
            auth: '',
            'x-access-token-expiration': '',
            isLoggingIn: true,
            loginFailure: false,
            isLoggedOut: false
        }
      });  

      api
        .get(`login`)
        .then((response) => {
          //const decoded_token = jwt_decode(response.data.token)
          //console.log(decoded_token)
         // const {iat} = decoded_token
          localStorage.setItem('auth', response.data.token);
          localStorage.setItem('user', response.data.user);
          localStorage.setItem('x-access-token-expiration', response.data.exp);//15min token duration.
          localStorage.setItem('user-name', response.data.user_name);

          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
                user: response.data.user,
                user_name: response.data.user_name,
                auth: response.data.token,
                'x-access-token-expiration': response.data.exp,
                isLoggingIn: false,
                loginFailure: false
            }
          }); 

        })
        .catch((err) => {
          localStorage.setItem('auth', '');
          localStorage.setItem('user','');
          localStorage.setItem('x-access-token-expiration','');//15min token duration.
          localStorage.setItem('user-name','');

          dispatch({
            type: "LOGIN_FAILURE",
            payload: {
                user: '',
                user_name:'',
                auth: '',
                'x-access-token-expiration': '',
                isLoggingIn: false,
                loginFailure: true
            }
          }); 
        });
    },
    doLogout: (val, cascade, silent) => ({ dispatch, store }) => {

          localStorage.setItem('auth', '');
          localStorage.setItem('user', '');
          localStorage.setItem('x-access-token-expiration', '');//15min token duration.
          localStorage.setItem('user-name', '');

          dispatch({
            type: 'USER_LOGOUT',
            payload: {
              user: '',
              user_name:'',
              auth: '',
              'x-access-token-expiration': '',
              isLoggingIn: false,
              loginFailure: false,
              isLoggedOut: true
            }
          });

    },
    doSetUserFromLocalStorage: (val, cascade, silent) => ({ dispatch, store }) => {
      if(store.selectUserIsLoggedIn()){
        dispatch({
          type: 'SET_USER_LVL_FROM_LOCAL',
          payload: {
            user: localStorage.getItem('user'),
            auth: localStorage.getItem('auth'),
            'x-access-token-expiration': localStorage.getItem('x-access-token-expiration'),
            user_name: localStorage.getItem('user-name'),
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
  selectUserName: state => {
    return state.user.user_name;
  },
  selectUserRaw: state => {
    return state.user;
  },
  selectUser: state => {
    return state.user.user;
  },
  selectUserToken: state => {
    return state.user.auth;
  },
  selectUserLoginFailure: state => {
    return state.user.loginFailure;
  },
  selectUserIsLoggedIn: state => {
    //console.log(state)
    //console.log(localStorage.getItem('x-access-token-expiration'),localStorage.getItem('auth') , localStorage.getItem('user') , localStorage.getItem('x-access-token-expiration') > Math.floor(Date.now() / 1000))
    return localStorage.getItem('auth') && localStorage.getItem('user') && localStorage.getItem('x-access-token-expiration') > Math.floor(Date.now() / 1000);
    //return !state.user.isLoggingIn && state.user.auth && state.user.user && (state.user['x-access-token-expiration'] > Math.floor(Date.now() / 1000));
  },
  selectUserIsLoggedOut: state => {
    //console.log(localStorage.getItem('x-access-token-expiration'),localStorage.getItem('auth') , localStorage.getItem('user') , localStorage.getItem('x-access-token-expiration') > Math.floor(Date.now() / 1000))
    return state.user.isLoggedOut;
  },
  selectUserIsLoggingIn: state => {
    //console.log(localStorage.getItem('x-access-token-expiration'),localStorage.getItem('auth') , localStorage.getItem('user') , localStorage.getItem('x-access-token-expiration') > Math.floor(Date.now() / 1000))
    return state.user.isLoggingIn;
  },
  init: store => {
    // export function isAuthenticated() {
    //   return localStorage.getItem('auth') && localStorage.getItem('x-access-token-expiration') > Date.now();
    // }
    
    // action creators are bound and attached to store as methods
    //if(false){
      // if(!store.selectUserIsLoggedIn()) {
      //   store.doLogin()
      //   return
      // }

      //console.log(store.selectUserIsLoggedIn())
      store.doSetUserFromLocalStorage()

    //} else {
      //console.log(localStorage.getItem('user'))
      //store.doSetUserFromLocalStorage()
    //}    
  }
};