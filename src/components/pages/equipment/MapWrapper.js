// react
import "../../styles/MapWrapper.css"
// leaflet
import { MapContainer, TileLayer, useMap, Marker, Popup, Tooltip as LeafletTooltip } from 'react-leaflet'
import {groupBy, filter, forEach} from "lodash"
import {Box, Tooltip, Typography} from '@mui/material/';
import { styled } from '@mui/material/styles';

const StyledPopup = styled(Popup)(({ theme }) => theme.palette.mode == "dark" ? ({
  filter: "brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7)",
  width: "350px"
}) : null);

const StyledMapContainer = styled(MapContainer)(({ theme }) => theme.palette.mode == "dark" ? ({
  background: "#303030"
}) : null);

const StyledTileLayer = styled(TileLayer)(({ theme }) => theme.palette.mode == "dark" ? ({
  filter: "brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7)"
}) : null);

const StyledLeafletTooltip = styled(LeafletTooltip)(({ theme }) => theme.palette.mode == "dark" ? ({
  filter: "brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7)"
}) : null);

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

// const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
//   <Tooltip {...props} classes={{ popper: className }} />
// ))(({ theme }) => ({
//   [`& .${tooltipClasses.tooltip}`]: {
//     backgroundColor: theme.palette.common.white,
//     color: 'rgba(0, 0, 0, 0.87)',
//     boxShadow: theme.shadows[1],
//     fontSize: 11,
//   },
// }));

// const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
//   <Tooltip {...props} arrow classes={{ popper: className }} />
// ))(({ theme }) => ({
//   [`& .${tooltipClasses.arrow}`]: {
//     color: theme.palette.common.black,
//   },
//   [`& .${tooltipClasses.tooltip}`]: {
//     backgroundColor: theme.palette.common.black,
//   },
// }));

// const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
//   <Tooltip {...props} classes={{ popper: className }} />
// ))(({ theme }) => ({
//   [`& .${tooltipClasses.tooltip}`]: {
//     backgroundColor: '#f5f5f9',
//     color: 'rgba(0, 0, 0, 0.87)',
//     maxWidth: 220,
//     fontSize: theme.typography.pxToRem(12),
//     border: '1px solid #dadde9',
//   },
// }));

function MapWrapper(props) {

  const position = [26.250248915168157, -75.9753576132257]

  const equipmentList = groupBy(filter(props.equipments,function(equipment){
    //if(props.filters.length > 0){
      //const temp = props.filters.map(fil => equipment[fil.field].includes(fil.value))

      //return equipment.employee_office_location_latitude && equipment.employee_office_location_longitude && temp.every(element => element === true)
    //}
    return equipment.employee_office_location_latitude && equipment.employee_office_location_longitude
  }),'employee_office_location_name')//.map(loc => groupBy(loc,"hra_num"))

  const locations = Object.keys(equipmentList)
  const PopupsData = []

  forEach(equipmentList, function(value, key) {
    equipmentList[key] = groupBy(equipmentList[key], function(item) {
      return item.hra_num;
    });
  });

  
  // forEach(equipmentList, function(value, key1) {
  //   const loc = equipmentList[key1]

  //   console.log(`Location: ${key1}`)

  //   forEach(loc, function(value, key2) {
  //     const hra = loc[key2]
  //     console.log(`HRA: ${key2}`)
  //   });

  // });
// console.log(equipmentList)

  

  return(
    <Box id="map" sx={{paddingBottom:2}}>
    <StyledMapContainer attributionControl={false} style={{width:'100%', paddingBottom: "5px", minHeight: "300px",height:'35vh', background: "#303030"}} center={position} zoom={4} scrollWheelZoom={true}>
      <StyledTileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        filter= "brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7)"
      />
      {
        Object.keys(equipmentList).map(loc_name => {
          //create Popup
          const hras = equipmentList[loc_name]
          const latitude = hras[Object.keys(hras)[0]][0].employee_office_location_latitude
          const longitude = hras[Object.keys(hras)[0]][0].employee_office_location_longitude
          const num_of_eqs = filter(props.equipments,function(e){return e.employee_office_location_name == loc_name}).length

            return (
            <Marker position={[latitude, longitude]}>
              <StyledLeafletTooltip>{loc_name} - {num_of_eqs} Equipment{num_of_eqs > 1 ? "s": ""}</StyledLeafletTooltip>
                <StyledPopup maxHeight={"250"}>
                  <Typography variant="h6">
                  {`${loc_name}`}
                  </Typography>
                  {Object.keys(hras).map(hra_num => {
                    const eqs = hras[hra_num]
                    return (
                      <>
                      <Typography variant="h6">
                      {`${hra_num} - ${eqs[0].hra_full_name} [${eqs.length}]`}
                      </Typography>
                      {
                        eqs.map(eq => {
                          return (
                            <>
                            <Tooltip placement="left" title={
                              <>
                                <Typography  variant="h7" color="inherit">{`Employee ID: ${eq.employee_id ? eq.employee_id : "Unassiged"}`}</Typography>
                                <br/>
                                <Typography  variant="h7" color="inherit">{`Employee Name: ${eq.employee_full_name != " " ? eq.employee_full_name : ""}`}</Typography>
                                <br/>
                                <Typography  variant="h7" color="inherit">{`Bartag No.: ${eq.bar_tag_num}`}</Typography>
                                <br/>
                                <Typography  variant="h7" color="inherit">{`Item Desc: ${eq.item_type}`}</Typography>
                                <br/>
                                <Typography  variant="h7" color="inherit">{`Item Serial No.: ${eq.serial_num}`}</Typography>
                              </>
                            }>
                              <Typography sx={{px:4}}>{`${eq.bar_tag_num} - ${eq.item_type.substring(0,eq.item_type.length > 10 ? 10 : eq.item_type.length)}`}</Typography>
                            </Tooltip>
                            </>)
                        })
                      }
                      </>
                    )
                  })}
                </StyledPopup>
            </Marker>
            )
        })
      }
      {/* {locations.map(loc => (
        <Marker position={[equipmentList[loc][0].employee_office_location_latitude, equipmentList[loc][0].employee_office_location_longitude]}>
          <Popup maxHeight={300}>
            <>
            <h4>{`${equipmentList[loc][0].employee_office_location_name}`}</h4>
            <h5>{`${equipmentList[loc][0].hra_num} - ${equipmentList[loc][0].hra_full_name}`}</h5>
            {equipmentList[loc].map(eq => {
              console.log(eq)

              return (
              <>
              <Tooltip placement="left" title={
                <>
                  <Typography color="inherit">{`Employee ID: ${eq.employee_id ? eq.employee_id : "Unassiged"}`}</Typography>
                  <Typography color="inherit">{`Employee Name: ${eq.employee_full_name != " " ? eq.employee_full_name : ""}`}</Typography>
                  <Typography color="inherit">{`Bartag No.: ${eq.bar_tag_num}`}</Typography>
                  <Typography color="inherit">{`Item Desc: ${eq.item_type}`}</Typography>
                  <Typography color="inherit">{`Item Serial No.: ${eq.serial_num}`}</Typography>
                </>
              }>
                <Typography sx={{px:4}}>{`${eq.bar_tag_num} - ${eq.item_type.substring(0,eq.item_type.length > 10 ? 10 : eq.item_type.length)}`}</Typography>
              </Tooltip>
              </>)
            }
            )}
            </>
        </Popup>
      </Marker>
      ))} */}
      {/* <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
    </StyledMapContainer>
    </Box>
    
  )

}

export default MapWrapper