import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Chip, TextField, Paper, Stack } from '@mui/material';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { v4 as uuid } from 'uuid';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipInput({chips, setChips}) {
    const [inputVal, setInputVal] = useState('')

    const handleDelete = (chipToDelete) => () => {
        setChips((chips) => chips.filter((chip) => chip != chipToDelete));
    };

    function handleChipInput (e) {
        let val = e.target.value
        if(chips.length < 3){
            val = val.replace(/[^0-9]|[!e]/g, '')
            if (val.length > 3) {
                val = val.substring(0,3)
            }

            setInputVal(val)
            return;
        }

        setInputVal('')
    };

    // Add Chip
    function handleChipAdd () {
        console.log(inputVal)
        if(inputVal.length === 3){
            const chipAdd = [...chips]
            chipAdd.push(inputVal)
            setChips(chipAdd)
            setInputVal('')
        }
    };

    // Delete Chip
    const handleChipDelete = (c, index) => {
        const chipDelete = [...chips]
        chipDelete.splice(index,1)
        setChips(chipDelete)
    };


    return (
        <Paper
        sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            p: 0.5,
            m: 0,
        }}
        component="ul"
        >
            <Stack>
                <Stack direction="row">
                {chips.map((data) => {
                let icon;

                if (data === 'React') {
                    icon = <TagFacesIcon />;
                }

                return (
                    <ListItem key={uuid()} val={data}>
                    <Chip
                        icon={icon}
                        label={data}
                        onDelete={data === 'React' ? undefined : handleDelete(data)}
                    />
                    </ListItem>
                );
                })}            
                </Stack>
                <TextField
                    sx={{pt: chips.length ? '0px' : '53px'}}
                    id="standard-number"
                    //label="HRA Number"
                    onChange={handleChipInput}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleChipAdd()
                        }
                    }}
                    helperText= {chips.length < 3 ?  "Type HRA number and press enter to add" : "Maximum HRA Accounts added."}
                    value={inputVal}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    variant="standard"
                />
            </Stack>
        </Paper>
    );
}
