import { Dialog, Button } from "@material-ui/core";
import React, {useState} from "react";

const ApprovalFormStep1 = (props) => {

    const {formData,handleSubmit,handleChange,setOpenPopup} = props

    return(
            <>
                <div style={{display:'flex',justifyContent:'flex-end'}}>
                    <div onClick={()=>setOpenPopup(false)} style={{cursor:'pointer'}}>X</div>
                </div>
                <div style={{display:'flex',paddingTop:'3px',paddingBottom:'3px'}}>
                    <div style={{width:'100px',fontWeight:'bold'}}>
                        Name
                    </div>
                    <div>
                        {formData.first_name + " " + formData.last_name}
                    </div>
                </div>
                <div style={{display:'flex',paddingTop:'3px',paddingBottom:'3px'}}>
                    <div style={{width:'100px',fontWeight:'bold'}}>
                        Division
                    </div>
                    <div>
                        {formData.division}
                    </div>
                </div>
                <div style={{display:'flex',paddingTop:'3px',paddingBottom:'3px'}}>
                    <div style={{width:'100px',fontWeight:'bold'}}>
                        District
                    </div>
                    <div>
                        {formData.district}
                    </div>
                </div>
                <div style={{display:'flex',paddingTop:'3px',paddingBottom:'3px'}}>
                    <div style={{width:'100px',fontWeight:'bold'}}>
                        Symbol
                    </div>
                    <div>
                        {formData.office_symbol_alias}
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                <div style={{display:'flex',paddingTop:'3px',paddingBottom:'3px'}}>
                    <div style={{width:'100px',fontWeight:'bold',display:'flex',flexDirection:'column',justifyContent:'center'}}>
                        User Type
                    </div>
                    <div>
                        <select onChange={handleChange} value={formData.user_level} name="user_level" style={{width:'100px',height:'26px',textAlign:'center'}}>
                            <option value="Admin">Admin</option>
                            <option value="Regular Level 1">Regular Level 1</option>
                            <option value="Regular Level 2">Regular Level 2</option>
                            <option value="Regular Level 3">Regular Level 3</option>
                            <option value="Regular Level 4">Regular Level 4</option>
                            <option value="HRA Level 1">HRA Level 1</option>
                            <option value="HRA Level 2">HRA Level 2</option>
                        </select>
                    </div>
                </div>

                {formData.user_level.substring(0,3) == 'HRA' &&
                <div style={{display:'flex',paddingTop:'3px',paddingBottom:'3px'}}>
                    <div style={{width:'100px',fontWeight:'bold',display:'flex',flexDirection:'column',justifyContent:'center'}}>
                        HRA No.
                    </div>
                    <div>
                        <input type="text" onChange={handleChange} maxlength="3" style={{width:'100px',textAlign:'center'}} value={formData.hras} name="hras" disabled={formData.user_type_label === "HRA" ? false:true} />
                    </div>
                </div>
                }
                
                <div style={{display:'flex',paddingTop:'5px'}}>
                    <div style={{paddingRight:'3px',flexGrow:1}}>
                        <Button variant='contained' color='primary' style={{width:'100%'}} type='submit'>
                            Assign
                        </Button>
                    </div>
                
                    <div style={{paddingLeft:'3px',flexGrow:1}}>
                        <Button variant='contained' style={{width:'100%'}} onClick={()=>setOpenPopup(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
                </form>
            </>
    )
}

export default ApprovalFormStep1
