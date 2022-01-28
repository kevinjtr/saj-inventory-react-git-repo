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
import LoginRoute from '../LoginRoute'

const routes_config = [

    {path:'/home',label:'Home',component:Home,tab:true,level:'user',type:'private'},
    {path:'/login',label:'Log In',component:SignInOut,tab:false,level:'user',type:'public'},
    {path:'/equipment',label:'Equipment',component:Equipment,tab:true,level:'user',type:'private'},
    {path:'/annualinventory',label:'Annual Inventory',component:AnnualInventory,tab:true,level:'admin',type:'private'},
    {path:'/annualinventory/:id',label:' View Annual Inventory',component:ViewAnnualInventory,tab:false,level:'admin',type:'private'},
    {path:'/hra',label:'HRA',component:Hra,tab:true,level:'user',type:'private'},
    {path:'/employee',label:'Employee',component:Employee,tab:true,level:'user',type:'private'},
    {path:'/eng4900',label:'Eng 4900',component:Eng4900,tab:true,level:'admin',type:'private'},
    //{path:'/eng4900/view/:id',label:'Eng 4900 View Form',component:Eng4900FormContainer,tab:false,level:'admin',props:{action:"VIEW"}},
    //{path:'/eng4900/edit/:id',label:'Eng 4900 Edit Form',component:Eng4900FormContainer,tab:false,level:'admin',props:{action:"EDIT"}},
    //{path:'/eng4900/create',label:'Eng 4900 Create Form',component:Eng4900Form,tab:false,level:'admin'},
    //{path:'/eng4844',label:'Eng 4844',component:Eng4844,tab:true},
    //{path:'/findeng4844',label:'Find Eng4844',component:FindEng4844,tab:true},
    // {path:'/problemreport',label:'Problem Report',component:ProblemReport,tab:true,level:'user'},
    // {path:'/problemreportviewer',label:'Problem Report Viewer',component:ProblemReportViewer,tab:true,level:'user'},

    {path:'/changehistory',label:'Change History',component:ChangeHistory,tab:true,level:'admin',type:'private'},
    {path:'/404',label:'Not Found',component:NotFound,tab:false,type:'public'},
    {path:'/Logout',label:'Logout Successful',component:LogoutConfirm,tab:false,level:'user',type:'public'}
    //{path:'/register',label:'Register',component:Register,tab:true,level:'user'},
]

export const routes_tabs = (lvl) => {
    // await api.post(`/user`,{}).then((response) => response.data).then((data) => {
	// 	console.log(data)
	// 	//setLoading(false)
	// 	//setEquipments(data.status != 400 ? data.data : data)
	// 	// this.setState({
	// 	// 	equipments: data.status != 400 ? data.values: data,
	// 	// 	setequipment: data
	// 	// });
	// 	//console.log(this.state.equipment.values);
	// 	// console.log(this.props, this.state);
	// 	}).catch(function (error) {
	// 	//setLoading(false)
	// 	//setEquipments([])
    //     });
        
    const route_with_tabs = filter(routes_config,function(r){return r.tab})

    if(lvl == 'admin'){
        return (
            route_with_tabs.map((route, i) => 
                <Tab id={`app-tab-${i}`} key={`app-tab-${i}`} label={route.label} value={route.path} component={Link} to={route.path} sx={{color:"black",height:"25px", minHeight:"25px",fontSize:"10px",minWidth:'50px','&:active':{color:'black'},'&:hover':{backgroundColor:'rgba(0, 0, 0,0.1)',textDecoration:'none',color:'black'}}}/>
                /*<li style={{paddingRight: '18px', whiteSpace: "nowrap"}}>
                    <Link to={route.path} className="nav-link">
                        {route.label}
                    </Link>
                </li>*/)
        )
    }

    const route_with_tabs_user_lvl = filter(route_with_tabs,function(r){return r.level == 'user'})

    console.log(route_with_tabs_user_lvl,lvl)
    return (
        route_with_tabs_user_lvl.map((route, i) => 
                <Tab id={`app-tab-${i}`} key={`app-tab-${i}`} label={route.label} value={route.path} component={Link} to={route.path} sx={{color:"black",height:"25px", minHeight:"25px",fontSize:"10px",minWidth:'50px','&:active':{color:'black'},'&:hover':{backgroundColor:'rgba(0, 0, 0,0.1)',textDecoration:'none',color:'black'}}}/>
            /*<li style={{paddingRight: '18px', whiteSpace: "nowrap"}}>
                <Link to={route.path} className="nav-link">
                    {route.label}
                </Link>
            </li>*/)
    )
}

export let routes = routes_config.map((route, i) => { 

    // if(route.routes){
    //     if(route.routes.length > 0){
    //         let routesWithSub = []
    //         routesWithSub.push(
    //             <Route exact path={route.path} component={route.component}/>
    //         )

    //         for(const sub_route of route.routes){
    //             routesWithSub.push(
    //                 <Route path={sub_route.path} component={sub_route.component}/>
    //             )
    //         }

    //         return routesWithSub
    //     }
    // }

    if(route.type == 'private'){
        return (
            <PrivateRoute exact id={`app-route-${i}`} key={`app-route-${i}`} path={route.path} component={route.component}/>
        )
    }

    if(route.path == '/login'){
        return (
            <LoginRoute exact id={`app-route-${i}`} key={`app-route-${i}`} path={route.path} component={route.component}/>
        )
    }

    return (
        <Route exact id={`app-route-${i}`} key={`app-route-${i}`} path={route.path} component={route.component}/>
    )
   
})

