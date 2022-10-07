// react
import React, { useState, useEffect, useRef } from 'react';
import "./styles/MapWrapper.css"
// leaflet
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

// const mapCssStyles = {
// 	  mapContainer: {
// 		height: '80vh',
// 		width: '100%'
// 	  },
// 	  clickedCoordLabel: {
// 		position: 'absolute',
// 		right: 0,
// 		bottom: 0,
// 		background: 'white',
// 		borderRadius: '5px',
//     //margin: '10px'
// 	  },
// 	  // clickedCoordLabel: {
		
// 	  // }
// }

function MapWrapper(props) {

  const position = [51.505, -0.09]

  return(
    <div id="map">
<MapContainer center={position} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
    </div>
    
  )

}

export default MapWrapper