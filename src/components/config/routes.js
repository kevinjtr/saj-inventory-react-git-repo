import Eng4900 from '../Eng4900';
import Dashboard from '../Dashboard';
import Equipment from '../Equipment';
import Help from '../Help';
import Hra from '../Hra';
import Employee from '../Employee';
import AnnualInventory from '../AnnualInventory';
import ViewAnnualInventory from '../ViewAnnualInventory';
import ChangeHistory from '../ChangeHistory';
import ProblemReportViewer from '../ProblemReportViewer';
import RegistrationViewer from '../RegistrationViewer';
import NotFound from '../forms/NotFound'
import {filter} from 'lodash'
import SignInOut from '../../containers/SignInOut'
import {Tab} from '@mui/material'
import LogoutConfirm from '../LogoutConfirm';
import {Route, Link, Redirect, Switch} from "react-router-dom";
import PrivateRoute from '../PrivateRoute'
import AuthorizedUsers from '../AuthorizedUsers'
import Account from '../Account';
import {Home as HomeIcon, Help as HelpIcon, Devices as DevicesIcon, Inventory as InventoryIcon, SupervisorAccount as SupervisorAccountIcon, Badge as BadgeIcon,
    Description as DescriptionIcon, QuestionAnswer as QuestionAnswerIcon, Groups as GroupsIcon, History as HistoryIcon, HowToReg as HowToRegIcon} from "@mui/icons-material"
// import HomeIcon from '@mui/icons-material/Home'
// import HelpIcon from '@mui/icons-material/Help';
//import DevicesIcon from '@mui/icons-material/Devices';
//import InventoryIcon from '@mui/icons-material/Inventory';
//import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
//import BadgeIcon from '@mui/icons-material/Badge';
//import DescriptionIcon from '@mui/icons-material/Description';
//import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
//import GroupsIcon from '@mui/icons-material/Groups';
//import HistoryIcon from '@mui/icons-material/History';
//import HowToRegIcon from '@mui/icons-material/HowToReg';
import { NavItem } from '../navbar/nav-item';
import { NavItem as NavItemSmall } from '../navbar/nav-item-small';


export const routes_config = [
    {path:'/dashboard',alias:'dashboard',label:'Dashboard',component:Dashboard,icon:<HomeIcon/>,tab:true,level:'user',type:'private'},
    {path:'/login',alias:'login',label:'Log In',component:SignInOut,tab:false,level:'user',type:'public'},
    {path:'/account',alias:'Account',label:'Account',component:Account,tab:false,level:'user',type:'private'}, 
    {path:'/equipment',alias:'equipment',label:'Equipment',component:Equipment,icon:<DevicesIcon/>,tab:true,level:'user',type:'private'},
    {path:'/annualinventory',alias:'annualinventory',label:'Annual Inventory',component:AnnualInventory,icon:<InventoryIcon/>,tab:true,level:'admin',type:'private'},
    {path:'/annualinventory/:id',alias:'annualinventory',label:' View Annual Inventory',component:ViewAnnualInventory,tab:false,level:'admin',type:'private'},
    {path:'/hra',label:'HRA',alias:'hra',component:Hra,icon:<SupervisorAccountIcon/>,tab:true,level:'user',type:'private'},
    {path:'/employee',alias:'employee',label:'Employee',component:Employee,icon:<BadgeIcon/>,tab:true,level:'user',type:'private'},
    {path:'/eng4900',alias:'eng4900',label:'Eng 4900',component:Eng4900,icon:<DescriptionIcon/>,tab:true,level:'admin',type:'private'},
    {path:'/problemreportviewer',alias:'admin',label:'Problem Report Viewer',component:ProblemReportViewer,icon:<QuestionAnswerIcon/>,tab:true,level:'admin',type:'private'},
    {path:'/authorizedusers', alias: 'authorizedusers', label: 'My Authorized Users', component: AuthorizedUsers, icon:<GroupsIcon/>, tab:true, level: 'admin', type: 'private' },
    {path:'/changehistory',alias:'changehistory',label:'Change History',component:ChangeHistory,icon:<HistoryIcon/>,tab:true,level:'admin',type:'private'},
    {path:'/registrationviewer',alias:'registrationviewer',label:'Pending Registrations', alt_label:'Pending Regis- trations', component:RegistrationViewer,icon:<HowToRegIcon/>,tab:true,level:'admin',type:'private'},
    //{path:'/help',alias:'help',label:'Help',component:Help,icon:<HelpIcon/>,tab:true,level:'user',type:'private'},
    {path:'/404',alias:'404',label:'Not Found',component:NotFound,tab:false,type:'public'},
    {path:'/Logout',alias:'logout',label:'Logout Successful',component:LogoutConfirm,tab:false,level:'user',type:'public'}
]

