import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import SaveAlt from '@mui/icons-material/SaveAlt';
import { downloadExcel, downloadPdf, downloadEquipmentPdf } from '../tools/tools'

export default function CustomExportButton({columns, data, table}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //console.log(columns, data, table)
  useEffect(() => {
    const preventScrolling = e => e.preventDefault()
  
    window.addEventListener('scroll', preventScrolling);
    return () => window.removeEventListener('scroll', preventScrolling);
  }, []);

  return (
    
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="contained"
        startIcon={<SaveAlt/>}
        sx={{height: 35}}
      >
        Export
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        disableScrollLock
        anchorEl={anchorEl}
        open={open}
        sx={{position: 'absolute !important'}}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => {
          if(table?.name === 'equipment'){
            downloadEquipmentPdf([...columns], [...data],table)
          }else{
            downloadPdf([...columns], [...data])
          }

          handleClose()
        }}>Export to PDF</MenuItem>
        <MenuItem onClick={() => {
            downloadExcel([...columns],[...data], "report", ["update_status"])
            handleClose()
        }}>Export to Excel</MenuItem>
      </Menu>
    </div>
  );
}