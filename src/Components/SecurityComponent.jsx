import React from 'react'
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    TextField,
  } from "@mui/material";
function SecurityComponent() {
    const [editMode, setEditMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [inputValue, setInputValue] = useState("******");
  
    const handleEditClick = () => {
      setEditMode(true);
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const handleConnectClick = () => {
      // Connect logic can be added here
    };
    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          •
        </Box>
      );
      
      const card = (
        <React.Fragment>
          <CardContent sx={{ display: 'flex', flexDirection: 'column'}}>
  <div  className='flex items-center mb-4'>
    <Typography sx={{ fontSize: 14, }} color="text.secondary" gutterBottom>
      Password:
    </Typography>
    <OutlinedInput
      id="outlined-adornment-password"
      type={showPassword ? "text" : "password"}
      value={JSON.parse(localStorage.getItem("ExistingUser")).password}
    
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
    />
  </div>
  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    Email: <span className='ml-6'>{JSON.parse(localStorage.getItem("ExistingUser")).email}</span>
  </Typography>
</CardContent>
         
        </React.Fragment>
      );
  return (
   <>
        {editMode?<Card className='shadow w-75 mx-auto mt-10'>
                <CardContent>
                    <div className='w-full flex justify-between flex-col md:flex-row'>
                        <Typography variant='h6'>
                            <FormControl variant="outlined" margin="dense">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? "text" : "password"}
                                    value={JSON.parse(localStorage.getItem("ExistingUser")).password}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                        </Typography>
                        <div className=' md:ml-3 mt-2'>
                            <TextField
                                placeholder='email'
                            //   value={useProfile.email}
                            //   onChange={(e) => handleInputChange('linkedin', e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>: <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>}
   </>
  )
}

export default SecurityComponent