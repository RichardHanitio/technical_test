import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

import {Container, Typography, Box, TextField, Button, Link} from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Logo from '../components/Logo';
import {useTheme} from "@mui/material/styles";
import {useSnackbar} from "notistack"

import { makeRequest } from '../requests';


const Masuk = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    id : "",
    pin : "",
  });
  const [showError, setShowError] = useState({
    show : false,
    msg : ""
  })
  const theme = useTheme();
  const {enqueueSnackbar} = useSnackbar();
  

  const handleCredentialChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name] : e.target.value,
    })
  }

  const checkCredentials = (credentials) => {
    if(credentials.id==="" || !/^[0-9a-z]+$/.test(credentials.id)) {
      setShowError({
        show : true, 
        msg : "Masukkanlah ID yang benar [0-9a-z]"
      })
      return false;
    }
    if(credentials.nama==="") {
      setShowError({
        show : true, 
        msg : "Masukkanlah nama yang benar"
      })
      return false;
    }
    if(credentials.pin==="" || credentials.pin.length > 6 || !/^\d+$/.test(credentials.pin)) {
      setShowError({
        show : true, 
        msg : "Masukkanlah pin yang benar"
      })
      return false;
    }
    return true;
  }

  const handleSubmitCredentials = async(e) => { 
    e.preventDefault();
    console.log(credentials)
    const isValidCredentials = checkCredentials(credentials);
    if(isValidCredentials) {
      try {
        await makeRequest({url: "/login", method: "post", body : credentials})
        enqueueSnackbar("Anda berhasil masuk!", {variant : "success"})
        navigate("/menu-utama");
      } catch(e) {
        enqueueSnackbar("Anda gagal masuk! Mohon coba lagi", {variant : "error"})
      }
    }
    
  }

  return (
    <Container fixed sx={{backgroundColor : theme.palette.primary.main, height : "100vh", minWidth : "100vw", display : "flex", flexDirection : "column", alignItems : "center", justifyContent : "center"}}>
      <Box sx={{backgroundColor : "rgba(255,255,255,.5)", borderRadius : "50%", width : 40, height : 40, position : "absolute", left : 50, top : 30, cursor : "pointer", "&:hover" : {backgroundColor : "rgba(255,255,255,.7)"}}} onClick={() => navigate(-1)}>
        <ChevronLeftIcon sx={{fontSize : 40, color : "black"}}/>
      </Box>

      <Grid container sx={{width : "80%", height : "95%", flexDirection : "column", alignItems : "center"}}>
        <Grid sx={{flexBasis : "10%"}}>
          <Logo width="220px" height="90px" imageSize="50px" orientation="horizontal" textVariant="h4"/>
        </Grid>
        <Grid sx={{flexBasis : "10%", display : "flex", alignItems : "center", justifyContent : "center", mt:3}}>
          <Typography variant="h2" sx={{color : "white"}}>MASUK</Typography>
        </Grid>
        <Grid sx={{flexBasis : "7%", backgroundColor : "#ffd4d4", width : "50%", display: showError.show ? "flex" : "none", alignItems : "center", justifyContent : "center"}}>
          <Box sx={{height : "70%", width : "95%", display : "flex", alignItems : "center", justifyContent : "center"}}>
            <Typography variant="body2" sx={{color : "red", fontWeight : "500", width : "95%", textAlign : "center"}}>
              {showError.msg!=="" ? showError.msg : "Terjadi kesalahan, harap coba lagi"}
            </Typography>
            <Box sx={{width : "5%"}}>
              <CloseIcon sx={{color : "black", cursor : "pointer"}} onClick={() => setShowError({show : false, msg : ""})}/>
            </Box>
          </Box>
        </Grid>
        <Grid sx={{flexBasis : "40%", width : "50%", display : "flex", flexDirection : "column", justifyContent : "space-evenly"}}>
          <TextField 
            margin="normal"
            label="ID" 
            name="id"
            variant="outlined"
            type="text"
            size="small"
            fullWidth
            required
            autoFocus
            value={credentials.id}
            placeholder = "terdiri dari angka dan huruf kecil [0-9a-z]"
            onChange={handleCredentialChange}
          />
          <TextField 
            margin="normal"
            label="PIN" 
            name="pin"
            type="password"
            variant="outlined"
            size="small"
            fullWidth
            required
            value={credentials.pin}
            placeholder="6 digit angka"
            onChange={handleCredentialChange}
          />

          <Button type="submit" variant="contained" fullWidth sx={{mt : 2}} onClick={handleSubmitCredentials}>
            <Typography variant="body1">Masuk</Typography>  
          </Button>
        </Grid>
        <Grid sx={{mt : 2}}>
          <Typography sx={{typography : {xxs : "body3", md : "body2", color : "white"}}}>
            Belum punya akun?
            <Link href="/masuk" sx={{color : "white", ml : 1, textDecoration : "underline"}}>Daftar</Link>
          </Typography> 
        </Grid>
      </Grid>
    </Container>
  )
}

export default Masuk