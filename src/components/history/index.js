import React from "react";
import { connect } from "redux-bundler-react";

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Popover from '@mui/material/Popover';
import Typography from "@mui/material/Typography";
import Tooltip from '@mui/material/Tooltip';
import orderBy from 'lodash/orderBy';
import RenderHistoryPopover from "./table";
import {getChangeHistoryByTableApi} from '../../publics/actions/change-history-api'

// let request = obj => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open(obj.method || "GET", obj.url);
//         if (obj.headers) {
//             Object.keys(obj.headers).forEach(key => {
//                 xhr.setRequestHeader(key, obj.headers[key]);
//             });
//         }
//         xhr.onload = () => {
//             if (xhr.status >= 200 && xhr.status < 300) {
//                 resolve(xhr.response);
//             } else {
//                 reject(xhr.statusText);
//             }
//         };
//         xhr.onerror = () => reject(xhr.statusText);
//         xhr.send(obj.body);
//     });
//   };


class HistoryIconComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state={
          open:false,
          anchorEl:null,
          fetching: false,
          fetched: false,
          history: []          
      }
      
      this.fetchHistory =this.fetchHistory.bind(this);
      
    }
    componentWillUnmount() {
        if(this.cancelablePromise) {
          this.cancelablePromise.cancel();
        }    
    }

    handleClick = (event) => {
        this.setState({anchorEl:event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl:null, open:false});
    };

    fetchHistory(event) {
        const {fetched, fetching} =this.state;
        if(!fetching) {
            this.setState({fetching: true, fetched: true, history: [], anchorEl:event.target, open:true});
            
            const { id, componentName, token} = this.props;
            // const url = `${apiRoot}/orgs/${orgsByRoute.slug}/changeHistory?table=${table}&attr=${attr}&id=${changeHistoryId}`
            // this.cancelablePromise = makeCancelable(
            //     request({
            //     url:url,
            //     withCredentials: true,
            //     headers:{
            //         'Content-Type': 'application/json',
            //         Authorization: "Bearer " + tokenRaw
            //     }
            //     }),
            // );
            // this.cancelablePromise
            getChangeHistoryByTableApi(id, componentName, token).then((response) => response.data).then((results) => {
                if(results.data){
                const jsonData = results.data;

                console.log(jsonData)
                this.setState({fetching: false, fetched: true, history: orderBy(jsonData,['id','updated_date'], 'desc')});                
                
                }else{
                this.setState({fetching: false, fetched: true, history: []});
                }            
                
            })
            .catch((e) => {
                this.setState({fetching: false, fetched: true, history: []});
                console.error('XHR error', e);
            });
        }else{
            this.setState({anchorEl:event.target, open:true});  
        }
        

    }
   
    render() {
    
        const {componentName } = this.props;
        const { anchorEl, open, history, fetching, fetched} = this.state
        const id = open ? `${componentName}-popover` : undefined;
        let popOver = null
        if(open) {
            popOver =(<Popover
                sx={{maxWidth: '60%', minWidth: 1000}}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={this.handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
            >
                <RenderHistoryPopover history={history} componentName={componentName} fetching={fetching} fetched={fetched}/>
            </Popover>  )
        }
        return (
            <div style={{display: "flex", justifyContent: "start",  alignItems:"flex-end"}}>
                <Tooltip title="View Change History">
                    <IconButton  aria-describedby={id} onClick={this.fetchHistory}>
                        <EventNoteIcon aria-label="View History"  />
                    </IconButton>
                </Tooltip>
                
                 {popOver}       
                              
            </div> 
        )
    }
}

export default HistoryIconComponent;