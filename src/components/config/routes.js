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

const routes_config = [
    {path:'/home',alias:'home',label:'Home',component:Home,tab:true,level:'user',type:'private'},
    {path:'/login',alias:'login',label:'Log In',component:SignInOut,tab:false,level:'user',type:'public'},
    {path:'/equipment',alias:'equipment',label:'Equipment',component:Equipment,tab:true,level:'user',type:'private'},
    {path:'/annualinventory',alias:'annualInventory',label:'Annual Inventory',component:AnnualInventory,tab:true,level:'admin',type:'private'},
    {path:'/annualinventory/:id',alias:'annualInventory',label:' View Annual Inventory',component:ViewAnnualInventory,tab:false,level:'admin',type:'private'},
    {path:'/hra',label:'HRA',alias:'hra',component:Hra,tab:true,level:'user',type:'private'},
    {path:'/employee',alias:'employee',label:'Employee',component:Employee,tab:true,level:'user',type:'private'},
    {path:'/eng4900',alias:'eng4900',label:'Eng 4900',component:Eng4900,tab:true,level:'admin',type:'private'},
    //{path:'/eng4900/view/:id',label:'Eng 4900 View Form',component:Eng4900FormContainer,tab:false,level:'admin',props:{action:"VIEW"}},
    //{path:'/eng4900/edit/:id',label:'Eng 4900 Edit Form',component:Eng4900FormContainer,tab:false,level:'admin',props:{action:"EDIT"}},
    //{path:'/eng4900/create',label:'Eng 4900 Create Form',component:Eng4900Form,tab:false,level:'admin'},
    //{path:'/eng4844',label:'Eng 4844',component:Eng4844,tab:true},
    //{path:'/findeng4844',label:'Find Eng4844',component:FindEng4844,tab:true},
    // {path:'/problemreport',label:'Problem Report',component:ProblemReport,tab:true,level:'user'},
    {path:'/problemreportviewer',alias:'admin',label:'Problem Report Viewer',component:ProblemReportViewer,tab:true,level:'admin',type:'private'},
    {path:'/changehistory',alias:'changeHistory',label:'Change History',component:ChangeHistory,tab:true,level:'admin',type:'private'},
    {path:'/404',alias:'404',label:'Not Found',component:NotFound,tab:false,type:'public'},
    {path:'/Logout',alias:'logout',label:'Logout Successful',component:LogoutConfirm,tab:false,level:'user',type:'public'}
    //{path:'/register',label:'Register',component:Register,tab:true,level:'user'},
]

export const routes_tabs = (user_access) => {
    const return_routes = {
        routes:[],
        tabs:[]
    }

    //Tabs are created
    const route_with_tabs = filter(routes_config,function(r){
        if(Object.keys(user_access).includes(r.alias))
            return r.tab && user_access[r.alias].view 

        return r.tab
    })

    return_routes.tabs = route_with_tabs.map((route, i) => 
        <Tab id={`app-tab-${i}`} key={`app-tab-${i}`} label={route.label} value={route.path} component={Link} to={route.path} sx={{height:"32px", minHeight:"32px",paddingTop:'20px!important',fontSize:'0.8em','&:hover':{backgroundColor:'rgba(255,255,255,0.1)',textDecoration:'none',color:'white'}}}/>
        /*<li style={{paddingRight: '18px', whiteSpace: "nowrap"}}>
            <Link to={route.path} className="nav-link">
                {route.label}
            </Link>
        </li>*/)

    //Routes are created
    const access_routes = filter(routes_config,function(r){

        if(r.type == "private" && Object.keys(user_access).includes(r.alias)){
            console.log(user_access[r.alias],user_access[r.alias].view)

            return user_access[r.alias].view
        }

        return true 
     })

     return_routes.routes = access_routes.map((route, i) => {

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

// export const routes = (user_access) => {
//     const access_routes = filter(routes_config,function(r){

//         if(r.type == "private" && Object.keys(user_access).includes(r.alias)){
//             console.log(user_access[r.alias],user_access[r.alias].view)

//             return user_access[r.alias].view
//         }

//         return true 
//      })

//     const routes = access_routes.map((route, i) => {

//         if(route.type == 'private'){
//             return (
//                 <PrivateRoute exact id={`app-route-${i}`} key={`app-route-${i}`} name={route.alias} path={route.path} component={route.component}/>
//             )
//         }
    
//         if(route.path == '/login'){
//             return (
//                 <PrivateRoute exact id={`app-route-${i}`} key={`app-route-${i}`} name={route.alias} path={route.path} component={route.component}/>
//             )
//         }
    
//         return (
//             <Route exact id={`app-route-${i}`} key={`app-route-${i}`} path={route.path} component={route.component}/>
//         )
//     })

//     return routes
// }

