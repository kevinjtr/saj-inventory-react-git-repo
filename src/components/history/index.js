import React from "react";
import { connect } from "redux-bundler-react";
import IconButton from '@mui/material/IconButton';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import orderBy from 'lodash/orderBy';
import RenderHistoryPopover from "./table";
import {getChangeHistoryByTableApi} from '../../publics/actions/change-history-api'

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
            
            const { id, componentName, userToken} = this.props;
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
            getChangeHistoryByTableApi(id, componentName, userToken).then((response) => response.data).then((results) => {
                if(results.data){
                const jsonData = results.data;
                this.setState({fetching: false, fetched: true, history: orderBy(jsonData,['updated_date'], 'desc')});                
                
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

export default connect('selectUserToken',
HistoryIconComponent);