import React from 'react'
import {useTheme} from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

import { Typography, Button, Container } from '@mui/material';
import Grid from "@mui/material/Unstable_Grid2"

const Welcome = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <>
      <Container sx={{backgroundColor : theme.palette.primary.main, minWidth : "100vw", height : "100vh", flexDirection : "column", alignItems : "center"}}>
        <Grid container>
          <Grid sx={{backgroundColor : "pink",alignItems : "center", justifyContent : "center"}}>
            <img src="/assets/R-logo.png" alt="bank logo"/>
            <Typography sx={{color : "white"}}>Bank of Richard</Typography>
          </Grid>
        </Grid>
        <Grid>
          <Typography sx={{color : "white"}}>Untuk memulai menggunakan layanan ATM ini, silakan daftar/masuk ke akun bank anda</Typography>
        </Grid>
        <Grid>
          <Button variant="contained" color = "primary" onClick={() => navigate("/daftar")}>
            <Typography sx={{color : "white"}}>Daftar</Typography>
          </Button>
          <Button variant="contained" color="secondary" onClick={() => navigate("/masuk")}>
            <Typography>Masuk</Typography>
          </Button>
        </Grid>
      </Container>
    </>
  )
}

export default Welcome