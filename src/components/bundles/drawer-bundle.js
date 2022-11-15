import api from '../../axios/Api';
import jwt_decode from "jwt-decode";
import { RepeatOneSharp } from '../../../node_modules/@material-ui/icons';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default {
    name: "user",
    getReducer: () => {
        const initialState = {
            forceMdUp: false,
            width: "0px",
            isSideBarOpen: false
        }

        return (state = initialState, { type, payload }) => {
            switch (type) {
                case 'SET_DRAWER_FROM_LOCAL':
                case 'TOGGLE_SIDE_BAR':
                case 'SET_SIDE_BAR_LG':
                case 'SET_SIDE_BAR_MD':
                case 'SET_SIDE_BAR_OPEN':
                case 'SET_SITE_BAR_CLOSE':
                // case 'USER_LOGOUT':
                // case 'SET_USER_LVL_FROM_LOCAL':
                // case 'TOGGLE_DARK_MODE':
                    return Object.assign({}, state, payload);
                default:
                }

            return state;
        }
    },
    doToggleisSidebarOpen: (val, cascade, silent) => ({ dispatch, store }) => {
        if(store.selectUserIsLoggedIn()){

        const saved = localStorage.getItem("force-mdup")
        const forceMdUp = JSON.parse(saved) || false

        const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
            defaultMatches: true,
            noSsr: false
        });
        const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'), {
            defaultMatches: true,
            noSsr: false
        });
        const smUp = useMediaQuery((theme) => theme.breakpoints.down('md'), {
            defaultMatches: true,
            noSsr: false
        });
        const width = (forceMdUp && !smUp) || (mdUp && !lgUp) ? "72px" : lgUp ? "220px" : "0px"

        dispatch({
            type: 'SET_USER_LVL_FROM_LOCAL',
            payload: {
            forceMdUp: forceMdUp,
            width: width,
            }
        });
        }
    },
    doToggleForceMdUp: () => ({ dispatch, store}) => {
        localStorage.setItem('force-mdup', !store.selectUserDarkMode());

        dispatch({ type: 'TOGGLE_DARK_MODE', payload:{
            darkMode: !store.selectUserDarkMode()
        } })
    },
    doSetUserFromLocalStorage: (val, cascade, silent) => ({ dispatch, store }) => {
        dispatch({
        type: 'SET_DRAWER_FROM_LOCAL',
        payload: {
            user: localStorage.getItem('user'),
            auth: localStorage.getItem('auth'),
            'x-access-token-expiration': localStorage.getItem('x-access-token-expiration'),
            level_name: localStorage.getItem('level-name'),
            user_name: localStorage.getItem('user-name'),
            access: JSON.parse(localStorage.getItem('access')),
            darkMode: JSON.parse(localStorage.getItem('darkMode')),
            district_office: localStorage.getItem('district-office'),
        }
        });
      },
    selectDrawerWidth: state => {
        return state.user.width;
    },
    selectDrawerForceMdUp: state => {
        return state.user.forceMdUp;
    },
    selectIsSideBarOpen: state => {
        return state.user.isSideBarOpen;
    },
    init: store => store.doSetUserFromLocalStorage()
};