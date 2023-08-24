import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import apiHelper from '../../API/ApiHelper';
export default function StudentMarks(props) {
    let { openMarks, setopenMarks, subject , selectedSTU } = props
    const [selectSub, setselectSub] = useState({
        subject: "",
        student:"",
        marks: 0
    })
    const [error, seterror] = useState([])
    const handleClose = () => {
        setopenMarks(false);
        seterror([])
    };

    console.log(selectSub)
    
    
    const HandleValue = (name, e) => {
        selectSub[name] = e.target.value
        setselectSub({...selectSub, student:selectedSTU._id})
    }

    const Addmark = async ()=>{
        try {
            const result = await apiHelper.Addmarks(selectSub)
            if(result){
                setselectSub(result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Dialog open={openMarks} onClose={handleClose} >
                <center>
                    <DialogTitle>Add Marks : - {selectedSTU.name}</DialogTitle>
                </center>
                <hr className='mb-0' />
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Subjects</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="Subject"
                            onChange={(e) => HandleValue(e.target.name , e)}
                            name='subject'
                        >

                            {
                                subject?.map((x) => (
                                    <MenuItem key={x._id} value={x._id}>{x.subject}</MenuItem>
                                ))
                            }
                            {/* <MenuItem value={10}></MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem> */}
                        </Select>
                    </FormControl>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Marks"
                        type="email"
                        fullWidth
                        name='marks'
                        variant="outlined"
                        error={error.length > 0}
                        helperText={error}
                        onChange={(e) => { HandleValue(e.target.name, e) }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant='outlined' onClick={()=>{
                        Addmark()
                        handleClose()
                    }}>ADD</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}