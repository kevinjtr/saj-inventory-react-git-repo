import React from 'react';
//import Header from '../Header';
import Eng4900 from '../eng-4900/Eng4900';
import Eng4900Form from '../eng-4900/Eng4900Form';
import Equipment from '../Equipment';
import Hra from '../Hra';
import Employee from '../Employee';
import ChangeHistory from '../ChangeHistory';
import Eng4844 from '../Eng4844';
import FindEng4844 from '../FindEng4844';
import NotFound from '../forms/NotFound'
import {Route, Link} from "react-router-dom";
import {filter} from 'lodash'

const DEFAULT_ROUTE = "/equipment"

const HOME_PAGE =  (<Route
    exact
    path={'/'}
    render={() => {
        return window.location.replace(DEFAULT_ROUTE);
    }}/> )

const routes_config = [
    //{path:'/home',label:'Home'},
    {path:'/equipment',label:'Equipment',component:Equipment,tab:true},
    {path:'/hra',label:'HRA',component:Hra,tab:true},
    {path:'/employee',label:'Employee',component:Employee,tab:true},
    {path:'/eng4900',label:'Eng 4900',component:Eng4900,tab:true},
    {path:'/eng4900/view/:id',label:'Eng 4900 View Form',component:Eng4900Form,tab:false},
    {path:'/eng4900/edit/:id',label:'Eng 4900 Edit Form',component:Eng4900Form,tab:false},
    {path:'/eng4900/create',label:'Eng 4900 Create Form',component:Eng4900Form,tab:false},
    {path:'/eng4844',label:'Eng 4844',component:Eng4844,tab:true},
    {path:'/findeng4844',label:'Find Eng4844',component:FindEng4844,tab:true},
    {path:'/changehistory',label:'Change History',component:ChangeHistory,tab:true},
    // {path:'*',label:'Not Found',component:NotFound,tab:false},
]

const routes_tabs = () => {
    const route_with_tabs = filter(routes_config,function(r){return r.tab})

    return (
        route_with_tabs.map(route => 
            <li className="nav-item">
                <Link to={route.path} className="nav-link">
                    {route.label}
                </Link>
            </li>)
    )
}


function Header() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<p className="navbar-brand">Inventory</p>
			<ul className="navbar-nav">
                {routes_tabs()}
			</ul>
		</nav>
	);
}

export let routes = routes_config.map((route, i) => { 

    if(route.routes){
        if(route.routes.length > 0){
            let routesWithSub = []
            routesWithSub.push(
                <>
                {route.path === DEFAULT_ROUTE ? HOME_PAGE : null}
                <Route exact path={route.path} component={Header} />
                <Route exact path={route.path} component={route.component}/>
                </>
            )

            for(const sub_route of route.routes){
                routesWithSub.push(
                    <>
                    <Route exact path={sub_route.path} component={Header} />
                    <Route path={sub_route.path} component={sub_route.component}/>
                    </>
                )
            }

            return routesWithSub
        }
    }
    
    return (
        <>
        {route.path === DEFAULT_ROUTE ? HOME_PAGE : null}
        <Route exact path={route.path} component={Header} />
        <Route exact path={route.path} component={route.component}/>
        </>
    )
})