export const routes = routes_config.map((route, i) => {

    if(route.type == 'private'){
        return (
            <PrivateRoute exact id={`app-route-${i}`} key={`app-route-${i}`} name={route.alias} path={route.path} component={route.component}/>
        )
    }

    if(route.path == '/login'){
        return (
            <PrivateRoute exact id={`app-route-${i}`} key={`app-route-${i}`} title ={"hellou"} name={route.alias} path={route.path} component={route.component}/>
        )
    }

    return (
        <Route exact id={`app-route-${i}`} key={`app-route-${i}`} path={route.path} component={route.component}/>
    )
})

export const routes_tabs = (user_access, theme, props=null) => {
    const return_routes = {
        routes:[],
        tabs:[]
    }

    //Tabs are created
    const route_with_tabs = filter(routes_config, function(r){
        if(r.hasOwnProperty('alias')){
            if(Object.keys(user_access).indexOf(r.alias) > -1){
                return r.tab && user_access[r.alias].view 
            }else{
                return false
            }
        }

        return r.type == "public" && r.tab
    })

    // sx={{color:"black",height:"25px", minHeight:"25px",fontSize:"10px",minWidth:'50px',
    // '&:active':{color:'black'},
    // '&:hover':{backgroundColor:'rgba(0, 0, 0,0.1)',textDecoration:'none',color:'black'}}}

    // sx={{height:"25px", minHeight:"25px",fontSize:"10px",minWidth:'50px',
    // '&:hover':{textDecoration:'none'}}}

    return_routes.tabs = route_with_tabs.map((route, i) => 
        <Tab {...props} id={`app-tab-${i}`} key={`app-tab-${i}`} label={route.label} value={route.path} component={Link} to={route.path} 
        
        // sx={{height:"25px", minHeight:"25px",fontSize:"10px",minWidth:'50px',
        // '&:hover':{textDecoration:'none'}}} 
        
        sx={{color:theme.palette.text.primary,height:"25px", minHeight:"25px",fontSize:"10px",minWidth:'50px',
        '&:active':{color:'black'},
        '&:hover':{backgroundColor:theme.palette.action.hover,textDecoration:'none',color:theme.palette.text.secondary}}}

        />
        /*<li style={{paddingRight: '18px', whiteSpace: "nowrap"}}>
            <Link to={route.path} className="nav-link">
                {route.label}
            </Link>
        </li>*/)

    //Routes are created
    // const access_routes = filter(routes_config, function(r){
    //     if(r.hasOwnProperty('alias')){
    //         if(r.type == "private" && Object.keys(user_access).indexOf(r.alias) > -1){
    //             console.log(user_access[r.alias],user_access[r.alias].view)
    //             return user_access[r.alias].view
    //         }
    //     }
        
    //     return r.type == "public"
    //  })

     return_routes.routes = routes_config.map((route, i) => {

        if(route.type == 'private'){
            return (
                <PrivateRoute exact id={`app-route-${i}`} key={`app-route-${i}`} name={route.alias} path={route.path} component={route.component}/>
            )
        }
    
        if(route.path == '/login'){
            return (
                <PrivateRoute exact id={`app-route-${i}`} key={`app-route-${i}`} name={route.alias} path={route.path} component={route.component}/>
            )
        }
    
        return (
            <Route exact id={`app-route-${i}`} key={`app-route-${i}`} path={route.path} component={route.component}/>
        )
    })

    return return_routes
}

export const routes_tabs_new = (user_access, props) => {
    const return_routes = {
        routes:[],
        tabs:[],
        small_tabs:[]
    }

    //Tabs are created
    const route_with_tabs = filter(routes_config, function(r){
        if(r.hasOwnProperty('alias')){
            if(Object.keys(user_access).indexOf(r.alias) > -1){
                return r.tab && user_access[r.alias].view 
            }else{
                return false
            }
        }

        return r.type == "public" && r.tab
    })

    return_routes.tabs = route_with_tabs.map((item, i) => 
        <NavItem
        key={item.label}
        icon={item.icon}
        href={item.path}
        title={item.alt_label ? item.alt_label : item.label}
        {...props}
        />
    )

    return_routes.small_tabs = route_with_tabs.map((item, i) => 
        <NavItemSmall
        key={item.label}
        icon={item.icon}
        href={item.path}
        title={item.alt_label ? item.alt_label : item.label}
        {...props}
        />
    )

     return_routes.routes = routes_config.map((route, i) => {

        if(route.type == 'private'){
            return (
                <PrivateRoute exact id={`app-route-${i}`} key={`app-route-${i}`} name={route.alias} path={route.path} component={route.component}/>
            )
        }
    
        if(route.path == '/login'){
            return (
                <PrivateRoute exact id={`app-route-${i}`} key={`app-route-${i}`} name={route.alias} path={route.path} component={route.component}/>
            )
        }
    
        return (
            <Route exact id={`app-route-${i}`} key={`app-route-${i}`} path={route.path} component={route.component}/>
        )
    })

    return return_routes
}