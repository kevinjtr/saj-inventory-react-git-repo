import React, { useEffect, useState, useMemo } from 'react'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import { Select, FormLabel, FormControlLabel, RadioGroup, Radio, Typography } from '@mui/material/';
import FormControl from '@mui/material/FormControl';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { blue, grey, red } from '@mui/material/colors';
import { useDropzone } from 'react-dropzone';
import api from '../../../axios/Api';
import DeleteIcon from '@mui/icons-material/Delete';
import debounce from 'lodash/debounce'
import { connect } from 'redux-bundler-react';
import { updateEng4900Api, signEng4900Api } from '../../../publics/actions/eng4900-api'
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import { Save as SaveIcon, UploadFile as UploadFileIcon, Edit as EditIcon } from '@mui/icons-material';
import toast from 'react-hot-toast';

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    float: 'right'
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
}));

const StyledLoadingButton = styled(LoadingButton)(({ theme, active, name }) => ({
    color: theme.palette.common.white,
    backgroundColor: active ? name === "sign" ? red[500] : blue[500] : grey[500],
    '&:hover': {
        backgroundColor: active ? name === "sign" ? red[600] : blue[500] : grey[600],
    },
    height: '50px',
    width: '50%',
    marginTop: '20px',
    marginBottom: '20px',
}));

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

