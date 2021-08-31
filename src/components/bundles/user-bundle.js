import api from '../../axios/Api';

export default {
  name: "user",
  getReducer: () => {

    const initialState = {
        user: 'user',

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
          localStorage.setItem('auth', response.data.token);
          localStorage.setItem('user', response.data.user);
          localStorage.setItem('x-access-token-expiration', Date.now() + 2 * 60 * 60 * 1000);
          
          dispatch({
            type: "SET_USER_LVL",
            payload: {
                user: response.data.user ? response.data.user : 'user',
            }
          });  
        })
        .catch((err) => Promise.reject('Authentication Failed!'));
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
    return localStorage.getItem('auth') && localStorage.getItem('user') && localStorage.getItem('x-access-token-expiration') > Date.now();
  },
  init: store => {
    // export function isAuthenticated() {
    //   return localStorage.getItem('auth') && localStorage.getItem('x-access-token-expiration') > Date.now();
    // }
    
    // action creators are bound and attached to store as methods
    //if(false){
      if(!store.selectIsLoggedIn()) {
        store.doLogin()
        return
      }

      store.doSetUserFromLocalStorage()

    //} else {
      //console.log(localStorage.getItem('user'))
      //store.doSetUserFromLocalStorage()
    //}    
  }
};
