import React, {useContext, useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

import {Container, Typography, Box, TextField, Button, Link} from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {useTheme} from "@mui/material/styles";

const Daftar = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email : "",
    name : "",
    phoneNum : "",
    password : "",
    confirmPassword : "",
  });
  const theme = useTheme();

  useEffect(() => {
  }, [])
  
  const handleCredentialChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name] : e.target.value,
    })
  }

  const checkCredentials = (credentials) => {
    let isValid = true;
    if(credentials.email==="" || !/^.+@.+\..+$/.test(credentials.email)) {
      // openSnackbar("Please enter a valid email address")
      // isValid = false;
    }
    if(credentials.name==="" || !/^[A-Za-z\s]+$/.test(credentials.name)) {
      // openSnackbar("Please enter a valid name")
      // isValid = false;
    }
    if(credentials.phoneNum==="" || credentials.phoneNum.length < 9 || credentials.phoneNum.length > 12) {
      // openSnackbar("Please enter a valid phone number")
      // isValid = false;
    }
    if(credentials.password==="" || credentials.password.length < 6) {
      // openSnackbar("Password must have at least 6 characters")
      // isValid = false;
    }
    if (credentials.password !== credentials.confirmPassword) {
      // openSnackbar("Password does not match");
      // console.log("password : ", credentials.password);
      // console.log("confirmPassword : ", credentials.confirmPassword);
      // isValid = false;
    }
    return isValid;
  }

  const handleSubmitCredentials = async(e) => {
    // e.preventDefault();
    // const {confirmPassword, ...creds} = credentials;
 
    // const isValidCredentials = checkCredentials(credentials);
    // if(isValidCredentials) {
    //   try {
    //     await makeRequest({url: "/auth/register", method: "post", body : creds})
    //     openSnackbar("Registration successful");
    //     // auto login after registration
    //     dispatch({type : "LOGIN_START"})
    //     const res = await makeRequest({url : "/auth/login", method : "post", body : {
    //       email : credentials.email,
    //       password : credentials.password
    //     }})
    //     dispatch({type : "LOGIN_SUCCESS", payload : res.data})
    //     navigate("/");
    //   } catch(e) {
    //     openSnackbar("Error : ", e.response.data.msg)
    //   }
    // }
  }

  return (
    <Container fixed sx={{backgroundColor : theme.palette.primary.main, height : "100vh", minWidth : "100vw", display : "flex", flexDirection : "column", alignItems : "center", justifyContent : "center"}}>
      <Box sx={{backgroundColor : "rgba(255,255,255,.5)", borderRadius : "50%", width : 50, height : 50, position : "absolute", left : 50, top : 30, cursor : "pointer", "&:hover" : {backgroundColor : "rgba(255,255,255,.7)"}}} onClick={() => navigate(-1)}>
        <ChevronLeftIcon sx={{fontSize : 50, color : "black"}}/>
      </Box>
      <Grid container sx={{width : "50vw", height : "90vh"}}>
        <Typography variant="h2" sx={{color : "white", mb : 3, textAlign : "center"}}>Create Account</Typography>
        <Typography sx={{typography : {xxs : "body3", md : "body2"}, color : "white", mb : 4, textAlign : "center"}}>Enter your personal details to get reservation access and weekly discounts</Typography>
        <Grid>
          <TextField 
            margin="normal"
            label="Id" 
            name="id"
            variant="outlined"
            type="id"
            size="small"
            fullWidth
            required
            autoFocus
            value={credentials.email}
            onChange={handleCredentialChange}
          />
          <TextField 
            margin="normal"
            label="Name" 
            name="name"
            variant="outlined"
            type="text"
            size="small"
            fullWidth
            required
            value={credentials.name}
            onChange={handleCredentialChange}
          />
          <TextField 
            margin="normal"
            label="Password" 
            name="password"
            type="password"
            variant="outlined"
            size="small"
            fullWidth
            required
            value={credentials.password}
            onChange={handleCredentialChange}
          />

          <Button type="submit" variant="contained" fullWidth sx={{mt : 5}} onClick={handleSubmitCredentials}>
            <Typography sx={{typography : {xxs : "body2", md : "body1"}}}>Daftar</Typography>  
          </Button>
        </Grid>
        <Box sx={{mt : 2}}>
          <Typography sx={{typography : {xxs : "body3", md : "body2", color : "white"}}}>
            Sudah mempunyai akun?
            <Link href="/masuk" sx={{color : "white", ml : 1, textDecoration : "underline"}}>Masuk</Link>
          </Typography> 
        </Box>
      </Grid>
    </Container>
  )
}

export default Daftar