function FormSignModal({ openModal, setOpenModal, formData, eng4900s, setEng4900s, userToken }) {

    //constant declarations

    console.log(formData)
    //hooks declaration.
    const [modal, setModal] = React.useState({
        reset: false,
        text: "",
        buttonActive: false,
        uploadData: null,
        uploadDone: false,
        uploadError: null,
        newStatus: null,
    })
    const [files, setFiles] = React.useState([])
    const [submitButton, setSubmitButton] = React.useState({
        active: false,
        send: false,
        sign: false,
    });
    const [uploadButton, setUploadButton] = React.useState({
        active: false,
        send: false,
    });

    const [signButton, setSignButton] = React.useState({
        active: false,
        send: false,
    });
    const [progress, setProgress] = useState(0); // progess bar
    const [uploadOrSign, setUploadOrSign] = useState(null); // progess bar

    //Styles declaration

    //Functions declaration
    const formUpload = debounce(async () => {

        if (files.length != 0) {
            let formDataUpload = new FormData();
            formDataUpload.append('file', files[0]);
            const { form_id } = formData

            await api.post(`eng4900/upload/${form_id}`, formDataUpload, {
                headers: { auth: userToken, changes: JSON.stringify({ status: modal.newStatus }) },
                // onUploadProgress: (ProgressEvent) => {
                //     let progress = Math.round(
                //     ProgressEvent.loaded / ProgressEvent.total * 100);
                //     setProgress(progress);
                // }
            })
                .then((response) => response.data).then((data) => {
                    console.log(data)
                    const { error, tabUpdatedData } = data

                    if (error) {
                        toast.error('Could not complete action')
                        setUploadButton({ ...uploadButton, send: false, active: true })
                    } else {
                        let eng4900s_copy = { ...eng4900s }

                        for (const tab_number in tabUpdatedData) {
                            eng4900s_copy[tab_number] = tabUpdatedData[tab_number]
                        }

                        setEng4900s(eng4900s_copy)
                        toast.success('Action was completed')
                        setUploadButton({ ...uploadButton, send: false, active: false })
                        setOpenModal(false)
                        resetModalData()
                    }
                })
                .catch(function (error) {
                    console.log(error)
                    toast.error('Could not complete action')
                    setUploadButton({ ...uploadButton, send: false, active: true })
                });
        }


    }, 1500);

    //Events declaration
    const handleSubmit = async (event) => {
        //setProgress(0)
        setSubmitButton({ ...submitButton, send: true })

        const { form_id } = formData
        const rowData = { changes: { '0': { newData: { form_id: form_id, status: modal.newStatus } } } }
        await updateEng4900Api(rowData, userToken).then((response) => response.data).then((data) => {
            console.log(data)
            const { error, tabUpdatedData } = data

            if (error) {
                toast.error('Could not complete action')
                setSubmitButton({ ...submitButton, send: false, active: true })
            } else {
                let eng4900s_copy = { ...eng4900s }

                for (const tab_number in tabUpdatedData) {
                    eng4900s_copy[tab_number] = tabUpdatedData[tab_number]
                }

                setEng4900s(eng4900s_copy)
                toast.success('Action was completed')
                setSubmitButton({ ...submitButton, send: false, active: false })
                setOpenModal(false)
                resetModalData()
            }

        }).catch(function (error) {
            console.log(error)
            setSubmitButton({ ...submitButton, send: false, active: true })
            toast.error('Could not complete action')
        });
    }

    const handleSign = async (event) => {
        //setProgress(0)
        setSignButton({ ...signButton, send: true })

        const { form_id } = formData
        const rowData = { id: form_id, status: modal.newStatus }
        await signEng4900Api(rowData, userToken).then((response) => response.data).then((data) => {
            console.log(data)
            const { error, tabUpdatedData } = data

            if (error) {
                toast.error('Could not complete action')
                setSignButton({ ...signButton, send: false, active: true })
            } else {
                let eng4900s_copy = { ...eng4900s }

                for (const tab_number in tabUpdatedData) {
                    eng4900s_copy[tab_number] = tabUpdatedData[tab_number]
                }

                setEng4900s(eng4900s_copy)
                toast.success('Action was completed')
                setSignButton({ ...signButton, send: false, active: false })
                setUploadOrSign(null)
                setOpenModal(false)
                resetModalData()
            }

        }).catch(function (error) {
            console.log(error)
            setSignButton({ ...signButton, send: false, active: true })
            toast.error('Could not complete action')
        });
    }

    const handleUpload = async (event) => {
        //setProgress(0)
        setUploadButton({ ...uploadButton, send: true })

        if (!isFormRejected()) {
            formUpload()
        } else {
            setUploadButton({ ...uploadButton, send: false })
        }
    }

    const handleModalStatusChange = (e) => {
        console.log(e.target.value == 12)
        if (e.target.value == 12) {
            setSubmitButton({ ...uploadButton, active: true })
            setModal({ ...modal, newStatus: e.target.value })
        } else {
            setSubmitButton({ ...uploadButton, active: false })
            setModal({ ...modal, newStatus: e.target.value })
        }

    }

    const resetModalData = () => {

        setSubmitButton({
            active: false,
            send: false,
        });
        setUploadButton({
            active: false,
            send: false,
        });
    
        setSignButton({
            active: false,
            send: false,
        });
        setUploadOrSign(null)
        setFiles([])
        setOpenModal(false)
        setModal({
            ...modal,
            reset: false,
            text: "",
            buttonActive: false,
            uploadData: null,
            uploadDone: false,
            uploadError: null,
            newStatus: null
        }
        )
        return;
    }

    const isFormRejected = () => modal.newStatus == 12

    const uploadStatusItems = formData.status_options?.map(option => {
        return <MenuItem value={option.id}>{option.label}</MenuItem>
    })

    const newStatusSelected = modal.newStatus && (modal.newStatus != formData.status)

    const SignOrUpload = () => {
        return (
            <FormControl disabled={signButton.send || uploadButton.send}>
                <FormLabel id="demo-row-radio-buttons-group-label">Choose signature:</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={uploadOrSign}
                    onChange={(e) => {
                        setSignButton((prev) => ({ ...prev, active: e.target.value === "sign" }))
                        setUploadOrSign(e.target.value)
                    }}
                >
                    {(Boolean(!formData.file_storage) && Boolean(formData.can_digitally_sign)) && <FormControlLabel value="sign" control={<Radio />} label="Digitally sign" />}
                    <FormControlLabel value="upload" control={<Radio />} label="Upload signed form" />
                </RadioGroup>
                {(Boolean(formData.file_storage) || !formData.can_digitally_sign) && <Typography sx={{color: 'warning.main', pb: 1}}>Note: {Boolean(formData.file_storage) && 'A PDF file was previosly uploaded. ' }Digitally sign has been disabled.</Typography>}
            </FormControl>
        )
    }

    const returnUploadDropZone = () => {

        const thumbs = files.map(file => (
            <div style={thumb} key={'thumb-' + file.name}>
                <div style={thumbInner}>
                    <PictureAsPdfIcon style={img} />
                </div>
            </div>
        ));

        //const description = files.map((file) => <li key={file.path}>{file.path}  <i className="fa fa-trash text-red" style={{color:'#FF0000'}} title="Remove Attachment" onClick={() => remove(file)}></i></li>);

        const description = files.map((file) => <li key={file.path}>{file.path}
            <IconButton style={{ color: '#e04436' }} size="small" title="Remove Attachment" aria-label="delete" disabled={uploadButton.send} onClick={() => remove(file)}>
                <DeleteIcon />
            </IconButton>
        </li>);

        if (!isFormRejected()) {
            return (
                <section className="container">
                    <div {...getRootProps({ className: 'dropzone', style })}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                        <em>(Only *.pdf files are accepted)</em>
                    </div>
                    <aside style={thumbsContainer}>
                        {thumbs}
                    </aside>
                    <aside style={thumbsContainer}>
                        <ul>
                            {description}
                        </ul>
                    </aside>
                    <aside>
                        {progress > 0 ? (
                            <div className="progessBar" style={{ width: progress }}>
                                {'Upload Progress:' + progress + '%'}
                            </div>
                        ) : null}
                    </aside>
                </section>
            )
        }

        return (<br />)
    }

    const returnCompleteLabel = () => {
        return (<p>Upload is Complete. </p>)
    }

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        accept: 'application/pdf',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        },
        maxFiles: 1,
        onDropAccepted: () => setUploadButton({ ...uploadButton, active: true }),
        onDropRejected: () => setUploadButton({ ...uploadButton, active: false }),
    });

    const remove = file => {
        const newFiles = [...files];     // make a var for the new array
        newFiles.splice(file, 1);        // remove the file from the array
        setFiles(newFiles);              // update the state

        if (newFiles.length == 0) {
            setUploadButton({ ...uploadButton, active: false })
        }
    };

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

    return (
        <StyledDialog open={openModal} fullWidth>
            <div>
                <StyledDialogTitle>
                    <div style={{ position: 'absolute', left: '15px', paddingTop: '15px' }}>
                        <h5>SIGN ENG 4900{formData ? ' - ' + formData.form_id : null}</h5>
                    </div>
                    <IconButton onClick={() => resetModalData()}>
                        <CloseIcon />
                    </IconButton>
                </StyledDialogTitle>
            </div>
            <DialogContent>


                {!modal.uploadDone ? (
                    <div style={{ textAlign: 'center' }}>
                        <FormControl disabled={signButton.send || uploadButton.send || submitButton.send} style={{ paddingBottom: 20, width: '50%', justifyContent: 'center' }}>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                label="Select"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={modal.newStatus ? modal.newStatus : formData.status}
                                onChange={handleModalStatusChange}
                            >
                                {uploadStatusItems}
                            </Select>
                        </FormControl>
                    </div>
                ) : null}

                {newStatusSelected && !isFormRejected() ? <SignOrUpload /> : null}
                {uploadOrSign === "upload" ? (modal.uploadDone ? returnCompleteLabel() : returnUploadDropZone()) : null}
                {isFormRejected() ? (
                    <div style={{ textAlign: 'center' }}>
                        <StyledLoadingButton
                            onClick={handleSubmit}
                            active={submitButton.active && newStatusSelected}
                            disabled={!submitButton.active || submitButton.send || !newStatusSelected}
                            loading={submitButton.send}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                        >
                            Submit
                        </StyledLoadingButton>
                    </div>
                ) : uploadOrSign === "upload" ? (
                    <div style={{ textAlign: 'center' }}>
                        <StyledLoadingButton
                            name={uploadOrSign}
                            onClick={handleUpload}
                            active={uploadButton.active && newStatusSelected}
                            disabled={!uploadButton.active || uploadButton.send || !newStatusSelected}
                            loading={uploadButton.send}
                            loadingPosition="start"
                            startIcon={<EditIcon />}
                        >
                            Upload
                        </StyledLoadingButton>
                    </div>

                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <StyledLoadingButton
                            name={uploadOrSign}
                            onClick={handleSign}
                            active={signButton.active && newStatusSelected}
                            disabled={!signButton.active || signButton.send || !newStatusSelected}
                            loading={signButton.send}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                        >
                            Sign Form
                        </StyledLoadingButton>
                    </div>
                )}
            </DialogContent>
        </StyledDialog>
    )
}

export default connect(
    'selectUserToken',
    FormSignModal);  