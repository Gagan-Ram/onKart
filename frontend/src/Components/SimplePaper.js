import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { userContext } from '../Contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom'
import { config } from '../App';
import axios from 'axios';
import { useSnackbar } from 'notistack'

export default function SimplePaper({ login, register }) {

  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const value = useContext(userContext);
  const [username, setUsername] = value.name
  const [password, setPassword] = value.pass
  const [email, setEmail] = value.email
  // console.log(username)
  // console.log(password)
  // console.log(email)
  // console.log(confirmPassword)
  const [confirmPassword, setConfirmPassword] = useState('')

  const url = config.endpoint;

  const userLogin = async () => {
    const body = {
      email : email,
      password : password
    }

  await axios.post(`${url}auth/login`, body )
  .then((res)=>{
    // console.log(res.data)
    if ( localStorage.getItem('onKart') ){}
    else{
      localStorage.setItem('onKart',JSON.stringify(res.data))
    }
    navigate('/')
  })
  .catch((error)=>{
    // console.error(error)
    enqueueSnackbar(error.response.data.message,{variant:'error'})
  })


  }

  const userRegister = async () => {
    if (password === confirmPassword) {

      const body = {
        username: username,
        password: password,
        email: email
      }

      await axios.post(`${url}auth/signUp`, body)
        .then((res) => {
          enqueueSnackbar({message:'Registered successfully', variant:'success'})
          navigate('/login')
        })
        .catch((error) => {
          // enqueueSnackbar()
          console.error(error.message)
        })

    }

  }


  const loginEmailChangeHandler = (event) => setEmail(event.target.value)

  const loginPasswordChangeHandler = (event) => setPassword(event.target.value)

  const registerUsernameChangeHandler = (event) => setUsername(event.target.value)

  const registerPasswordChangeHandler = (event) => setPassword(event.target.value)

  const registerConfirmPassword = (event) => setConfirmPassword(event.target.value)

  const registerEmailChangeHandler = (event) => setEmail(event.target.value)


  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 300,
          height: login ? 300 : 450,
        }
      }}
      style={{
        position: 'absolute',
        top: '6em',
        right: '2em'
      }}
    >
      {
        login &&
        <Paper elevation={1} sx={{ p: 3 }}>

          <Stack spacing={2} direction="column">
            <Typography variant="h6" gutterBottom sx={{ color: "green" }}>
              Login
            </Typography>
            <TextField
              id="outlined"
              label="email"
              name='email'
              // value={email}
              onChange={loginEmailChangeHandler}
              placeholder="try->testuser@gmail.com"
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              name='password'
              value={password}
              onChange={loginPasswordChangeHandler}
              placeholder="try->1234567890"
            />
            <Button variant="contained" color='success'
              startIcon={<LoginIcon />}
              onClick={userLogin}
            >
              Login to OnKart
            </Button>
            <Typography variant="caption" gutterBottom >
              Don't have an account?
              <span>
                <Button variant="text" color='success' style={{ textTransform: 'initial' }} >
                  {
                    <Link to={'/register'} style={{ textDecoration: 'none', color: 'black' }} >Register here</Link>
                  }

                </Button>

              </span>
            </Typography>

          </Stack>
        </Paper>
      }

      {
        register &&
        <Paper elevation={1} sx={{ p: 3 }}>

          <Stack spacing={2} direction="column">
            <Typography variant="h6" gutterBottom sx={{ color: "green" }}>
              Register
            </Typography>
            <TextField
              id="outlined"
              label="Username"
              value={username}
              onChange={registerUsernameChangeHandler}
            />
            <TextField
              id="outlined"
              label="Email"
              value={email}
              onChange={registerEmailChangeHandler}
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              helperText="Password should be atleast 8 characters long"
              value={password}
              onChange={registerPasswordChangeHandler}
            />
            <TextField
              id="outlined-password-input"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={registerConfirmPassword}
            />
            <Button variant="contained" color='success' onClick={userRegister} >
              Register Now
            </Button>
            <Typography variant="caption" gutterBottom >
              Already have an account?
              <span>
                <Button variant="text" color='success' style={{ textTransform: 'initial' }} >
                  {
                    <Link to={'/login'} style={{ textDecoration: 'none', color: 'black' }} >Login here</Link>
                  }

                </Button>

              </span>
            </Typography>

          </Stack>
        </Paper>
      }

    </Box>
  );
}
