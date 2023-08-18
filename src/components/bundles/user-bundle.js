import api from '../../axios/Api';
//import jwt_decode from "jwt-decode";
//import { RepeatOneSharp } from '../../../node_modules/@mui/icons-material';
//import useMediaQuery from '@mui/material/useMediaQuery';

export default {
  name: "user",
  getReducer: () => {

    const initialState = {
        user: '',
        level_name:'',
        user_name:'',
        'x-access-token-expiration':'',
        auth:'',
        loginFailure: false,
        isLoggingIn: false,
        isLoggingOut: false,
        isLoggedOut: false,
        access: {},
        loginMessage: "",
        darkMode:false,
        district_office:''
    }

    return (state = initialState, { type, payload }) => {
        switch (type) {
            case 'LOGIN_REQUEST':
            case 'LOGIN_SUCCESS':
            case 'LOGIN_FAILURE':
            case 'USER_LOGOUT':
            case 'SET_USER_LVL_FROM_LOCAL':
            case 'TOGGLE_DARK_MODE':
              return Object.assign({}, state, payload);
            default:
          }

      return state;
    }
    },
    // doFetchUserLevel: (val, cascade, silent) => ({ dispatch, store }) => {
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
      const user_prefers_dark_mode = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      
      dispatch({
        type: "LOGIN_REQUEST",
        payload: {
            user: '',
            level_name:'',
            user_name:'',
            auth: '',
            'x-access-token-expiration': '',
            isLoggingIn: true,
            loginFailure: false,
            isLoggedOut: false,
            access: {},
            district_office:''
        }
      });  

      api
        .get(`login`)
        .then((response) => {

         if(response.data.token){
          window.localStorage.setItem('auth', response.data.token);
          window.localStorage.setItem('user', response.data.user);
          window.localStorage.setItem('x-access-token-expiration', response.data.exp);//token duration.
          window.localStorage.setItem('level-name', response.data.level_name);
          window.localStorage.setItem('user-name', response.data.user_name);
          window.localStorage.setItem('access', JSON.stringify(response.data.access));
          window.localStorage.setItem('district-office', response.data.district_office);
          window.localStorage.setItem('notifications', response.data.notifications);

          const saved = window.localStorage.getItem("darkMode");
			    const initialDarkModeValue = JSON.parse(saved) || user_prefers_dark_mode;
          window.localStorage.setItem('darkMode', initialDarkModeValue);

          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
                user: response.data.user,
                level_name: response.data.level_name,
                user_name: response.data.user_name,
                auth: response.data.token,
                'x-access-token-expiration': response.data.exp,
                isLoggingIn: false,
                loginFailure: false,
                loginMessage:response.data.message,
                access: response.data.access,
                darkMode: initialDarkModeValue,
                district_office: response.data.district_office
            }
          }); 
         }else{
          window.localStorage.setItem('auth', '');
          window.localStorage.setItem('user','');
          window.localStorage.setItem('x-access-token-expiration','');//15min token duration.
          window.localStorage.setItem('user-name','');
          window.localStorage.setItem('level-name','');
          window.localStorage.setItem('access', JSON.stringify({}));
          window.localStorage.setItem('district-office', '');
          window.localStorage.setItem('notifications', '');

          dispatch({
            type: "LOGIN_FAILURE",
            payload: {
                user: '',
                level_name:'',
                user_name:'',
                auth: '',
                'x-access-token-expiration': '',
                isLoggingIn: false,
                loginFailure: true,
                loginMessage:response.data.message,
                access: {},
                district_office: ''
            }
          }); 
         }


        })
        .catch((err) => {
          window.localStorage.setItem('auth', '');
          window.localStorage.setItem('user','');
          window.localStorage.setItem('x-access-token-expiration','');//15min token duration.
          window.localStorage.setItem('user-name','');
          window.localStorage.setItem('level-name','');
          window.localStorage.setItem('access', JSON.stringify({}));
          window.localStorage.setItem('district-office', '');
          window.localStorage.setItem('notifications', '');

          dispatch({
            type: "LOGIN_FAILURE",
            payload: {
                user: '',
                level_name:'',
                user_name:'',
                auth: '',
                'x-access-token-expiration': '',
                isLoggingIn: false,
                loginFailure: true,
                loginMessage:'a server error occured.',
                access: {},
                district_office: ''
            }
          }); 
        });
    },
    doLogout: (val, cascade, silent) => ({ dispatch, store }) => {

      window.localStorage.setItem('auth', '');
      window.localStorage.setItem('user', '');
      window.localStorage.setItem('x-access-token-expiration', '');//15min token duration.
      window.localStorage.setItem('user-name', '');
      window.localStorage.setItem('level-name','');
      window.localStorage.setItem('access', JSON.stringify({}));
      window.localStorage.setItem('district-office', '');
      window.localStorage.setItem('notifications', '');
      
          dispatch({
            type: 'USER_LOGOUT',
            payload: {
              user: '',
              level_name:'',
              user_name:'',
              auth: '',
              'x-access-token-expiration': '',
              isLoggingIn: false,
              isLoggingOut: true,
              loginFailure: false,
              isLoggedOut: true,
              access: JSON.stringify({}),
              darkMode: false,
              district_office: ''
            }
          });

    },
    doSetUserFromLocalStorage: (val, cascade, silent) => ({ dispatch, store }) => {
      if(store.selectUserIsLoggedIn()){
        dispatch({
          type: 'SET_USER_LVL_FROM_LOCAL',
          payload: {
            user: window.localStorage.getItem('user'),
            auth: window.localStorage.getItem('auth'),
            'x-access-token-expiration': window.localStorage.getItem('x-access-token-expiration'),
            level_name: window.localStorage.getItem('level-name'),
            user_name: window.localStorage.getItem('user-name'),
            access: JSON.parse(window.localStorage.getItem('access')),
            darkMode: JSON.parse(window.localStorage.getItem('darkMode')),
            district_office: window.localStorage.getItem('district-office'),
          }
        });
      }
    },
    doToggleDarkMode: () => ({ dispatch, store}) => {
      window.localStorage.setItem('darkMode', !store.selectUserDarkMode());

        dispatch({ type: 'TOGGLE_DARK_MODE', payload:{
          darkMode: !store.selectUserDarkMode()
        } })
    },
    // getUserByID: (val, cascade, silent) => ({ dispatch, store }) => {
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
  selectUserLevelName: state => {
    return state.user.level_name;
  },
  selectUserDistrictOffice: state => {
    return state.user.district_office;
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
  selectUserLoginMessage: state => {
    return state.user.loginMessage;
  },
  selectUserAccess: state => {
    return state.user.access;
  },
  selectUserIsLoggedIn: state => {
    return window.localStorage.getItem('auth') != "" && window.localStorage.getItem('user') != "" && window.localStorage.getItem('x-access-token-expiration') > Math.floor(Date.now() / 1000);
  },
  selectUserIsLoggedOut: state => {
    return state.user.isLoggedOut;
  },
  selectUserIsLoggingIn: state => {
    return state.user.isLoggingIn;
  },
  selectUserIsLoggingOut: state => {
     return state.user.isLoggingOut;
  },
  selectUserDarkMode: state => {
    return state.user.darkMode;
  },
  init: store => {
    // export function isAuthenticated() {
    //   return window.localStorage.getItem('auth') && window.localStorage.getItem('x-access-token-expiration') > Date.now();
    // }
    
    // action creators are bound and attached to store as methods
    //if(false){
      // if(!store.selectUserIsLoggedIn()) {
      //   store.doLogin()
      //   return
      // }

      store.doSetUserFromLocalStorage()

    //} else {
      //store.doSetUserFromLocalStorage()
    //}    
  }
};