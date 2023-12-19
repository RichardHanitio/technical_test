import React from 'react'
import {useTheme} from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

import { Typography, Button, Container, Box } from '@mui/material';
import Grid from "@mui/material/Unstable_Grid2"

const InfoSaldo = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <>
      <Container sx={{backgroundColor : theme.palette.primary.main, minWidth : "100vw", height : "100vh", flexDirection : "column", alignItems : "center"}}>
        <Grid container>
          <Grid sx={{alignItems : "center", justifyContent : "center"}}>
            <img src="/assets/R-logo.png" alt="bank logo"/>
            <Typography sx={{color : "white"}}>Bank of Richard</Typography>
          </Grid>
        </Grid>
        <Grid>
          <Typography variant="h1" sx={{color : "white"}}>INFO SALDO</Typography>
        </Grid>
        <Grid sx={{backgroundColor : "blue", width : "100%", height : "100%", display : "flex", alignItems : "center", justifyContent : "center"}}>
          <Box sx={{backgroundColor : "white", width : "50%", height : "50%", display : "flex", justifyContent : "center", alignItems : "center"}}>
            <Grid container sx={{width : "85%", height : "80%"}}>
              <Grid xs={12} sx={{backgroundColor : "pink", display : "flex", justifyContent : "space-between"}}>
                <Typography variant="body2">
                  John Setiawan
                </Typography>
                <Typography variant="body2">
                  01234
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="body1">
                  Saldo
                </Typography>
                <Typography variant="body3">
                  Rp.
                </Typography>
                <Typography variant="h2">
                  5.000.000,00
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Button type="submit" variant="contained" fullWidth sx={{mt : 5}}>
          <Typography variant="body1">Isi Saldo</Typography>  
        </Button>
      </Container>
    </>
  )
}

export default InfoSaldo