import React from 'react'
import {useTheme} from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

import { Typography, Button, Container, Box } from '@mui/material';
import Grid from "@mui/material/Unstable_Grid2"

const MenuUtama = () => {
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
          <Typography variant="h1" sx={{color : "white"}}>Selamat datang, John</Typography>
          <Typography variant="body1" sx={{color : "white"}}>Silakan pilih apa yang ingin Anda lakukan dengan akun Anda</Typography>
        </Grid>
        <Grid sx={{backgroundColor : "blue"}}>
          <Grid sx={{backgroundColor : "pink", width : 200, height : 100, cursor : "pointer"}} onClick={() => navigate("/info-saldo")}>
            <Typography variant="body1">INFO SALDO</Typography>
          </Grid>
          <Grid sx={{backgroundColor : "pink", width : 200, height : 100, cursor : "pointer"}} onClick={() => navigate("/transfer")}>
            <Typography variant="body1">TRANSFER</Typography>
          </Grid>
          <Grid sx={{backgroundColor : "pink", width : 200, height : 100, cursor : "pointer"}} onClick={() => navigate("/tarik-dana")}>
            <Typography variant="body1">TARIK DANA</Typography>
          </Grid>
          <Grid sx={{backgroundColor : "pink", width : 200, height : 100, cursor : "pointer"}} onClick={() => navigate("/riwayat-transaksi")}>
            <Typography variant="body1">RIWAYAT TRANSAKSI</Typography>
          </Grid>
          <Grid sx={{backgroundColor : "pink", width : 200, height : 100, cursor : "pointer"}} onClick={() => navigate("/keluar")}>
            <Typography variant="body1">KELUAR</Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default MenuUtama