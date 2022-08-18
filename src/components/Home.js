import React, { Component, useState } from 'react';
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

//test
const init = { text: "The quick brown fox jumps over the lazy dog" };
//end test

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 	  width: '100%',
// 	  maxWidth: 360,
// 	  backgroundColor: theme.palette.background.paper,
// 	},
// 	list: {
// 	  width: '100%',
// 	  maxWidth: 360,
// 	  //background: 'rgb(245, 245, 245)',
// 	  borderRadius: '25px',
// 	  backgroundColor: theme.palette.type == "dark" ? theme.palette.background.paper : "rgb(245, 245, 245)",
// 	},
// 	listHeader: {
// 	  width: '100%',
// 	  maxWidth: 360,
// 	  //background: 'rgb(245, 245, 245)',
// 	  borderRadius: '25px 25px 0px 0px',
// 	  backgroundColor: theme.palette.type == "dark" ? theme.palette.background.paper : "rgb(245, 245, 245)",
// 	  //backgroundColor: theme.palette.background.paper,
// 	},
// 	appbar: {
// 	  flexGrow: 1,
// 	  //color: theme.palette.common.white,
// 		backgroundColor: '#e57373',
// 		borderRadius: '5px'
// 	},
// 	menuButton: {
// 	  marginRight: theme.spacing(2),
// 	},
// 	title: {
// 	  flexGrow: 1,
// 	},
//   }));

function Home({userName})  {
	//test
	const [messages, setMessages] = useState([])
	const {
		state: doc,
		setState: setDoc,
		resetState: resetDoc,
		index: docStateIndex,
		lastIndex: docStateLastIndex,
		goBack: undoDoc,
		goForward: redoDoc
	} = useUndoableState(init);
	const canUndo = docStateIndex > 0;
	const canRedo = docStateIndex < docStateLastIndex;
	//end test

	//const classes = useStyles();

    // React.useEffect(() => {
    //     fetch("./messages.json")
    //     .then((res) => res.json())
    //     .then((data) => {
    //         const li_items = data.version_updates.map(msg => 
    //             <ListItem>
    //         <ListItemAvatar>
    //             <Avatar>
    //                 <CodeIcon />
    //             </Avatar>
    //         </ListItemAvatar>
    //         <ListItemText primary={msg} />
    //     </ListItem>
    //     )
    //         setMessages(li_items)
    //     });

        

    // }, []);//will run once.

		return (
			<>
			                {/* {messages.length > 0 ? (
          <div className='updates-maintenance-message-container' style={{display:'flex',bottom:'15%',position:'absolute'}}>
            <List className={classes.list} 
            subheader={<ListSubheader className={classes.listHeader} style={{fontSize:'28px'}} component="div" id="nested-list-subheader">New Features</ListSubheader>}>
            {messages}
            </List>
            </div>
          ) : null} */}

			<div className="container" style={{ justifyContent: 'center', textAlign: 'center' }}>
				{/* <TextField onClick={this.tfSubmit}/> */}
				{/* <h2>Home</h2> */}
				<h2>Welcome {userName}</h2>
				{/* <h4>You're currently in the Home Page</h4> */}
				{/* <img style={{position:'absolute', transform: "rotate(60deg)", objectFit: "none",objectPosition: "0px 180px", left:"-10%",bottom:'25px',width:'30%'}} src={"./home-background.png"}  />
				<img style={{position:'absolute', transform: "rotate(300deg)", objectFit: "none",objectPosition: "0px 180px", objectPosition: "0px 180px", right:"-10%",bottom:'25px'}} src={"./home-background.png"}  /> */}
				{/* <img style={{position:'absolute',objectFit: "none",objectPosition: "0px 180px", left:"10%",bottom:'25px',width:'30%'}} src={"./home-background.png"}  />
				<img style={{position:'absolute',objectFit: "none",objectPosition: "0px 180px", left:"40%",bottom:'25px',width:'30%'}} src={"./home-background.png"}  />
				<img style={{position:'absolute',objectFit: "none",objectPosition: "0px 180px", left:"70%",bottom:'25px',width:'30%'}} src={"./home-background.png"}  /> */}
				
				{/* <img style={{position:'absolute',left:"35%",width:'30%'}} src={"./home-background.png"}  />
				<img style={{position:'absolute',left:"60%",width:'30%'}} src={"./home-background.png"}  /> */}
				{/* <div>
					<div className="container" style={{ justifyContent: 'center', textAlign: 'center' }}>
						<h3 style={{ justifyContent: 'center' }}>List Of Available Products1111</h3>
						<div className="card-title">
							<div style={{ justifyContent: 'center' }}>{renderData}</div>
						</div>
					</div>
				</div> */}
			</div>
			{/*Test*/}
			    {/* <div style={{ display: "block" }}>
				<textarea
					style={{ margin: "16px" }}
					onChange={(event) => setDoc({ text: event.target.value })}
					rows="5"
					value={doc.text}
				/>
				<div>
					<button
					onClick={() => undoDoc()}
					disabled={!canUndo}
					style={{ marginRight: "8px" }}
					>
					Undo
					</button>
					<button
					onClick={() => redoDoc()}
					disabled={!canRedo}
					style={{ marginRight: "8px" }}
					>
					Redo
					</button>
					<button onClick={() => resetDoc(init)}>Reset</button>
				</div>
				</div> */}
				{/*END Test*/}
			</>
		);
}

export default connect(
	'selectUserName',
	Home);  