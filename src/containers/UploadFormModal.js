import React, {useEffect, useState, useMemo} from 'react'
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import filter from 'lodash/filter'
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import {Select} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
//import {DropzoneArea, DropzoneDialog} from 'material-ui-dropzone'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import clsx from 'clsx'
import { green, grey } from '@material-ui/core/colors';
import AdornedButton from './AdornedButton'
import {useDropzone} from 'react-dropzone';
import api from '../axios/Api';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };


const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const dialogStyles = makeStyles(theme => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position:'absolute',
    top: theme.spacing(5)
  },
  dialogTitle: {
    float:'right'
  },
}))

const plusButtonStyles = makeStyles((theme) => ({
    fab: {
      margin: theme.spacing(2),
    },
    absolute: {
      //position: 'absolute',
      //top: theme.spacing(2),
      right: theme.spacing(3),
      //right: '0',
      marginTop: theme.spacing(2)
    },
    fabGreen: {
      color: theme.palette.common.white,
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[600],
      },
      height:'50px',
      width:'20%',
      marginTop: '20px',
      marginBottom:'20px'
    },
    fabGrey: {
      color: theme.palette.common.white,
      backgroundColor: grey[500],
      '&:hover': {
        backgroundColor: grey[600],
      },
      height:'50px',
      width:'20%',
      marginTop: '20px',
      marginBottom:'20px'
    },
  }));

export default function UploadFormModal(props) {

    //constant declarations
    const {type, uploadPdf, setUploadPdf, statusOptions} = props;

    //hooks declaration.
    const [modal,setModal] = React.useState({
        reset: false,
        text:"",
        buttonActive:false,
        uploadData:null,
        uploadDone:false,
        uploadError:null,
        newStatus:null,
        })
    const [files, setFiles] = React.useState([])
    const [submitButton, setSubmitButton] = React.useState({
        active:false,
        send:false,
      });

    //Styles declaration
    const classDialog = dialogStyles();
    const plusButtonClasses = plusButtonStyles();

    //Events declaration
    const handleSubmit = async (event) => {

        setSubmitButton({...submitButton,send:true})
    
        return(new Promise((resolve, reject) => {
          setTimeout(() => {

            if(files.length != 0){
                console.log(files[0])
                var formData = new FormData();
                formData.append('file', files[0]);

                api.post('eng4900/upload',formData, { headers: {
                    "Content-Type": "multipart/form-data",
                }}).then((response) => {
                    console.log(response)
                }).catch(function (error) {
                    //do nothing.
                });
            }
            
            setSubmitButton({...submitButton,send:false})
            resolve();
            
          }, 1000);
        }))
      }

    const handleModalStatusChange = (e) => {
        setModal({...modal,newStatus:e.target.value})
    }

    const resetModalData = () => {
    setUploadPdf({...uploadPdf,show:false})
    setModal({...modal,
        reset: false,
        text:"",
        buttonActive:false,
        uploadData:null,
        uploadDone:false,
        uploadError:null,
        newStatus:null}
    )
    return;
    }

    const UploadModal = () => {

        const returnUploadDropZone = () => {

            const thumbs = files.map(file => (
                <div style={thumb} key={'thumb-' + file.name}>
                    <div style={thumbInner}>
                    <PictureAsPdfIcon style={img}/>
                    
                    {/* <img
                        src={file.preview}
                        style={img}
                    /> */}
                    </div>
                </div>
                ));

            const description = files.map(file => <li key={file.path}>{file.path}</li>);
            
            return (
                <section className="container">
                <div {...getRootProps({className: 'dropzone',style})}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                    <em>(Only *.pdf files are accepted)</em>
                </div>
                <aside style={thumbsContainer}>
                    {thumbs}
                    {description}
                </aside>
                </section>
            );
        }

        const returnCompleteLabel = () => {
            return (<p>Upload is Complete. </p>)
        }

        const keys = filter(Object.keys(statusOptions),function(k){ console.log(k); return Number(k) >= (uploadPdf.rowData ? uploadPdf.rowData.status : 0)})

        const uploadStatusItems = keys.map(k => {
                return <MenuItem value={k}>{statusOptions[k]}</MenuItem>
            })

        const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject} = useDropzone({
            accept: 'application/pdf',
            onDrop: acceptedFiles => {
                setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
                })));
            },
            maxFiles: 1,
            onDropAccepted: () => setSubmitButton({...submitButton,active:true}),
            onDropRejected: () => setSubmitButton({...submitButton,active:false}),
            });

        const style = useMemo(() => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {})
            }), [
            isDragActive,
            isDragReject,
            isDragAccept
            ]);
            
        
        useEffect(() => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach(file => URL.revokeObjectURL(file.preview));
        }, [files]);

        useEffect(() => () => {
            console.log(submitButton)
        }, [submitButton]);

        return(
            <Dialog open={uploadPdf.show} class={{paper:classDialog.dialogWrapper}} onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                    //setModal({...modal,active:false})
                }
                }}>

                <div>
                <DialogTitle disableTypography class={classDialog.dialogTitle}>
                    <div style={{position:'absolute',left:'10px'}}>
                        <h2>ENG4900{uploadPdf.rowData ? ' - ' + uploadPdf.rowData.form_id : null}</h2>  
                    </div>
                    <IconButton onClick={()=>resetModalData()}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                </div>
                <DialogContent>
                
                {!modal.uploadDone ? (
                <FormControl style={{paddingBottom:20}}>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={modal.newStatus ? modal.newStatus : uploadPdf.rowData.status}
                    onChange={handleModalStatusChange}
                    >
                    {uploadStatusItems}
                    </Select>
                </FormControl>
                ) : null}
                
                { modal.newStatus && ( modal.newStatus != uploadPdf.rowData.status) ? (modal.uploadDone ? returnCompleteLabel() : returnUploadDropZone()) : null}
                <AdornedButton onClick={handleSubmit} className={ submitButton.active ? clsx(plusButtonClasses.fabGreen) : clsx(plusButtonClasses.fabGrey)} {...((!submitButton.active || submitButton.send) && {disabled:true})} {...((submitButton.send) && {loading:true})}> 
                Submit
                </AdornedButton>
                </DialogContent>
            </Dialog>
        )
    }

    if(uploadPdf.rowData)
        return(<UploadModal/>)

    return(null)
}