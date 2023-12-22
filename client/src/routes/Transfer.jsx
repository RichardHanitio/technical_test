import React, {useState} from 'react'
import { useNavigate} from 'react-router-dom';
import {useSnackbar} from "notistack"
import {useSelector} from "react-redux"

import {Container, Typography, Box, TextField, Button} from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {useTheme} from "@mui/material/styles";

import Logo from '../components/Logo';
import { makeRequest } from '../requests';
import {selectAuth} from "../state/auth/authSlice"

const Transfer = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    idTujuan : "",
    tujuanTransaksi : "",
    jumlah : 0,
  });
  const [showError, setShowError] = useState({
    show : false,
    msg : ""
  })
  const theme = useTheme();
  const {enqueueSnackbar} = useSnackbar();
  const {user} = useSelector(selectAuth)
  
  const handleCredentialChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name] : e.target.value,
    })
  }

  const checkCredentials = (credentials) => {
    if(credentials.idTujuan==="" || !/^[0-9a-z]+$/.test(credentials.idTujuan)) {
      setShowError({
        show : true, 
        msg : "Masukkanlah ID yang benar"
      })
      return false;
    }
    if(credentials.jumlah==="" || !/^\d+$/.test(credentials.jumlah)) {
      setShowError({
        show : true, 
        msg : "Masukkanlah jumlah transfer"
      })
      return false;
    }
    return true;
  }

  const handleSubmitCredentials = async(e) => { 
    e.preventDefault();
    const isValidCredentials = checkCredentials(credentials);
    if(isValidCredentials) {
      try {
        await makeRequest({url: "/transfer", method: "post", body : {idSumber : user.id, ...credentials}})
        navigate("/terima-kasih");
      } catch(e) {
        let errMsg = "Gagal transfer, mohon coba lagi"
        if (e.response && e.response.data) {
          errMsg = e.response.data.msg
        }
        enqueueSnackbar(errMsg, {variant : "error"})
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
          <Typography variant="h2" sx={{color : "white"}}>TRANSFER</Typography>
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
            label="ID Tujuan" 
            name="idTujuan"
            variant="outlined"
            type="text"
            size="small"
            fullWidth
            required
            autoFocus
            value={credentials.idTujuan}
            onChange={handleCredentialChange}
          />
          <TextField 
            margin="normal"
            label="Tujuan Transfer" 
            name="tujuanTransaksi"
            variant="outlined"
            type="text"
            size="small"
            fullWidth
            value={credentials.tujuanTransaksi}
            onChange={handleCredentialChange}
          />
          <TextField 
            margin="normal"
            label="Jumlah Transfer" 
            name="jumlah"
            type="number"
            variant="outlined"
            size="small"
            fullWidth
            required
            value={credentials.jumlah}
            onChange={handleCredentialChange}
          />

          <Button type="submit" variant="contained" fullWidth sx={{mt : 2}} onClick={handleSubmitCredentials}>
            <Typography variant="body1">Transfer</Typography>  
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Transfer