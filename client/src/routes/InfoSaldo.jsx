import React from 'react'
import {useTheme} from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Typography, Button, Container, Box } from '@mui/material';
import Logo from '../components/Logo';
import Grid from "@mui/material/Unstable_Grid2"

const InfoSaldo = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Container fixed sx={{backgroundColor : theme.palette.primary.main, height : "100vh", minWidth : "100vw", display : "flex", flexDirection : "column", alignItems : "center", justifyContent : "center"}}>
      <Box sx={{backgroundColor : "rgba(255,255,255,.5)", borderRadius : "50%", width : 40, height : 40, position : "absolute", left : 50, top : 30, cursor : "pointer", "&:hover" : {backgroundColor : "rgba(255,255,255,.7)"}}} onClick={() => navigate(-1)}>
        <ChevronLeftIcon sx={{fontSize : 40, color : "black"}}/>
      </Box>
      <Grid container sx={{width : "80%", height : "95%", flexDirection : "column", alignItems : "center"}}>
        <Grid sx={{flexBasis : "10%"}}>
          <Logo width="220px" height="90px" imageSize="50px" orientation="horizontal" textVariant="h4"/>
        </Grid>
        <Grid sx={{height : "80px", mt : 2}}>
          <Typography variant="h2" sx={{color : "white"}}>INFO SALDO</Typography>
        </Grid>
        <Grid container sx={{width : "100%", height : "50%", alignItems : "center", justifyContent : "center"}}>
          <Box sx={{width : "50%", height : "100%", display : "flex", justifyContent : "center", alignItems : "center", backgroundColor : "white"}}>
            <Grid container sx={{width : "85%", height : "80%",flexDirection : "column"}}>
              <Grid sx={{display : "flex", justifyContent : "space-between", flexBasis : "20%"}}>
                <Typography variant="body2">
                  John Sugawara
                </Typography>
                <Typography variant="body2">
                  01234
                </Typography>
              </Grid>
              <Grid sx={{flexBasis : "60%", display : "flex", flexDirection : "column", width : "90%", alignSelf : "center"}}>
                <Typography variant="body1" sx={{mb : 2}}>
                  Saldo
                </Typography>
                <Box sx={{display : "flex"}}>
                  <Typography variant="body3">
                    Rp.
                  </Typography>
                  <Typography variant="h1">
                    5.000.000,00
                  </Typography>
                </Box>
              </Grid>
              <Grid>
                <Logo width="170px" height="40px" imageSize="30px" orientation="horizontal" textVariant="h5" colorVariant="black"/>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Button type="submit" variant="contained" sx={{mt : 3, width : "50%"}} onClick={() => navigate("/isi-saldo")}>
          <Typography variant="body1">Isi Saldo</Typography>  
        </Button>
      </Grid>
    </Container>
  )
}

export default InfoSaldo