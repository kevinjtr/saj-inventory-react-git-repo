import React, { Component, useState, useEffect } from 'react';
//import './Home.css';
import '../img/style.css';
import Header from './Header'
import { connect } from 'redux-bundler-react';
import useUndoableState from "./tools/undoableState";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import CodeIcon from '@material-ui/icons/Code';
import {Avatar} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

// openlayers
import GeoJSON from 'ol/format/GeoJSON'
import Feature from 'ol/Feature';

// components
// import MapWrapper from './MapWrapper'

const homeCssStyles = {
	root: {
		textAlign: 'center',
		height: '100%',
		width: '100%',
	  },
	  homeLabel:{
		width: '50%',
		overflow: 'auto',
		margin: 'auto',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 2,
		background: 'white',
		pointerEvents: 'none'
	  },
	  mapContainer: {
		height: '100vh',
		width: '100%'
	  },
	  clickedCoordLabel: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		background: 'white',
		borderRadius: '5px'
	  },
	  clickedCoordLabel: {
		margin: '10px'
	  }
}

function Home({userName})  {
	  
	  return (
		<div style={homeCssStyles.root}>
		  <h2>Welcome {userName}</h2>
		  <div style={homeCssStyles.homeLabel}>
			<p>React Functional Components with OpenLayers Example</p>
			<p>Click the map to reveal location coordinate via React State</p>
		  </div>
		  
		  {/* <MapWrapper/> */}
	
		</div>
	  )

		// return (
		// 	<div className="container" style={{ justifyContent: 'center', textAlign: 'center' }}>
				
		// 		<MapWrapper/>
		// 	</div>
		// );
}

export default connect(
	'selectUserName',
	Home);  

// function Home() {

// }

// export default Home
