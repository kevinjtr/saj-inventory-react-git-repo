import React from 'react'
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
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

const dialogStyles = makeStyles(theme => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position:'absolute',
    top: theme.spacing(5)
  },
  dialogTitle: {
    paddingRight:'0px'
  }
}))

export default function UploadFormModal(props) {

    //constant declarations
    const {type, uploadPdf, setUploadPdf, statusOptions} = props;
    const FORMS_ACEPTABLE = ["eng4900","eng4844"]

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

    //Styles declaration
    const classDialog = dialogStyles();

    const handleModalUploadSubmit = (e) => {
        //const {apiRoot,uploadText,uploadData,doChangeUploadDone} = this.props
    
        // const formData = new FormData();
        // formData.append('File', modal.uploadData);
    
        // if(!modal.uploadError){
        //   setModal({...modal,uploadError:"Could not upload file."})
        //   return
        // }
        console.log(FORMS_ACEPTABLE.includes(type))
        setModal({...modal,uploadDone:true,uploadError:null})
        
        // api.post(`${ENG4900}/uploads`,{name:modal.text,data:modal.uploadData})
        // .then(res => {
        //     if(res.data)
        //     {
        //         console.log("File was recieved.")
        //         doChangeUploadDone(true)
        //     }else
        //     {
        //         console.log("File was not recieved.")
        //     }
        // })
    
    }

    const validateModalInput = (e) => {
    //const {divisionSelected, districtSelected,doChangeUploadData,doChangeUploadActiveButton,doChangeUploadText} = this.props

    console.log(e.target.value)
    if(e.target.value.toLowerCase().includes('.pdf'))
    {    
        setModal({...modal,text:e.target.value,uploadData:e.target.files[0],buttonActive:true})
        return
    }

    clearModalData()

    }

    const handleModalStatusChange = (e) => {
    //const {divisionSelected, districtSelected,doChangeUploadData,doChangeUploadActiveButton,doChangeUploadText} = this.props

    // if(e.target.value.toLowerCase().includes('.pdf'))
    // {    
    //   setModal({...modal,text:e.target.value,uploadData:e.target.files[0],buttonActive:true})
    //   return
    // }

    setModal({...modal,newStatus:e.target.value})
    //clearModalData()

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

    const clearModalData = () => {
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

    const returnUploadLabel = () => {

        return (<>
        <div>
        <label htmlFor="FFR_FD_UPLOAD" style={{margin:'0', width:'100%', height:'100%'}}>
        Attach Signed PDF document
        </label>
        <input name="pdf" accept={'.pdf'} id="pdf" type="file" onChange={validateModalInput} aria-describedby="fileHelp" className="form-control-file" />
        </div>
        {modal.buttonActive ? <Button  onClick={handleModalUploadSubmit} variant="contained" color="primary">Upload</Button> : null}
        {modal.uploadError ? <p>{modal.uploadError}</p> : null}
        </>)
    }

    const returnCompleteLabel = () => {
        return (<p>Upload is Complete. </p>)
    }

    const keys = filter(Object.keys(statusOptions),function(k){ console.log(k); return Number(k) >= (uploadPdf.rowData ? uploadPdf.rowData.status : 0)})

    console.log(keys)
    const uploadStatusItems = keys.map(k => {
            return <MenuItem value={k}>{statusOptions[k]}</MenuItem>
        })

    return(
        <Dialog open={uploadPdf.show} class={{paper:classDialog.dialogWrapper}} onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
            //setModal({...modal,active:false})
        }
        }}>
        
        <div style={{display:'flex'}}>
        <DialogTitle disableTypography class={classDialog.dialogTitle}>
            <h2>ENG4900{uploadPdf.rowData ? ' - ' + uploadPdf.rowData.form_id : null}</h2>  
        </DialogTitle>
        <IconButton onClick={()=>resetModalData()}>
            <CloseIcon />
        </IconButton>
        </div>
        {!modal.uploadDone ? (
        <FormControl >
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
        <DialogContent>
        
        { modal.newStatus && ( modal.newStatus != uploadPdf.rowData.status) ? (modal.uploadDone ? returnCompleteLabel() : returnUploadLabel()) : null}
        </DialogContent>
        </Dialog>
    )
    }


    if(uploadPdf.rowData)
        return(<UploadModal/>)

    return(null)
}