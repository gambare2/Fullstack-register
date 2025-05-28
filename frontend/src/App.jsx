import React, { useState } from 'react';
import axios from 'axios'
import { TextField, InputAdornment, FormControl, InputLabel, OutlinedInput, IconButton, Button, SvgIcon, } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import dayjs from 'dayjs';

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState(dayjs());
  const handleClickShowPassword = async () => setShowPassword((show => !show));
  const [formErrors, setFormErrors] = useState({});
  const [form, setForm] = useState({ name: '', username: '', DOB: '', email: '', password: '' })

  const handlechange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    const { name, username, DOB, email, password } = form;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name) errors.name = 'Name is required';
    if (!username) errors.username = 'Username is required';
    if (!DOB) errors.DOB = 'Date of Birth is required';
    if (!email) errors.email = 'Email is required';
    else if (!emailRegex.test(email)) errors.email = 'Invalid email format';
    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };


  const handleMouseDownPassword = async (event) => {
    event.preventDefault();
  }
  const handleMouseUpPassword = async (event) => {
    event.preventDefault();
  }


  const submitRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const res = await axios.post('http://localhost:5000/register', form);
      alert('Form is been submitted: ' + res.data.message)
    } catch (error) {
      // alert('Error in receiving message')
        console.error('Error:', error.response || error.message);
  alert('Error: ' + (error.response?.data?.message || 'Request failed'));
    }

  }

  return (
    <>
      <form onSubmit={submitRegister}>
        <div className=' flex justify-center   md:my-10'>
          <div className=' border border-slate-600 bg-slate-200 w-2/5'>
            <div className=' flex gap-5 items-center flex-col md:mb-10'>

              <span className='flex justify-center md:my-4 font4 font-bold text-4xl gap-2 text-blue-800'>
                <AppRegistrationOutlinedIcon
                  sx={{ height: 50, width: 47, color: 'slateblue' }}
                />
                Register
              </span>

              {/* Name input here  */}
              <TextField
              sx={{width: 260}}
                id="outlined-password-input"
                label="Full Name"
                type="fullname"
                name='name'
                placeholder='Hritik Roshan'
                onChange={handlechange}
                error={!!formErrors.name}
              />

              {/* username input here  */}
              <TextField
                id="input-with-icon-textfield"
                label="Username"
                name='username'
                placeholder='hritik12'
                onChange={handlechange}
                error={!!formErrors.username}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  },
                }}
                variant="outlined"
              />
              {/* DOB input here  */}

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>

                  <DatePicker
                    label="Controlled picker"
                    value={value}
                    name='DOB'
                    onChange={(newValue) => {
                      setValue(newValue);
                      setForm((prev) => ({
                        ...prev,
                        DOB: newValue ? newValue.format('YYYY-MM-DD') : '',
                      }));
                    }}
                    slotProps={{
                      textField: {
                        error: !!formErrors.DOB,
                        helperText: formErrors.DOB,
                      },
                    }}

                  />
                </DemoContainer>
              </LocalizationProvider>


              {/* email input here  */}
              <TextField
                id="input-with-icon-textfield"
                label="E-mail"
                name='email'
                error={!!formErrors.email}
                helperText={formErrors.email}
                placeholder='hr@gmail.com'
                onChange={handlechange}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                variant="outlined"
              />
              {/* password input here */}
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={handlechange}
                  error={!!formErrors.password}

                  name='password'
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? 'hide the password' : 'display the password'
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              {/* Button here to submit form  */}

              <div className='flex justify-center'>

                <Button
                  variant='contained'
                  sx={{ width: 147, backgroundColor: 'slateblue' }}
                  type='submit'
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default App;
