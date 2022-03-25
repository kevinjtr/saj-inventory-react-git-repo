import React from 'react';
import Eng4900 from '../Eng4900';
import Eng4900FormContainer from '../../containers/Eng4900Form';
import Home from '../Home';
import Equipment from '../Equipment';
import Hra from '../Hra';
import Employee from '../Employee';
import AnnualInventory from '../AnnualInventory';
import ViewAnnualInventory from '../ViewAnnualInventory';
import ChangeHistory from '../ChangeHistory';
import Eng4844 from '../Eng4844';
import FindEng4844 from '../FindEng4844';
import ProblemReport from '../ProblemReport';
import ProblemReportViewer from '../ProblemReportViewer';
import NotFound from '../forms/NotFound'
import {filter} from 'lodash'
import api from '../../axios/Api';
import Register from '../Register';
import SignInOut from '../../containers/SignInOut'
import {Tab} from '@mui/material'
import LogoutConfirm from '../LogoutConfirm';
import {Route, Link, Redirect, Switch} from "react-router-dom";
import PrivateRoute from '../PrivateRoute'
import AuthorizedUsers from '../AuthorizedUsers'

const routes_config = [
    {path:'/home',alias:'home',label:'Home',component:Home,tab:true,level:'user',type:'private'},
    {path:'/login',alias:'login',label:'Log In',component:SignInOut,tab:false,level:'user',type:'public'},
    {path:'/equipment',alias:'equipment',label:'Equipment',component:Equipment,tab:true,level:'user',type:'private'},
    {path:'/annualinventory',alias:'annualInventory',label:'Annual Inventory',component:AnnualInventory,tab:true,level:'admin',type:'private'},
    {path:'/annualinventory/:id',alias:'annualInventory',label:' View Annual Inventory',component:ViewAnnualInventory,tab:false,level:'admin',type:'private'},
    {path:'/hra',label:'HRA',alias:'hra',component:Hra,tab:true,level:'user',type:'private'},
    {path:'/employee',alias:'employee',label:'Employee',component:Employee,tab:true,level:'user',type:'private'},
    {path:'/eng4900',alias:'eng4900',label:'Eng 4900',component:Eng4900,tab:true,level:'admin',type:'private'},
    {path:'/problemreportviewer',alias:'admin',label:'Problem Report Viewer',component:ProblemReportViewer,tab:true,level:'admin',type:'private'},
    {path:'/authorizedusers', alias: 'authorizedUsers', label: 'Authorized Users', component: AuthorizedUsers, tab: true, level: 'admin', type: 'private' },
    {path:'/changehistory',alias:'changeHistory',label:'Change History',component:ChangeHistory,tab:true,level:'admin',type:'private'},
    {path:'/404',alias:'404',label:'Not Found',component:NotFound,tab:false,type:'public'},
    {path:'/Logout',alias:'logout',label:'Logout Successful',component:LogoutConfirm,tab:false,level:'user',type:'public'}
]

export const routes_tabs = (user_access) => {
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

    return_routes.tabs = route_with_tabs.map((route, i) => 
        <Tab id={`app-tab-${i}`} key={`app-tab-${i}`} label={route.label} value={route.path} component={Link} to={route.path} sx={{color:"black",height:"25px", minHeight:"25px",fontSize:"10px",minWidth:'50px','&:active':{color:'black'},'&:hover':{backgroundColor:'rgba(0, 0, 0,0.1)',textDecoration:'none',color:'black'}}}/>
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