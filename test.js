import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Chip, TextField, Paper} from '@mui/material';
import TagFacesIcon from '@mui/icons-material/TagFaces';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray() {
    const [hraNumInput, setHraNumInput] = useState(null)
    const [chipData, setChipData] = React.useState([

    ]);

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip != chipToDelete));
    };
    
    const handleInsert = () => {
        if(hraNumInput?.length <= 3 && !isNaN(hraNumInput) && chipData.includes(Number(hraNumInput))){
            const num_ = Number(hraNumInput)
            chipData.push(num_) 
            setHraNumInput(null)
        }
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
                {chipData.map((data) => {
                let icon;

                if (data === 'React') {
                    icon = <TagFacesIcon />;
                }

                return (
                    <ListItem val={data}>
                    <Chip
                        icon={icon}
                        label={data}
                        onDelete={data === 'React' ? undefined : handleDelete(data)}
                    />
                    </ListItem>
                );
                })}
                <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    onChange={(e) => setHraNumInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleInsert()
                        }
                    }}
                    value={hraNumInput}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    variant="standard"
                />
            </Stack>
        </Paper>
    );
}
