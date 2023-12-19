import React from 'react'
import {useTheme} from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

import { Typography, Button, Container } from '@mui/material';
import Grid from "@mui/material/Unstable_Grid2"

import Logo from '../components/Logo';

const Welcome = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <>
      <Container fixed sx={{backgroundColor : theme.palette.primary.main, minWidth : "100vw", height : "100vh", display : "flex", alignItems : "center", justifyContent : "center"}}>
        <Grid container sx={{width : "90%", height : "90%", flexDirection : "column", alignItems : "center"}}>
          <Grid sx={{flexBasis : "30%"}}>
            <Logo/>
          </Grid>
          <Grid sx={{flexBasis : "20%", display : "flex", alignItems : "center", justifyContent : "center"}}>
            <Typography sx={{color : "white"}}>Untuk memulai menggunakan layanan ATM ini, silakan daftar/masuk ke akun bank anda</Typography>
          </Grid>
          <Grid sx={{width : "30%", display : "flex", flexBasis : "30%", flexDirection : "column", justifyContent : "space-evenly"}}>
            <Button variant="contained" color = "primary" onClick={() => navigate("/daftar")}>
              <Typography sx={{color : "white", fontWeight : "600"}}>Daftar</Typography>
            </Button>
            <Button variant="contained" color="secondary" onClick={() => navigate("/masuk")}>
              <Typography sx={{fontWeight : "600"}}>Masuk</Typography>
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Welcome